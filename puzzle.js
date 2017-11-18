console.error("hallo");

var puzzle = function () {
    let  field = [[null,2,1],[0,3,4],[7,6,5]];

    function findTile (tileIndex)
    {
        for (let y=0;y<field.length; y++)
        {
            for (let x=0;x<field[y].length; x++)
            {
                if (field[y][x] == tileIndex)
                    return { "x": x, "y": y };
            }
        }
        return null;
    }

    function freeSpaceNextTo (pos)
    {
        if (pos.x > 0 && field [pos.y][pos.x-1] == null)
        {
            return { x: pos.x-1, y: pos.y, direction: "left" };
        }
        if (pos.x+1 < field[pos.y].length && field [pos.y][pos.x+1] == null)
        {
            return { x: pos.x+1, y: pos.y, direction: "right" };
        }
        if (pos.y > 0 && field [pos.y-1][pos.x] == null)
        {
            return { x: pos.x, y: pos.y-1, direction: "up" };
        }
        if (pos.y+1 < field.length && field [pos.y+1][pos.x] == null)
        {
            return { x: pos.x, y: pos.y+1, direction: "down" };
        }
        return null;
    }

    function onTileClick (tile, tileIndex)
    {
        let pos = findTile (tileIndex);
        if (pos)
        {
            let newpos = freeSpaceNextTo (pos);
            if (newpos)
            {
                showTileOnPos (tile, newpos.x, newpos.y );
                tile.removeClass("moveleft moveright moveup movedown");
                tile.addClass("move"+newpos.direction);
                field[pos.y][pos.x] = null;
                field[newpos.y][newpos.x] = tileIndex;
            }
        }
    }

    function showTileOnPos (tile, x, y)
    {
        tile.css("left", ""+(x*50)+"px"); 
        tile.css("top", ""+(y*50)+"px") ;
    }

    return {

        init: function ()
        {
            for (let y=0;y<field.length; y++)
            {
                for (let x=0;x<field[y].length; x++)
                {
                    let tileIdx = field[y][x];
                    if (tileIdx >= 0)
                    {
                        let tile = $("#tile"+tileIdx);
                        showTileOnPos (tile, x, y);
                        tile.click (function () { onTileClick (tile, tileIdx);});
                    }
                }
                
            }
        }
    };
} ();

$(document).ready(function(){
puzzle.init();    
});