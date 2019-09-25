const brain = require('brain.js'),
      readline = require('readline'),
      fs = require('fs');

module.exports = {
  net: null,
  param: null,
  learn: function(tObj){
    console.log('Starting learning proccess.');
    this.net.train(tObj, {
      log: true,
      logPeriod: 1000,
      iterations: this.param.limit,
      errorThresh: 0.03
    });
    console.log('Learning process finished.');
  },
  loadSample: function(){
    let sample = [];
    rl = readline.createInterface({
      input: fs.createReadStream(this.param.input)
    })
    rl.on('line', (line) => {
      let number = parseInt(line)
      if(!isNaN(number)) sample.push(number);
    });

    return new Promise((resolve, reject)=>{
      rl.on('close', () => {
        const total = sample.length,
              trainerObj = [];

        for(let i = 0; i < sample.length - 4; i++){
          trainerObj.push([
              sample[i],
              sample[i + 1],
              sample[i + 2],
              sample[i + 3],
              sample[i + 4]
            ]);
        }
        resolve(trainerObj);
      });
    })
  },
  writeFile: function(){
    return new Promise((resolve, reject)=>{
      fs.writeFile(
        this.param.output,
          `module.exports = ${this.net.toFunction().toString()};`,
            (rst, err) => {
              if(err){
                reject({
                  code: 0,
                  msg: `Error: ${err}`
                });
              };
              resolve({
                code: 0,
                msg:`
The net ${this.param.output} was created with success.
Type "node net run ${this.param.name}" to access the net.`
              });
            }
      );
    });
  },
  init: async function(param){
    this.net = new brain.recurrent.LSTMTimeStep(),
    this.param = param;
    const tObj = await this.loadSample();

    this.learn(tObj);
    const rst = this.writeFile();

    return rst;
  }
}
