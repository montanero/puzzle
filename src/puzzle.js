import $ from 'jquery';
import './puzzle.css';

var puzzle = function () {
    let TILESIZE;
    let NCOLUMNS = 4;
    let NFIELDS = NCOLUMNS * NCOLUMNS;

    let field = randomizeField();
    //[null,5,2,15,8,1,4,14,7,6,3,13,12,11,10,9];

    function randomizeField() {
        while (true) {
            let f = [null];
            let indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            while (indexes.length > 0) {
                let i = Math.floor(Math.random() * indexes.length);
                f.push(indexes[i]);
                indexes.splice(i, 1);
            }
            if (isSolvable(f))
                return f;
        }
    }

    // Algorithmus nach https://de.wikipedia.org/wiki/15-Puzzle
    function isSolvable(f) {
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



    function findTile(tileIndex) {
        for (let i = 0; i < NFIELDS; i++) {
            if (field[i] === tileIndex) {
                return i;
            }
        }
        return null;
    }

    function freeSpaceNextTo(pos) {
        if (field[pos - 1] === null) {
            return {
                index: pos - 1,
                direction: "left"
            };
        }
        if (field[pos + 1] === null) {
            return {
                index: pos + 1,
                direction: "right"
            };
        }
        if (field[pos - NCOLUMNS] === null) {
            return {
                index: pos - NCOLUMNS,
                direction: "up"
            };
        }
        if (field[pos + NCOLUMNS] === null) {
            return {
                index: pos + NCOLUMNS,
                direction: "down"
            };
        }
        return null;
    }

    function onTileClick(tile, tileIndex) {
        let pos = findTile(tileIndex);
        if (pos !== null) {
            let newpos = freeSpaceNextTo(pos);
            if (newpos !== null) {
                showTileOnPos(tile, newpos.index);
                tile.removeClass("moveleft moveright moveup movedown");
                tile.addClass("move" + newpos.direction);
                field[pos] = null;
                field[newpos.index] = tileIndex;
            }
        }
        if (isSolved()) {
            field[0] = 0;
            $("#tile0").show();
        }
    }

    function showTileOnPos(tile, index) {
        let x = index % NCOLUMNS;
        let y = Math.floor(index / NCOLUMNS);
        tile.css("left", "" + (x * TILESIZE) + "px");
        tile.css("top", "" + (y * TILESIZE) + "px");
    }

    function paintTiles() {
        for (let tileIdx = 0; tileIdx < NFIELDS; tileIdx++) {
            let tile = $("#tile" + tileIdx);
            let x = tileIdx % NCOLUMNS;
            let y = Math.floor(tileIdx / NCOLUMNS);
            tile.css("background-position", "-" + (TILESIZE * x) + "px -" + (TILESIZE * y) + "px");
        }
    }

    function isSolved() {
        for (let index = 1; index < NFIELDS; index++) {
            if (field[index] !== index) {
                return false;
            }
        }
        return true;
    }

    return {

        init: function () {
            TILESIZE = $("#tile0").width();
            paintTiles();
            $("#tile0").hide();
            for (let index = 1; index < NFIELDS; index++) {
                let tileIdx = field[index];
                if (tileIdx != null) {
                    let tile = $("#tile" + tileIdx)
                    showTileOnPos(tile, index);
                    tile.click(function () {
                        onTileClick(tile, tileIdx);
                    });
                }
            }
        }
    };
}();

$(document).ready(function () {
    puzzle.init();
});
