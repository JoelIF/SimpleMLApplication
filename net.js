const definator = require('./modules/definator.js')
      trainer = require('./modules/trainer.js'),
      predictor = require('./modules/predictor.js');

const def = definator(process.argv);

main();
async function main(){
  let rst;
  switch (def.action){
    case 'train':
      rst = await trainer.init(def.param);
    break;
    case 'run':
      rst = await predictor.init(def.param);
    break;
    case 'stop':
      console.log(def.param.msg);
      process.exit(def.param.code);
    break;
  }//switch();
  console.log(rst.msg);
  process.exit(rst.code)
};//main()
