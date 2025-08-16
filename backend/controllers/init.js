const fs = require('fs').promises;
const path = require('path');
async function initRepo() {
  const repoPath = path.resolve(process.cwd(), ".GitLab");
  const commitPath = path.join(repoPath, "commits");
  try {
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitPath, { recursive: true });
    await fs.writeFile(
      path.join(repoPath, "README.md"),
      "# Welcome to your GitLab repository\nThis is a sample README file for your new repository.\n"
    );
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ bucket: process.env.S3_BUCKET })
    );
    console.log("Repository initialized successfully at:", repoPath);
  } catch (err) {
    console.error("Error initializing repository:", err);
    return;
  }
}
module.exports = { initRepo };