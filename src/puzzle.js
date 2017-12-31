var Puzzle = function () {
    "use strict";
    let NCOLUMNS = 4;
    let NFIELDS = NCOLUMNS * NCOLUMNS;

    function Puzzle() {

        this.field = [];
        //[null,5,2,15,8,1,4,14,7,6,3,13,12,11,10,9];
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
            if (_isSolvable(f))
                return f;
        }
    }

    function _init(f) {
        if (f === undefined) {
            f = _randomizeField();
        } else {
            _checkField(f);
        }

        this.field = f;
    }

    function _checkField(f) {
        if (f.length !== NFIELDS)
            throw ("field has wrong length");
        for (let position = 1; position < NFIELDS; position++) {
            if (!f.includes(position))
                throw ("array is incomplete, value " + position + " is missing");
        }
        if (!f.includes(null))
            throw ("array must have null field");

        if (!_isSolvable(f))
            throw ("field is not a solvable puzzle");
    }

    // Algorithmus nach https://de.wikipedia.org/wiki/15-Puzzle
    function _isSolvable(f) {
        let nullIndex = f.findIndex(function (e) {
            return e === null;
        });
        if (nullIndex < 0)
            return false;
        let n1 = 1 + Math.floor(nullIndex / NCOLUMNS);
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
        for (let position = 0; position < NFIELDS; position++) {
            if (this.field[position] === tileNumber) {
                return position;
            }
        }
        return null;
    }

    function _freeSpaceNextTo(position) {
        if (this.field[position - 1] === null && position % NCOLUMNS > 0) {
            return {
                position: position - 1,
                direction: "left"
            };
        }
        if (this.field[position + 1] === null && position % NCOLUMNS < NCOLUMNS - 1) {
            return {
                position: position + 1,
                direction: "right"
            };
        }
        if (this.field[position - NCOLUMNS] === null) {
            return {
                position: position - NCOLUMNS,
                direction: "up"
            };
        }
        if (this.field[position + NCOLUMNS] === null) {
            return {
                position: position + NCOLUMNS,
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
        for (let position = 1; position < NFIELDS; position++) {
            if (this.field[position] !== position) {
                return false;
            }
        }
        return true;
    }

    function _showTileOnPos(tileNumber, position, direction) {

    }


    Puzzle.prototype.isSolved = _isSolved;
    Puzzle.prototype.init = _init
    Puzzle.prototype.getField = _getField
    Puzzle.prototype.moveTile = _moveTile
    Puzzle.prototype.showTileOnPos = _showTileOnPos

    return Puzzle;
}();
