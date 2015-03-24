/**
 * Created by long on 15-2-14.
 */
var COLS = 8;
var ROWS = 8;
var TILE_SIZE = 64
var MIN_COUNT = 3;

var GamePopStars = BaseScene.extend({
    tileMap:null,
    onEnter:function()
    {
        this._super();

        var bg = flax.assetsManager.createDisplay(res.poppingStars, "bg", {parent:this});
        flax.inputManager.addListener(bg, this.onClick, InputType.press, this);

        //create a new TileMap
        this.tileMap = new flax.TileMap();
        this.tileMap.setTileSize(TILE_SIZE, TILE_SIZE);
        this.tileMap.setMapSize(ROWS, COLS)
        this.tileMap.offsetX = 64;
        this.tileMap.offsetY = 180;
        //this.tileMap.showDebugGrid();

        //Initialize the whole map
        for(var i = 0; i < ROWS; i++)
        {
            for(var j = 0; j < COLS; j++)
            {
                var star = flax.assetsManager.createDisplay(res.poppingStars, "star" + flax.randInt(0, 4), {parent: this}, true);
                this.tileMap.snapToTile(star, i, j, true);
            }
        }
    },
    onClick:function(touch, event)
    {
        var pos = touch.getLocation();
        var objs = this.tileMap.getObjects1(pos.x, pos.y);
        if(objs.length){
            var star = objs[0];
            var stars = this.tileMap.findConnectedObjects(star, "assetID");
            if(stars.length >= MIN_COUNT - 1){
                //Destory all the stars with the same assetID(color)
                var rowsEffected = [];
                stars.push(star);
                for(var i = 0; i < stars.length; i++){
                    star = stars[i];
                    if(rowsEffected.indexOf(star.tx) == -1) rowsEffected.push(star.tx);
                    star.destroy();
                }
                for(var i = 0; i < rowsEffected.length; i++)
                {
                    //The stars above the blank tiles will fall
                    var row = rowsEffected[i];
                    var space = 0;
                    for(var col = 0; col < COLS; col++)
                    {
                        objs = this.tileMap.getObjects(row, col);
                        if(objs.length == 0){
                            space++;
                        }else{
                            star = objs[0];
                            if(space > 0){
                                //why not use moveTo action, setPosition will not be called in JSB
//                                star.runAction(cc.moveTo(0.2, star.x, star.y - TILE_SIZE*space));
                                star.moveTo(cc.p(star.x, star.y - TILE_SIZE*space), 0.2);
                            }
                        }
                    }
                    //Create new stars to fall
                    for(var j = 0; j < space; j++)
                    {
                        var targetPos = this.tileMap.getTiledPosition(row, COLS - j - 1);
                        var newStar = flax.assetsManager.createDisplay(res.poppingStars, "star" + flax.randInt(0, 4), {parent: this}, true);
                        newStar.tileMap = this.tileMap;
                        newStar.setPosition(targetPos.x, targetPos.y + 260 + Math.random()*60);
                        //why not use moveTo action, setPosition will not be called in JSB
//                        newStar.runAction(cc.moveTo(0.3, targetPos));
                        newStar.moveTo(targetPos, 0.3);
                    }
                }
            }
        }
    }
})