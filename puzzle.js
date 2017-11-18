var puzzle = function () {
    let field = [[null,5,2,15],[8,1,4,14],[7,6,3,13],[12,11,10,9]];
//    let field = [[1,null,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15]];
    
    let url = "roland.jpg";

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
        if (isSolved())
        {
            field[0][0] = 0;
            $("#tile0").show();
        }
    }

    function showTileOnPos (tile, x, y)
    {
        tile.css("left", ""+(x*50)+"px"); 
        tile.css("top", ""+(y*50)+"px") ;
    }

    function paintTiles ()
    {
        for (let tileIdx=0; tileIdx<16; tileIdx++)
        {
            let tile = $("#tile"+tileIdx);
            let x = tileIdx%field.length;
            let y = Math.floor(tileIdx/field.length);            
            tile.css ("background-position", "-"+(50*x)+"px -"+(50*y)+"px");
        }
    }

    function isSolved ()
    {
        for (let y=0;y<field.length; y++)
        {
            for (let x=0;x<field[y].length; x++)
            {
                if (field[y][x] != null && field[y][x] != y*field.length+x)
                 return false;
            }
        }
        return true;
    }

    return {

        init: function ()
        {
            paintTiles ();
            $("#tile0").hide();
            for (let y=0;y<field.length; y++)
            {
                for (let x=0;x<field[y].length; x++)
                {
                    let tileIdx = field[y][x];
                    if (tileIdx != null)
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