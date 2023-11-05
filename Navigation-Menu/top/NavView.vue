<template>
  <div class="fix" id="nav">
    <nav>
      <ul>
        <!-- <div id="search-box">
          <input
            type="search"
            placeholder="Search..."
            name="search"
            id="search"
            v-model="input"
            @keydown="addData"
          />
          <button @click="submit">
            <i class="bi bi-search"></i>
          </button>
        </div> -->
        <li>
          <router-link to="/">Home</router-link>
        </li>
        |
        <li>
          <router-link to="/about">About</router-link>
        </li>
        |
        <li>
          <router-link to="/contact">Contact</router-link>
        </li>
        |
        <li>
          <router-link to="/sign-in"><i class="bi bi-box-arrow-in-right"></i></router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavView",

  data() {
    return {
      input: "",
      skills: [],
    };
  },

  methods: {
    addData(e) {
      // capture input data in `e`
      if (e.key === "Enter" && this.input) {
        // check for duplicates
        if (!this.skills.includes(this.input)) {
          // push data into skills array
          this.skills.push(this.input);
          alert(this.skills);
        } else {
          alert("No duplicate values");
        }
        this.input = "";
      }
    },
    submit(e) {
      if(e === 'click') {
        this.addData
      }
    },
    deleteData(skill) {
      this.skills = this.skills.filter((item) => {
        return skill !== item;
      });
    },
  },

  mounted() {
    // change nav color on scroll event
    function changeBg() {
      let scrollValue = window.scrollY;
      const bg = document.getElementById("nav");
      if (scrollValue < 80) {
        bg.classList.remove("bg-color");
      } else {
        bg.classList.add("bg-color");
      }
    }
    window.addEventListener("scroll", changeBg);
  },
};
</script>

<style scoped>
.fix {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: 0.6sec;
  margin: 0;
  padding: 0;
  transition: 0.5s;
}

nav {
  margin-top: 5px;
  margin-right: 15px;
  padding: 20px;
  background-color: none;
  position: relative;
  z-index: 1;
  transition: all 0.3s;
}

nav a {
  font-weight: bold;
  color: #42b983;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

ul {
  display: flex;
  justify-content: right;
  gap: 35px;
}

ul li a {
  text-decoration: none;
  align-items: center;
  justify-content: space-between;
  display: inline;
  gap: 25px;
  font-size: 1.1rem;
}

a:hover {
  color: #2c3e50;
  transition: all 0.2s;
}

/* 
#search-box {
  float: left;
} */

input {
  margin-top: -10px;
  width: 300px;
  height: 35px;
  padding: 5px;
  border-radius: 15px 2px 15px 2px;
  font-size: 1rem;
  margin-left: -800px;
  border: 1px solid #42b983;
  box-shadow: 0 2px 5px #555;
  transition: all 0.3s;
  float: left;
}

button {
  float: left;
  position: sticky;
}

input::placeholder {
  color: #2c3e50;
  padding: 5px;
}

input:focus {
  border-radius: 2px 15px 2px 15px;
  transition: all 0.3s;
  border-style: none;
}

input:hover {
  border-radius: 2px 15px 2px 15px;
  transition: all 0.3s;
}

nav a.router-link-exact-active {
  color: #2c3e50;
  transition: all 0.3s;
}

.bg-color {
  transition: all 0.5s;
  background-color: #42b983;
}

.bg-color a {
  color: aliceblue;
}

.bg-color a:hover {
  color: #2c3e50;
}

.bi {
  margin-bottom: 15px;
  font-size: 1.5rem;
}
</style>
