/**
 * Created by long on 15-2-14.
 */

var GameBubbles = BaseScene.extend({
    tileMap:null,
    blanks:null,
    onEnter:function()
    {
        this._super();

        var bg = flax.assetsManager.createDisplay(res.bubbles, "bg", {parent:this});
        flax.inputManager.addListener(bg, this.onClick, InputType.press, this);

        //create a new TileMap
        this.tileMap = new flax.TileMap();
        this.tileMap.isHexagon = true;
        this.tileMap.init(52, 48);
        this.tileMap.setMapSize(10, 12);
        this.tileMap.setPosition(56, 180);

        //Initialize the whole map
        for(var i = 0; i < this.tileMap.mapSize.width; i++)
        {
            for(var j = 0; j < this.tileMap.mapSize.height; j++)
            {
                var bubble = flax.assetsManager.createDisplay(res.bubbles, "b" + flax.randInt(0, 4), {parent: this}, true);
                this.tileMap.snapToTile(bubble, i, j, true);
            }
        }
    },
    onClick:function(touch, event)
    {
        var pos = touch.getLocation();
        var objs = this.tileMap.getObjects1(pos.x, pos.y);
        if(objs.length){
            var bubble = objs[0];
            //In scaling, dont handle
            if(bubble.scaleX < 1.0) return;
            var bubbles = this.tileMap.findConnectedObjects(bubble, "assetID");
            if(bubbles.length >= 2){
                //Destory all the bubbles with the same assetID(color)
                bubbles.push(bubble);
                this.blanks = [];
                for(var i = 0; i < bubbles.length; i++){
                    bubble = bubbles[i];
                    this.blanks.push(bubble.getPosition());
                    bubble.destroy();
                }
                this.scheduleOnce(this.reGenerate, 0.1);
            }
        }
    },
    reGenerate:function()
    {
        for(var i = 0; i < this.blanks.length; i++)
        {
            var pos = this.blanks[i];
            var newBubble = flax.assetsManager.createDisplay(res.bubbles, "b" + flax.randInt(0, 4), {parent: this, scaleX: 0.3 + Math.random()*0.2, scaleY: 0.3 + Math.random()*0.2}, true);
            newBubble.tileMap = this.tileMap;
            newBubble.setPosition(pos);
            newBubble.runAction(cc.scaleTo(0.1, 1.0, 1.0));
        }
    }
})