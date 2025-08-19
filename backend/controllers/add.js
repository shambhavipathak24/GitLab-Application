const fs=require('fs').promises;
const path=require('path');
async function add(filePath){
  const repoPath=path.resolve(process.cwd(),".GitLab");
  const stagingPath=path.join(repoPath,"staging");
  try{
    // Create the staging folder inside the repository
    await fs.mkdir(stagingPath,{recursive:true});
    // Create a new file named 'newfile.txt' in the staging area
    const fileName=path.basename(filePath);
    await fs.copyFile(filePath, path.join(stagingPath, fileName));

    await fs.writeFile(path.join(stagingPath,"newfile.txt"),"This is a new file added to the staging area.");
    // Log a success message indicating the file has been added
    console.log(`file ${fileName} added to staging area!`);
  }catch(err){
    console.error("Error adding file to staging area:", err);
  }
}
module.exports = {add};