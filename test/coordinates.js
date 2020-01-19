'use strict';

const assert = require('assert');
const Coordinates = require('../lib/coordinates');

describe('Coordinates.parse()', () => {
    it('should throw if incorrect format', () => {
        const cases = [
            {
                text: '1',
                message: 'Invalid Coordinates Format (1)'
            },
            {
                text: '12341',
                message: 'Invalid Coordinates Format (12341)'
            },
            {
                text: '532',
                message: 'x coordinate should be in the (0, 50) range'
            },
            {
                text: '2352',
                message: 'y coordinate should be in the (0, 50) range'
            },
            {
                text: '-123',
                message: 'x coordinate should be in the (0, 50) range'
            },
            {
                text: '23-2',
                message: 'y coordinate should be in the (0, 50) range'
            },
            {
                text: 'A532',
                message: 'x coordinate should be in the (0, 50) range'
            },
            {
                text: '23AB',
                message: 'y coordinate should be in the (0, 50) range'
            }
        ];

        cases.forEach(({ text, message }) => {
            assert.throws(
                () => Coordinates.parse(text),
                {
                    message
                }
            );
        });
    });

    it('should succeed otherwise', () => {
        const cases = [
            {
                text: '12',
                x: 1,
                y: 2
            },
            {
                text: '123',
                x: 12,
                y: 3
            },
            {
                text: '0213',
                x: 2,
                y: 13
            },
            {
                text: '4321',
                x: 43,
                y: 21
            },
        ];

        cases.forEach(({ text, x, y }) => {
            const c = Coordinates.parse(text);
            assert.strictEqual(x, c.x);
            assert.strictEqual(y, c.y);
            assert.strictEqual(text, c.toString());
        });
    });
});