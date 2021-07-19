class Command {
  constructor(commandType, value) {
    if (!commandType) {
        throw Error("Type required");
    }

    this.commandType = commandType;
    this.value = value;
  }
}

module.exports = Command;