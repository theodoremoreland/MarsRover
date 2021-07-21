const assert = require('assert');
const Rover = require('../classes/rover.js');
const Message = require('../classes/message.js');
const Command = require('../classes/command.js');

describe("Rover class", () => {
    let rover;

    beforeEach(() => {
        rover = new Rover("121500", ["Liftoff"]);
    });

    it("should set position and default values for mode and generatorWatts", () => {
        assert.strictEqual(rover.position, "121500");
        assert.strictEqual(rover.generatorWatts, 110);
    });

    it("should return name of message when calling receiveMessage method", () => {
        const message = new Message("e1"
                                    , [new Command('MODE_CHANGE', 'LOW_POWER')]);
        const response = rover.receiveMessage(message);

        assert.strictEqual(response.name, message.name);
    });

    it("should return two results if two commands are sent in message", () => {
        const message = new Message("e1"
                                    , [new Command('MODE_CHANGE', 'LOW_POWER')
                                    , new Command('STATUS_CHECK')]);
        const response = rover.receiveMessage(message);

        assert.strictEqual(response.results.length, message.commands.length);
    });

    it("should respond correctly to status check", () => {
        const message = new Message("e1"
                                    , [new Command('STATUS_CHECK')]);
        const response = rover.receiveMessage(message);
        const status = {completed: true,
                        mode: rover.mode,
                        generatorWatts: rover.generatorWatts,
                        position: rover.position
                        };
        let idx;

        for (let i in message.commands) {
            if (message.commands[i].commandType === 'STATUS_CHECK') { 
                idx = i;
                break;
            }
        }

        assert.deepStrictEqual(response.results[idx], status);
    });

    it("should respond with correct status after MODE_CHANGE", () => {
        const message = new Message("e1"
                                , [new Command('MODE_CHANGE', "LOW_POWER")]
                                );
        const response = rover.receiveMessage(message);

        assert.strictEqual(response.results[0].completed, true);
        assert.strictEqual(rover.mode, "LOW_POWER");
    });

    it("should respond with false completed value if attempt to move while in LOW_POWER mode", () => {
        const message = new Message("e1"
                                , [ new Command('MODE_CHANGE', "LOW_POWER"),
                                    new Command('MOVE', 25000) ]
                                    );
        const response = rover.receiveMessage(message);

        assert.strictEqual(response.results[1].completed, false);
    });

    it("should respond with position for move command", () => {
        const message = new Message("e1", [new Command('MOVE', 12000)]);
        rover.receiveMessage(message);

        assert.strictEqual(rover.position, 12000);
    });

    it("should respond with completed false and a message for an unknown command", () => {
        const message = new Message("e1"
                                , [new Command('DETONATE', 12000)]);
        const response = rover.receiveMessage(message);

        assert.strictEqual(response.results[0].completed, false);
        assert.strictEqual(response.results[0].message, 'UNKNOWN COMMAND');
    });
});