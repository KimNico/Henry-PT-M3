let fs = require("fs")



module.exports = {
    pwd: function(){
        process.stdout.write(__dirname);
    },
    date: function(){
        process.stdout.write(Date())
    },
    echo:function(args){
        process.stdout.write(args.join(' '))
    },
    ls: function(){
        fs.readdir('.', function(err,files){
            if(err)throw err;
            files.forEach(function(file){
                process.stdout.write(file.toString()+"\n")
            })
            process.stdout.write("prompt > ")
        })
    },
    cat: function(args){
        fs.readFile(args[0], function(err,data){
            if(err)throw err;
            process.stdout.write(data)
        })
        process.stdout.write("prompt > ")
    },
    head: function(args){
        fs.readFile(args[0], function(err,data){
            if(err)throw err;
           let firstLines = data.split('\n').slice(0,10).join('\n')
           process.stdout.write(firstLines)
        })
        process.stdout.write("prompt > ")
    },
    tail: function(){

    }
}