document.addEventListener("DOMContentLoaded", function () {
  const videoElement = document.getElementById("backgroundVideo");
  const videoSources = [
    "../assets/video/video.mp4",
    "../assets/video/pexels_videos_2278095 (1080p).mp4",
    "../assets/video/pexels_videos_2516159 (1080p).mp4"
  ];
  let currentVideoIndex = 0;

  videoElement.addEventListener("ended", function () {
    // Increment the video index
    currentVideoIndex++;

    // If the last video has ended, reset the index to loop from the start
    if (currentVideoIndex === videoSources.length) {
      currentVideoIndex = 0;
    }

    // Update the video source and reload the video element
    videoElement.children[0].src = videoSources[currentVideoIndex];
    videoElement.load();
    videoElement.play();
  });


  const repoDropdown = document.getElementById("repoDropdown");
  const githubURI = "https://api.github.com/users/nexustech101/repos";

  fetch(githubURI)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      data.forEach((repo) => {
        const option = document.createElement("option");
        option.value = repo.contents_url.replace("{+path}", ""); // Store contents_url for later use
        option.textContent = repo.name;
        repoDropdown.appendChild(option);
      });
    })
    .catch((error) => {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    });

  repoDropdown.addEventListener("change", function () {
    const selectedRepoUrl = repoDropdown.value;
    fetchFiles(selectedRepoUrl);
  });

  function fetchFiles(repoContentsUrl) {
    fetch(repoContentsUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        populateRepoCards(data);
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  }

  function populateRepoCards(files) {
    fileData = files
    const repoCards = document.getElementById("repoCards");
    repoCards.textContent = "";

    const gitContainer = document.getElementsByClassName("git-container")[0];
    gitContainer.style.display = "block";

    files.forEach((file) => {
      const linkContainer = document.createElement("div");
      linkContainer.className = "link-container";

      // If you have a specific image URL for each repo, set it here
      const repoImageUrl = "../../assets/images/pankaj-patel-Fi-GJaLRGKc-unsplash.jpg";
      linkContainer.style.backgroundImage = `url(${repoImageUrl})`;

      const titlePill = document.createElement("span");
      const linkTitle = document.createElement("h5");
      linkTitle.className = "link-title";
      linkTitle.textContent = file.name;
      titlePill.className = "link-pill";
      titlePill.appendChild(linkTitle);
      linkContainer.appendChild(titlePill);

      const textPill = document.createElement("span");
      const linkText = document.createElement("p");
      textPill.className = "link-pill";
      linkText.className = "link-text";
      linkText.textContent = file.type;
      textPill.appendChild(linkText);
      linkContainer.appendChild(textPill);

      const linkButton = document.createElement("a");
      linkButton.href = file.html_url;
      linkButton.target = "_blank";
      linkButton.className = "link-button";
      // linkButton.textContent = "View on GitHub";

      const sandboxButton = document.createElement("button");
      sandboxButton.className = "link-button";
      // sandboxButton.textContent = "View Sandbox";
      sandboxButton.onclick = () => viewSandbox(file);

      const linkImage = document.createElement("img");
      linkImage.src = "../../assets/images/link.png";
      linkImage.alt = "link";
      linkImage.height = "20";
      linkImage.width = "20";
      linkButton.appendChild(linkImage);

      const codeImage = document.createElement("img");
      codeImage.src = "../../assets/images/coding (2).png";
      codeImage.alt = "cope";
      codeImage.height = "20";
      codeImage.width = "20";
      sandboxButton.appendChild(codeImage);

      const linkFlex = document.createElement("div");
      linkFlex.className = "link-flex";
      linkFlex.appendChild(linkButton);
      linkFlex.appendChild(sandboxButton);

      // linkContainer.appendChild(linkTitle);
      // linkContainer.appendChild(linkText);
      linkContainer.appendChild(linkFlex);
      repoCards.appendChild(linkContainer);
    });
  }

  function viewSandbox(file) {
    const sandbox = document.getElementById("sandbox");

    // Fetch the code from the GitHub file URL
    fetch(file.git_url)
      .then((response) => response.json())
      .then((data) => {
        const code = atob(data.content); // Decode the base64 encoded content
        const fileType = file.name.split('.').pop(); // Get file extension
        displayAndRunCode(code, fileType);
        sandbox.style.display = "block"; // Show the sandbox
      })
      .catch((error) => console.error("Error fetching file:", error));
  }

  function displayAndRunCode(code, fileType) {
    const sandbox = document.getElementById("sandbox");

    // Beautify the code using js-beautify
    const beautifiedCode = js_beautify(code, { indent_size: 4 });

    // Create a `pre` and `code` element to hold and display the fetched code
    const preElement = document.createElement("pre");
    preElement.className = "line-numbers"; // Add class for line numbers

    const codeElement = document.createElement("code");
    // Dynamically set the language class based on file type
    codeElement.className = `language-${fileType}`;
    codeElement.textContent = beautifiedCode;

    // Create and configure the "Copy" button
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy Code";
    copyButton.className = "link-button";
    copyButton.addEventListener("click", function () {
      navigator.clipboard
        .writeText(codeElement.textContent)
        .then(() => alert("Code copied to clipboard!"))
        .catch((error) => alert("Copy failed: " + error.message));
    });

    // Create a pill to display the file type
    const fileTypePill = document.createElement("span");
    fileTypePill.textContent = fileType.toUpperCase();
    fileTypePill.className = "file-type-pill"; // Add your CSS class here

    // Clear the sandbox and append the new elements
    sandbox.textContent = "";
    sandbox.appendChild(fileTypePill);
    sandbox.appendChild(copyButton);
    sandbox.appendChild(preElement);
    preElement.appendChild(codeElement);

    // Apply syntax highlighting
    Prism.highlightElement(codeElement);
  }
});
