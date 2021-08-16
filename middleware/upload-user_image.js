const fs=require('fs');
const path=require('path');
const multer=require('multer');


var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname+'/uploads'))
    },
    filename:(req,file,cb)=>{ cb(null,file.originalname + '_' + Date.now())
   }
}) 

var upload=multer({storage:storage});

module.exports=upload
