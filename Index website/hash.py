import hashlib
import logging

# Configure logging to display INFO level messages and above
logging.basicConfig(level=logging.INFO)


def hash_string(input_string: str) -> str:
    """
        Generate the SHA-256 hash of a given string.

        Parameters:
        - input_string (str): The string to be hashed.

        Returns:
        - str: The hexadecimal representation of the SHA-256 hash.

        Raises:
        - ValueError: If the input is not a string.
    """
    if not isinstance(input_string, str):
        raise ValueError("Input should be a string")

    sha256 = hashlib.sha256()
    sha256.update(input_string.encode('utf-8'))
    return sha256.hexdigest()


def find_match(line, target_hash):
    """
        Check if the SHA-256 hash of a stripped line matches the target hash.

        Parameters:
        - line (str): The line to check.
        - target_hash (str): The target hash to match.

        Returns:
        - str or None: The original line if a match is found, otherwise None.
    """
    line = line.strip()
    if hash_string(line) == target_hash:
        logging.info(
            f"Match found! Original message: {line}, Hash: {target_hash}")
        return line
    
    return None


def brute_force(filename, target_hash):
    """
        Attempt to find a line in a file that, when hashed, matches the target hash.

        Parameters:
        - filename (str): The name of the file to search through.
        - target_hash (str): The target hash to match.

        Returns:
        - str or None: The original string if a match is found, otherwise None.

        Logs:
        - INFO: When no match is found in the file.
        - ERROR: When the file is not found or another error occurs.
    """
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            for line in file:
                match = find_match(line, target_hash)
                if match:
                    return match
            logging.info("No match found in the file.")
            return None

    except FileNotFoundError:
        logging.error(f"File {filename} not found.")
        return None

    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        return None


if __name__ == "__main__":
    # Example usage of the above functions:
    # 1. Generate a hash of a specific string.
    # 2. Attempt to find a matching original string in a file.

    number = "9aa16c63d0eb10410716d"
    hash_value = hash_string(number)
    hashed = "4d70a2599ad02511969e2fc9e883f0ca4fef031eff0cfc72171e76ab17ebcaa2"

    logging.info(f"Original Message: {number}")
    logging.info(f"Hash Value: {hash_value}")

    target_file = "hash.txt"
    print(brute_force(target_file, hashed))
