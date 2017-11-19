var puzzle = function () {
    let field = [null,5,2,15,8,1,4,14,7,6,3,13,12,11,10,9];
    
    let  tileSize;
    let fieldSize = 4; 
    
    function findTile (tileIndex)
    {
        for (let i=0;i<field.length; i++)
        {
            if (field[i] === tileIndex)
            {
                return i;
            }
        }
        return null;
    }

    function freeSpaceNextTo (pos)
    {
        if (field[pos-1]===null)
        {
            return { index: pos-1, direction: "left" };
        }
        if (field[pos+1]===null)
        {
            return { index: pos+1, direction: "right" };
        }
        if (field[pos-fieldSize]===null)
        {
            return { index: pos-fieldSize, direction: "up" };
        }
        if (field[pos+fieldSize]===null)
        {
            return { index: pos+fieldSize, direction: "down" };
        }
        return null;
    }

    function onTileClick (tile, tileIndex)
    {
        let pos = findTile (tileIndex);
        if (pos !== null)
        {
            let newpos = freeSpaceNextTo (pos);
            if (newpos)
            {
                showTileOnPos (tile, newpos.index);
                tile.removeClass("moveleft moveright moveup movedown");
                tile.addClass("move"+newpos.direction);
                field[pos] = null;
                field[newpos.index] = tileIndex;
            }
        }
        if (isSolved())
        {
            field[0] = 0;
            $("#tile0").show();
        }
    }

    function showTileOnPos (tile, index)
    {
        let x = index % fieldSize;
        let y = Math.floor (index / fieldSize);
        tile.css("left", ""+(x*tileSize)+"px"); 
        tile.css("top", ""+(y*tileSize)+"px") ;
    }

    function paintTiles ()
    {
        for (let tileIdx=0; tileIdx<16; tileIdx++)
        {
            let tile = $("#tile"+tileIdx);
            let x = tileIdx%fieldSize;
            let y = Math.floor(tileIdx/fieldSize);            
            tile.css ("background-position", "-"+(tileSize*x)+"px -"+(tileSize*y)+"px");
        }
    }

    function isSolved ()
    {
        for (let index=1;index<field.length; index++)
        {
            if (field [index] !== index)
            {
                return false;
            }
        }
        return true;
    }

    return {

        init: function ()
        {
            tileSize = $("#tile0").width();  
            paintTiles ();
            $("#tile0").hide();
            for (let index=1;index<field.length; index++)
                {
                    let tileIdx = field[index];
                    if (tileIdx != null)
                    {
                        let tile = $("#tile"+tileIdx);
                        showTileOnPos (tile, index);                       
                        tile.click (function () { onTileClick (tile, tileIdx);});
                    }
                }
                
            
        }
    };
} ();

$(document).ready(function(){
puzzle.init();    
});