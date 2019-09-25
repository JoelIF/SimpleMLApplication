const fs = require('fs'),
      path = require('path');

module.exports = function(args){
  const def = {
      action: (args[2]) ? args[2] : undefined,
      param: {}
    },
    path = process.cwd();
  switch (def.action){
    case 'train':
      def.param = {
        input: path + '/sample/default.txt',
        output: path + '/trained/default.js',
        name: 'default',
        limit: 20000
      }
      loopTrainArgs:
        for(let i = 3; i < args.length; i = i + 2){
          switch (args[i]) {
            case '-i':
            case '--input':
              def.param.input = `${args[i+1]}`;
            break;
            case '-o':
            case '--output':
              def.param.name = args[i+1];
              def.param.output = `${path}/trained/${args[i+1]}.js`;
            break;
            case '-l':
            case '--limit':
              def.param.limit = `${args[i+1]}`;
            break;
            case '-h':
            case '--help':
              def.action = 'stop';
              def.param = {
                code: 0,
                msg: `
Type [-i, --input] to define a file as source for trainning, if omitted the sample/default.txt file will be used.
This file must be a plain text file with each value in a single line;

Type [-o, --output] to define a filename for a trained net, if omitted the trained/default.js file will be used.
The name must be a valid filename, do not use path or filename extention.

After trained a net you can run it with the comand node net run "net name" `
              }
            break;
            default:
              def.action = 'stop';
              def.param = {
                code: 1,
                msg: `
Unrecognized param for command train. Available params:
[-i, --input, -o, --output, -h, --help]`
              }
              break loopTrainArgs;
            break;
          }
        }
    break;
    case 'run':
      def.param = {
        steps: 4,
        group: 0,
        net: process.cwd() + '/trained/default',
        name: 'default'
      }
      for(let i = 3; i < args.length; i = i + 2){
        switch (args[i]) {
          case '-s':
          case '--steps':
            def.param.steps = parseInt(args[i+1]);
          break;
          case '-g':
          case '--group':
            def.param.group = parseInt(args[i+1]);
          break;
          case '-n':
          case '--net':
            def.param.name = args[i+1]
            def.param.net = process.cwd()+'/trained/'+def.param.name;
          break;
          default:
            def.action = 'stop';
            def.param = {
              code: 1,
              msg: `
Unrecognized param for command train. Available params are:
[-s, --steps, -g, --group, -n, --net]`
            }
          break;
        }
      }
    break;
    case 'list':
      def.action = 'stop';
      def.param = {
        code: 1,
        msg: readDirectory()
      }
    break;
    case 'help':
      def.action = 'stop';
      def.param = {
        code: 0,
        msg: `
Type commands [train, run, list, help] [params] to define a action to be executed by net.js.`
      }
    break;
    default:
      def.action = 'stop';
      def.param = {
        code: 1,
        msg: 'Unrecognized command. Available Commands  are [train, run, help, list].'
      };
    break;
  }
  return def;
}
function readDirectory(){
  const base = process.cwd() + '/trained/',
        files = fs.readdirSync(base, 'utf8');

  for(let i = 0; i < files.length; i++){
      console.log(`${path.basename(files[i], path.extname(files[i]))}`)
  }
}
