let fs = require('fs');
let build_dir = "./build";
let precache_re = /precache-manifest\.[a-zA-Z0-9]*\.js/

console.log("Starting patcher...")

let urls_to_add = [
    '/todox/bg_offline.jpg'
]

console.log("Adding following URLs to precache manifest.")

for(let i of urls_to_add)
    console.log(`\t- ${i}`)

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
            console.log(`Assuming ${file} to be precache manifest.`)
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
    console.log("Requested URLs added to precache_manifest.")
})

fs.copyFile("./build/index.html", "./build/404.html", () => {
    console.log("File copying complete.")
})