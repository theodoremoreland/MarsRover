class Rover {
  constructor(position){
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }

  processCommand(command, value) {
    let result = {};

    switch(command) {
        case "STATUS_CHECK":
            result = {
                completed: true,
                mode: this.mode,
                generatorWatts: this.generatorWatts,
                position: this.position
            };
            break;
        case "MOVE":
            if (this.mode === "LOW_POWER") { 
                result.completed = false; 
                result.position = this.position;
            }
            else {
                result.completed = true;
                result.position = value; this.position = value;
            }
            break;
        case "MODE_CHANGE":
            result.completed = true;
            result.mode = value; this.mode = value;
            break;
        default:
            result.completed = false;
            result.message = 'UNKNOWN COMMAND';
    }

    return result;
  }

  receiveMessage(message) {
    const results = [];

    for (let _class of message.commands) {
        const command = _class.commandType;
        const value = _class.value;
        const result = this.processCommand(command, value);

        results.push(result); 
    }

    return { name: message.name, results: results };
  }
}

module.exports = Rover;