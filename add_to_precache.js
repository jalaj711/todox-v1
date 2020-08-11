let fs = require('fs');
let build_dir = "./build";
let precache_re = /precache-manifest\.[a-zA-Z0-9]*\.js/

fs.readdir(build_dir, (err, files) => {
    for(let file of files){
        if(precache_re.test(file)){
            let precache = require(build_dir + '/' + file);
            console.log(precache)
        }
    }
})