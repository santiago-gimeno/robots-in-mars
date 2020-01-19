'use strict';

const Coordinates = require('./coordinates');

function Robot(direction, position) {
    this.direction = direction;
    this.position = position;
    this.lost = false;
}

Robot.prototype.move = function(movement, scent_coords, upper_right_coord) {
    if (this.lost) {
        throw new Error('A lost robot cannot move!');
    }

    switch (movement) {
        case 'F':
            this.forward(scent_coords, upper_right_coord);
            break;

        case 'L':
            this.left();
            break;

        case 'R':
            this.right();
            break;

        default:
            // Unsupported state, skip the movement completely
    }
}

Robot.prototype.forward = function(scent_coords, upper_right_coord) {
    let new_position;
    switch (this.direction) {
        case 'N':
            new_position = new Coordinates(this.position.x,
                                           this.position.y + 1);
            break;
        case 'E':
            new_position = new Coordinates(this.position.x + 1,
                                           this.position.y);
            break;
        case 'S':
            new_position = new Coordinates(this.position.x,
                                           this.position.y - 1);
            break;
        case 'W':
            new_position = new Coordinates(this.position.x - 1,
                                           this.position.y);
            break;
        default:
            // It should never reach here
            throw new Error(`Unsupported Robot direction: ${this.direction}`);

    }

    if (out_of_bounds(new_position, upper_right_coord)) {
        const pos_str = this.position.toString();
        if (!scent_coords.has(pos_str)) {
            scent_coords.add(pos_str);
            this.lost = true;
        }

        return;
    }

    this.position = new_position;
};

Robot.prototype.left = function () {
    switch (this.direction) {
        case 'N':
            this.direction = 'W';
            break;
        case 'E':
            this.direction = 'N';
            break;
        case 'S':
            this.direction = 'E';
            break;
        case 'W':
            this.direction = 'S';
            break;
        default:
            // It should never reach here
            throw new Error(`Unsupported Robot direction: ${this.direction}`);
    
    }
}

Robot.prototype.right = function () {
    switch (this.direction) {
        case 'N':
            this.direction = 'E';
            break;
        case 'E':
            this.direction = 'S';
            break;
        case 'S':
            this.direction = 'W';
            break;
        case 'W':
            this.direction = 'N';
            break;
        default:
            // It should never reach here
            throw new Error(`Unsupported Robot direction: ${this.direction}`);
    
    }
}

Robot.prototype.toString = function () {
    return `${this.position}${this.direction}${this.lost ? 'LOST' : ''}`;
}

function parse(text) {
    const match = text.match(/^(\d{2,4})([NESW])$/);
    if (match === null) {
        throw new Error(`Invalid Robot Initial State Format (${text})`);
    }

    const position = Coordinates.parse(match[1]);
    return new Robot(match[2], position);
}

function out_of_bounds({ x, y }, upper_right_coord) {
    return (x < 0 || y < 0 || x > upper_right_coord.x || y > upper_right_coord.y);
}

module.exports = {
    parse
}