let fs = require('fs');
let build_dir = "./build";
let precache_re = /precache-manifest\.[a-zA-Z0-9]*\.js/

let urls_to_add = ['/bg_offline.jpg']

function generate_revision(){
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
    var revision = '';
    for(let i=0;i<24;i++){
        revision += chars[Math.round(Math.random() * 62)];
    }
    return revision;
}


fs.readdir(build_dir, (err, files) => {
    for(let file of files){
        if(precache_re.test(file)){
            let cont = fs.readFileSync(build_dir + '/' + file).toString()
            cont = cont.slice(0, cont.length - 4)

            urls_to_add.forEach((url) => {
                cont += `,\n  {\n    "url": "${url}",\n    "revision": "${generate_revision()}"\n  }`
            })

            cont += `\n]);`
            fs.writeFileSync(build_dir + '/' + file, cont);
            break;
        }
    }
})
