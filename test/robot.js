'use strict';

const assert = require('assert');
const Coordinates = require('../lib/coordinates');
const Robot = require('../lib/robot');

describe('Robot.parse()', () => {
    it('should throw if incorrect format', () => {
        const cases = [
            {
                text: '1',
                message: 'Invalid Robot Initial State Format (1)'
            },
            {
                text: '12',
                message: 'Invalid Robot Initial State Format (12)'
            },
            {
                text: '121',
                message: 'Invalid Robot Initial State Format (121)'
            },
            {
                text: '1211',
                message: 'Invalid Robot Initial State Format (1211)'
            },
            {
                text: '123Z',
                message: 'Invalid Robot Initial State Format (123Z)'
            },
            {
                text: '123WS',
                message: 'Invalid Robot Initial State Format (123WS)'
            },
            {
                text: '531S',
                message: 'x coordinate should be in the (0, 50) range'
            }
        ];

        cases.forEach(({ text, message }) => {
            assert.throws(
                () => Robot.parse(text),
                {
                    message
                }
            );
        });
    });

    it('should succeed otherwise', () => {
        const cases = [
            {
                text: '43S',
                direction: 'S',
                x: 4,
                y: 3
            },
            {
                text: '123N',
                direction: 'N',
                x: 12,
                y: 3
            },
            {
                text: '1203E',
                direction: 'E',
                x: 12,
                y: 3
            },
            {
                text: '4321W',
                direction: 'W',
                x: 43,
                y: 21
            },
        ];

        cases.forEach(({ text, direction, x, y }) => {
            const r = Robot.parse(text);
            assert.strictEqual(false, r.lost);
            assert.strictEqual(direction, r.direction);
            assert.strictEqual(x, r.position.x);
            assert.strictEqual(y, r.position.y);
        });
    });
});

describe('Robot.move()', () => {
    it('should not move if unkown movements', () => {
        const robot = Robot.parse('11W');
        robot.move('K', new Set(), new Coordinates(4, 4));
        assert.strictEqual(robot.toString(), '11W');
    });

    it('should go to 1,1 when moving forward from 1,0 direction North', () => {
        const robot = Robot.parse('10N');
        robot.move('F', new Set(), new Coordinates(4, 4));
        assert.strictEqual(robot.toString(), '11N');
    });

    it('should go to 1,0 when moving forward from 1,1 direction South', () => {
        const robot = Robot.parse('11S');
        robot.move('F', new Set(), new Coordinates(4, 4));
        assert.strictEqual(robot.toString(), '10S');
    });

    it('should go to 2,1 when moving forward from 1,1 direction East', () => {
        const robot = Robot.parse('11E');
        robot.move('F', new Set(), new Coordinates(4, 4));
        assert.strictEqual(robot.toString(), '21E');
    });

    it('should go to 0,1 when moving forward from 1,1 direction West', () => {
        const robot = Robot.parse('11W');
        robot.move('F', new Set(), new Coordinates(4, 4));
        assert.strictEqual(robot.toString(), '01W');
    });

    it('should get lost when moving forward direction West from 0,1', () => {
        const robot = Robot.parse('01W');
        const scent_coords = new Set();
        robot.move('F', scent_coords, new Coordinates(4, 4));
        assert.strictEqual(robot.toString(), '01WLOST');
        assert.ok(scent_coords.has('01'));
    });

    it('should ignore movement off the grid from a coordinate with scent', () => {
        const robot = Robot.parse('01W');
        const scent_coords = new Set(['01']);
        robot.move('F', scent_coords, new Coordinates(4, 4));
        assert.strictEqual(robot.toString(), '01W');
        assert.ok(scent_coords.has('01'));
    });

    it('should throw moving when the robot is already lost', () => {
        const robot = Robot.parse('01W');
        robot.lost = true;
        assert.throws(
            () => robot.move('R', new Set(), new Coordinates(4, 4)),
            {
                message: 'A lost robot cannot move!'
            }
        );
    });

    it('should change direction from E to S when moving right', () => {
        const robot = Robot.parse('11E');
        robot.move('R', new Set(), new Coordinates(4, 4));
        assert.strictEqual(robot.toString(), '11S');
    });

    it('should change direction from S to W when moving right', () => {
        const robot = Robot.parse('11S');
        robot.move('R', new Set(), new Coordinates(4, 4));
        assert.strictEqual(robot.toString(), '11W');
    });

    it('should change direction from W to N when moving right', () => {
        const robot = Robot.parse('11W');
        robot.move('R', new Set(), new Coordinates(4, 4));
        assert.strictEqual(robot.toString(), '11N');
    });

    it('should change direction from N to E when moving right', () => {
        const robot = Robot.parse('11N');
        robot.move('R', new Set(), new Coordinates(4, 4));
        assert.strictEqual(robot.toString(), '11E');
    });

    it('should change direction from E to N when moving left', () => {
        const robot = Robot.parse('11E');
        robot.move('L', new Set(), new Coordinates(4, 4));
        assert.strictEqual(robot.toString(), '11N');
    });

    it('should change direction from S to E when moving left', () => {
        const robot = Robot.parse('11S');
        robot.move('L', new Set(), new Coordinates(4, 4));
        assert.strictEqual(robot.toString(), '11E');
    });

    it('should change direction from W to S when moving left', () => {
        const robot = Robot.parse('11W');
        robot.move('L', new Set(), new Coordinates(4, 4));
        assert.strictEqual(robot.toString(), '11S');
    });

    it('should change direction from N to W when moving left', () => {
        const robot = Robot.parse('11N');
        robot.move('L', new Set(), new Coordinates(4, 4));
        assert.strictEqual(robot.toString(), '11W');
    });
});