let p = new puzzle ();
let TILESIZE=

puzzle.showTileOnPos =function (tileNumber, position, direction)
{
    let tile = $("#tile"+tileNumber)
    tile.removeClass("moveleft moveright moveup movedown");
    tile.addClass("move" + direction);
    setTilePosition(tile, position)
}

function setTilePosition(tile, pos) {
    let x = toPos % NCOLUMNS;
    let y = Math.floor(toPos / NCOLUMNS);
    tile.css("left", "" + (x * TILESIZE) + "px");
    tile.css("top", "" + (y * TILESIZE) + "px");
}


function onTileClick(tile, tileNumber) {
    p.moveTile (tileNumber)
}


 function paintTiles() {
    for (let tileIdx = 0; tileIdx < NFIELDS; tileIdx++) {
        let tile = $("#tile" + tileIdx);
        let x = tileIdx % NCOLUMNS;
        let y = Math.floor(tileIdx / NCOLUMNS);
        tile.css("background-position", "-" + (TILESIZE * x) + "px -" + (TILESIZE * y) + "px");
    }
}

function init () {
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
}
}();

$(document).ready(function () {
    puzzle.init();
});
