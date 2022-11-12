const commands = require('./commands/index.js');
let fs = require("fs")


 
 // Output un prompt
 process.stdout.write('prompt > ');
 // El evento stdin 'data' se dispara cuando el user escribe una línea
 process.stdin.on('data', function (data) {
    let args = data.toString().trim().split(' ')
   var cmd = args.shift()// remueve la nueva línea
 if(commands[cmd]){
    commands[cmd](args)
 }
   process.stdout.write('\nprompt > ');
 })