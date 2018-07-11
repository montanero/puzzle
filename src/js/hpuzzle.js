let Puzzle = require ("./puzzle")
let $ = require ("jquery")

let p = new Puzzle ();

let NCOLUMNS=4
let TILESIZE= 0

p.showTileOnPos =function (tileNumber, position, direction)
{
    let tile = $("#tile"+tileNumber)
    tile.removeClass("moveleft moveright moveup movedown");
    tile.addClass("move" + direction);
    setTilePosition(tile, position)
}

p.initTile = function (tileNumber, position)
{
    let tile = $("#tile"+tileNumber)
    setTilePosition(tile, position)
    setTileBackground (tile, tileNumber)
    tile.click(function () {
        onTileClick(tile, tileNumber);
    });
}

function setTilePosition(tile, pos) {
    let x = pos % NCOLUMNS;
    let y = Math.floor(pos / NCOLUMNS);
    tile.css("left", "" + (x * TILESIZE) + "px");
    tile.css("top", "" + (y * TILESIZE) + "px");
}

function setTileBackground (tile, tileNumber)
{
    let backgroundX = tileNumber % NCOLUMNS;
    let backgroundY = Math.floor(tileNumber / NCOLUMNS);
    tile.css("background-position", "-" + (TILESIZE * backgroundX) + "px -" + (TILESIZE * backgroundY) + "px");
}

function onTileClick(tile, tileNumber) {
    p.moveTile (tileNumber)
}

function init () {
    let tile0 = $("#tile0");
    TILESIZE = tile0.width();
    setTileBackground(tile0, 0)
    tile0.hide();
    p.init();
}

$(document).ready(function () {
    init();
});
