const yargs=require('yargs');
const {hideBin}=require('yargs/helpers');
const {initRepo}=require('./controllers/init');
const {add}=require('./controllers/add');
const {commit}=require('./controllers/commit');
const {push}=require('./controllers/push');
const {pull}=require('./controllers/pull');
const {revert}=require('./controllers/revert');
yargs(hideBin(process.argv)).command("init","Initialize the new repositary",{},initRepo).command("add <file>","Add a file to the respository",(yargs)=>{
  yargs.positional('file',{
    describe:'File to be added',
    type:'string'
  });
},add).command("commit <message>","Commit the staged files",(yargs)=>{
  yargs.positional('message',{
    describe:'Commit message',
    type:'string'
  });
},commit).command("push","Push commits to S3",{},push)
.command("pull","Pull commits from S3",{},pull).command("revert <commitID>","Revert to a specific commit",(yargs)=>{
  yargs.positional('commitID',{
    describe:'Commit ID to revert to',
    type:'string'
  });
},revert).demandCommand(1,"You need to specify a command").help().argv;