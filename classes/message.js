class Message {
  constructor(name, commands) {
    if (!name) {
        throw Error("Name required");
    }
    
    this.name = name;
    this.commands = commands;
  }
}

module.exports = Message;
