const fs = require('fs'),
      readline = require('readline'),
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

module.exports = {
  net: null,
  param: null,
  loadNet: function(){
    try{
      this.net = require(this.param.net);
    }catch(e){
      console.log('Net indicada não encontrada.');
      process.exit(1);
    }
  },
  getValues: async function (v){
    let values = [];
    console.log(`
Running the net ${this.param.name}.
Type a interger number followed by the Enter key.
Type "Ctrl+C" or "exit" to exit.
`)
    for(let i = 1; i <= this.param.steps; i++){
      let p = new Promise((resolve, reject) => {
        rl.question(`Type the ${i}º number: `, value => {
          if(value === 'exit'){
            process.exit(1);
          }
          resolve(parseInt(value))});
      });
      values.push(await p);
    };

    return values;
  },
  init: async function(param){
    this.param = param;

    this.loadNet();

    const recursive = async () => {
      const main = async () => {
        let values;
        try{
          values = await this.getValues();

        }catch(e){
          console.log(e);
        }
        const output = this.net(values);
        return `
--------------------------------------------------------------------------
Consindering the sample: ${values.join(', ')}.
The next number should be: ${Math.round(output)}.
Number obtained ${output}.
--------------------------------------------------------------------------`;
      }
      const res = await main();

      console.log(res);

      await recursive();
    }//recursive
    await recursive();
  }//initialize
}
