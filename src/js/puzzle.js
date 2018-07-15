"use strict";

function Puzzle(ncolumns) {
    this.field = [];
    this.ncolumns = ncolumns
    this.nfields = ncolumns * ncolumns
}

function _getField() {
    return this.field;
}

function _randomizeField() {
    while (true) {
        let f = [null];
        let indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        while (indexes.length > 0) {
            let i = Math.floor(Math.random() * indexes.length);
            f.push(indexes[i]);
            indexes.splice(i, 1);
        }
        if (this._isSolvable(f))
            return f;
    }
}

function _init(f) {
    if (f === undefined) {
        f = this._randomizeField();
    } else {
        this._checkField(f);
    }

    this.field = f;
    for (let i = 1; i < this.field.length; i++) {
        this.initTile(this.field[i], i)
    }
}

function _checkField(f) {
    if (f.length !== this.nfields)
        throw ("field has wrong length");
    for (let position = 1; position < this.nfields; position++) {
        if (!f.includes(position))
            throw ("array is incomplete, value " + position + " is missing");
    }
    if (!f.includes(null))
        throw ("array must have null field");

    if (!this._isSolvable(f))
        throw ("field is not a solvable puzzle");
}

// Algorithmus nach https://de.wikipedia.org/wiki/15-Puzzle
function _isSolvable(f) {
    let nullIndex = f.findIndex(function (e) {
        return e === null;
    });
    if (nullIndex < 0)
        return false;
    let n1 = 1 + Math.floor(nullIndex / this.ncolumns);
    let x = f.slice(0); // shallow copy
    x.splice(nullIndex, 1);
    let n2 = 0;
    for (let i = 1; i < x.length; i++) {
        for (let j = 0; j < i; j++) {
            if (x[j] > x[i])
                n2++;
        }
    }

    return (n1 + n2) % 2 == 1;
}

function _findTile(tileNumber) {
    for (let position = 0; position < this.nfields; position++) {
        if (this.field[position] === tileNumber) {
            return position;
        }
    }
    return null;
}

function _freeSpaceNextTo(position) {
    if (this.field[position - 1] === null && position % this.ncolumns > 0) {
        return {
            position: position - 1,
            direction: "left"
        };
    }
    if (this.field[position + 1] === null && position % this.ncolumns < this.ncolumns - 1) {
        return {
            position: position + 1,
            direction: "right"
        };
    }
    if (this.field[position - this.ncolumns] === null) {
        return {
            position: position - this.ncolumns,
            direction: "up"
        };
    }
    if (this.field[position + this.ncolumns] === null) {
        return {
            position: position + this.ncolumns,
            direction: "down"
        };
    }
    return null;
}

function _moveTile(tileNumber) {
    let position = _findTile.call(this, tileNumber);
    if (position !== null) {
        let newpos = _freeSpaceNextTo.call(this, position);
        if (newpos !== null) {
            this.showTileOnPos(tileNumber, newpos.position, newpos.direction);
            this.field[position] = null;
            this.field[newpos.position] = tileNumber;
        }
    }
}

function _isSolved() {
    for (let position = 1; position < this.nfields; position++) {
        if (this.field[position] !== position) {
            return false;
        }
    }
    return true;
}

function _showTileOnPos(tileNumber, position, direction) {

}

function _initTile(tileNumber, position) {}


Puzzle.prototype.isSolved = _isSolved;
Puzzle.prototype.init = _init
Puzzle.prototype.getField = _getField
Puzzle.prototype.moveTile = _moveTile
Puzzle.prototype.showTileOnPos = _showTileOnPos
Puzzle.prototype.initTile = _initTile
Puzzle.prototype._checkField = _checkField
Puzzle.prototype._isSolvable = _isSolvable
Puzzle.prototype._randomizeField = _randomizeField
module.exports = Puzzle;
