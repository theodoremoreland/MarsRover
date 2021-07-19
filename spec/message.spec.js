const assert = require('assert');
const Message = require('../classes/message.js');
const Command = require('../classes/command.js');

describe("Message class", () => {
    it("throws error if name NOT passed into constructor", () => {

        assert.throws(() => new Message(), { message: 'Name required' });
    });

    it("should set name via constructor", () => {
        const message = new Message("Alex");

        assert.strictEqual(message.name, "Alex");
    });

    it("should contain commands passed into constructor as 2nd argument", () => {
        const commands = [new Command('MODE_CHANGE', 'LOW_POWER')
                        , new Command('STATUS_CHECK')];
        const message = new Message("Alex", commands);

        assert.strictEqual(message.commands, commands);
    });
});