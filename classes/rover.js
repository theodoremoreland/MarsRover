class Rover {
  constructor(position){
    this.position = position
    this.mode = "NORMAL"
    this.generatorWatts = 110
  }
  receiveMessage(message) {
    let results = [];
    for (let _class of message.commands) {
      let command = _class.commandType;
      let value = _class.value;
      let result = {};
        if (command === "STATUS_CHECK") {
          result = {completed: true,
                    mode: this.mode,
                    generatorWatts: this.generatorWatts,
                    position: this.position
                    };
        } 
        else if ( command === "MOVE" ) {
          if (this.mode === "LOW_POWER") { 
            result.completed = false; 
            result.position = this.position;
            }
          else {
            result.completed = true;
            result.position = value; this.position = value;
            }
        }
        else if ( command === "MODE_CHANGE" ) {
          result.completed = true;
          result.mode = value; this.mode = value;
        }
        else {
          result.completed = false;
          result.message = 'UNKNOWN COMMAND';
        }
        results.push(result); 
    }
    return { name: message.name, results: results }
  }
}

module.exports = Rover;