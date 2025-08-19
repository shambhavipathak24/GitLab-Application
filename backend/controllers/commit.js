const fs=require('fs').promises;
const path=require('path');
const {v4:uuidv4}=require('uuid');//help to create unique commit IDs
//v4 is a version of UUID that generates a random UUID
//v4 reduces loading time and improves performance

async function commit(message) {
  // Resolve the path to the repository folder (.GitLab) in the current working directory
  const repoPath=path.resolve(process.cwd(),".GitLab");
  // Define the path for the staging area inside the repository
  const stagingPath=path.join(repoPath,"staging");
  // Define the path for the commits folder inside the repository
  const commitPath=path.join(repoPath,"commits");
  try{
      const commitID=uuidv4();// Generate a unique commit ID using UUID v4
      // Create the commit folder with the unique commit ID
      const commitDir=path.join(commitPath,commitID);
      // Create the commit directory, including parent folders if they don't exist
      await fs.mkdir(commitDir,{recursive:true});
      // Copy all files from the staging area to the commit directory
      const files=await fs.readdir(stagingPath);// Read all files in the staging area
      for(const file of files){
        await fs.copyFile(
          path.join(stagingPath,file),
          path.join(commitDir,file)
          // Copy each file from staging to the commit directory
      );

      }
      // Write the commit metadata to a JSON file in the commit directory
      await fs.writeFile(path.join(commitDir,"commit.json"),JSON.stringify({
        message,date:new Date().toISOString()}));// Store the commit message and date in a JSON file
      // Log a success message indicating the commit was successful
        console.log(`Commit successful with ID: ${commitID}`);
  }catch(err){
    console.error("Error committing files:", err);
    return;
  }
}
module.exports = {commit};