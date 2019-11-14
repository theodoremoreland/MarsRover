class Command {
  constructor(commandType, value) {
    this.commandType = commandType;
    if (!commandType) {
      throw Error("Type required");
    }
    this.value = value;
  }

}

module.exports = Command;