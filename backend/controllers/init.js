// Import the 'fs' module with promises API for file operations
const fs = require('fs').promises;
// Import the 'path' module for handling file and directory paths
const path = require('path');

// Asynchronous function to initialize a new repository
async function initRepo() {
  // Define the path for the repository folder (.GitLab) in the current working directory
  const repoPath = path.resolve(process.cwd(), ".GitLab");
  // Define the path for the commits folder inside the repository
  const commitPath = path.join(repoPath, "commits");
  try {
    // Create the repository folder (.GitLab), including parent folders if they don't exist
    await fs.mkdir(repoPath, { recursive: true });
    // Create the commits folder inside the repository
    await fs.mkdir(commitPath, { recursive: true });
    // Create a README.md file with initial content inside the repository
    await fs.writeFile(
      path.join(repoPath, "README.md"),
      "# Welcome to your GitLab repository\nThis is a sample README file for your new repository.\n"
    );
    // Create a config.json file with the S3 bucket information inside the repository
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ bucket: process.env.S3_BUCKET })
    );
    // Log a success message with the repository path
    console.log("Repository initialized successfully at:", repoPath);
  } catch (err) {
    // Log any errors that occur during initialization
    console.error("Error initializing repository:", err);
    return;
  }
}

// Export the initRepo function for use in other modules