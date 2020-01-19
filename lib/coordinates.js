const MAX_COORDINATE = 50;

function Coordinates(x, y) {
    this.x = x;
    this.y = y;
}

/*
 * (4,3) --> 43
 * (43,4) --> 434
 * (4,34) --> 0434
 * (43,34) --> 4334
 */
Coordinates.prototype.toString = function () {
    const str = `${this.x}${this.y}`;
    if (this.y >= 10) {
        return str.padStart(4, '0');
    }

    return str;
}

Coordinates.parse = function(text) {
    let x, y;
    const len = text.length;
    switch (len) {
        case 2:
            x = parseInt(text.charAt(0), 10);
            y = parseInt(text.charAt(1), 10);
            break;

        case 3:
        case 4:
            x = parseInt(text.substring(0, 2), 10);
            y = parseInt(text.substring(2), 10);
            break;

        default:
            throw new Error(`Invalid Coordinates Format (${text})`);
    }

    if (isNaN(x) || x < 0 || x > MAX_COORDINATE) {
        throw new Error(`x coordinate should be in the (0, ${MAX_COORDINATE}) range`)
    }

    if (isNaN(y) || y < 0 || y > MAX_COORDINATE) {
        throw new Error(`y coordinate should be in the (0, ${MAX_COORDINATE}) range`)
    }

    return new Coordinates(x, y);
}

module.exports = Coordinates;