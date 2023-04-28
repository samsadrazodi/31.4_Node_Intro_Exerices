const fs = require('fs');
const axios = require('axios');

const argv = process.argv;

function cat(path){
    fs.readFile(path,'utf8',(err,data)=>{
        if(err){
            console.log('ERROR: ',err)
            process.kill(1)
        }
        if (argv[2] != '--out'){
            console.log(data);
        }else{
            fs.appendFile(argv[3],data, {encoding:'utf8'}, (err) => {
                if (err) throw err;
                console.log('Data appended to file');
            });
        }
    });
}

async function webCat(url){
    try{
        let res = await axios.get(url);
        if (argv[2] !== '--out'){
            console.log(res.data);
        }else{
            fs.appendFile(argv[3],`\n ${res.data}`, {encoding:'utf8'}, (err) => {
                if (err) throw err;
                console.log('URL Web Data appended to file');
            });
        }
    }catch(err){
        console.log(`Error: `, err)
    }
}

if (process.argv[2] != '--out'){
    let path = process.argv[2]
    if (path.slice(0,4) ==='http'){
        webCat(path);
    }else {
        cat(path)
    }
}else {
    let path = process.argv[4]
    if (path.slice(0,4) ==='http'){
        webCat(path);
    }else {
        cat(path)
    }
}
