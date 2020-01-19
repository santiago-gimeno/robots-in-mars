'use strict';

const assert = require('assert');
const fs = require('fs');
const { spawn } = require('child_process');

describe('e2e sample test', () => {
    it('should generate the expected output', (done) => {
        let output = '';
        const input = fs.readFileSync(`${__dirname}/../input.txt`);
        const child = spawn(process.execPath, [ 'index.js' ]);
        child.stdout.on('data', d => {
            output += d;
        });
        
        child.on('close', () => {
            assert.strictEqual(output, '11E\n\n33NLOST\n\n23S\n\n');
            done();
        });
        
        child.stdin.end(input);
    });
});