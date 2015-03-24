/**
 * Created by long on 15-2-15.
 */
var LINK_WEIGHT = 2;
var LINK_COLOR = cc.color(255, 255, 255, 200);
var MAX_LEVEL = 5;
var fruitsMap = null;

var GameFruitsLink = BaseScene.extend({
    level:0,
    levelTime:60,
    timeLeft:0,
    totalFruits:0,
    panel:null,
    levelMap:null,
    onEnter:function()
    {
        this._super();

        this.panel = flax.assetsManager.createDisplay(res.fruits, "FruitsScene", {parent:this});
        this.panel['scoreTxt'].gap = - 3;
        this.panel['scoreTxt'].text = 0;
        this.panel['timeBar'].percentage = 100;

        this.timeLeft = this.levelTime;
        this.schedule(this.countDown, 1, cc.REPEAT_FOREVER, 1);

        fruitsMap = new flax.TileMap();
        fruitsMap.setTileSize(64, 64);
        fruitsMap.setMapSize(10,10);
        fruitsMap.offsetY = 64;
//        fruitsMap.showDebugGrid();
        this.newLevel();
    },
    countDown:function()
    {
        this.timeLeft--;
        if(this.timeLeft < 0){
            this.timeLeft = 0;
            this.unschedule(this.countDown);
            //todo,game over
            cc.log("Time is up, game over!");
        }
        this.panel['timeBar'].percentage = 100*this.timeLeft/this.levelTime;
    },
    newLevel:function()
    {
        this.level++;
        if(this.level > MAX_LEVEL) this.level = 1;

        if(this.levelMap){
            flax.inputManager.removeListener(this.panel['shuffleBtn'], this.levelMap.shuffle);
            flax.inputManager.removeListener(this.panel['findBtn'], this.levelMap.showHint);
            this.levelMap.destroy();
        }
        this.levelMap = flax.assetsManager.createDisplay(res.fruits, "level" + this.level, {parent: this});
        this.totalFruits = fruitsMap.getAllObjects().length;

        flax.inputManager.addListener(this.panel['shuffleBtn'], this.levelMap.shuffle, InputType.click, this.levelMap);
        flax.inputManager.addListener(this.panel['findBtn'], this.levelMap.showHint, InputType.click, this.levelMap);

        this.levelMap.onLinked.add(this.onLinked, this);
    },
    onLinked:function()
    {
        this.totalFruits -= 2;
        //Update the score
        this.panel['scoreTxt'].text = parseInt(this.panel['scoreTxt'].text) + 20;
        //Completed the level
        if(this.totalFruits == 0){
            var levelUp = flax.assetsManager.createDisplay(res.fruits, "LevelUpAnim", {parent:this, autoDestroyWhenOver:true}, true);
            levelUp.play();
            levelUp.setPosition(cc.visibleRect.center);
            levelUp.onAnimationOver.add(this.newLevel, this);
        }
    }
})

var LevelMap = flax.MovieClip.extend({
    onLinked:null,
    firstFruit:null,
    clickRect:null,
    _linkCanvas:null,
    onEnter:function()
    {
        this._super();
        LinkFinder.map = fruitsMap;
        for(var i = 0; i < this.getChildrenCount(); i++)
        {
            fruitsMap.snapToTile(this.children[i], null, null, true);
        }
        flax.inputManager.addListener(null, this.onClick, InputType.click, this);

        this._linkCanvas = new cc.DrawNode();
        this.addChild(this._linkCanvas, 9999);
        this.onLinked = new signals.Signal();
    },
    onExit:function()
    {
        this._super();
        flax.inputManager.removeListener(null, this.onClick);
        this.onLinked.removeAll();
    },
    onClick:function(touch, event)
    {
        var pos = touch.getLocation();
        var objs = fruitsMap.getObjects1(pos.x, pos.y);
        if(!objs.length) return;
        if(this.firstFruit == null){
            this.firstFruit = objs[0];
            //Show the hint animation
            this.clickRect = flax.assetsManager.createDisplay(res.fruits, "RectAnim", {parent:this, x: this.firstFruit.x, y: this.firstFruit.y, zIndex:999999},true);
            this.clickRect.play();
        }else{
            var secondFruit = objs[0];
            //Try to find the link between the two fruits
            var link = LinkFinder.findLink(this.firstFruit.tx, this.firstFruit.ty, secondFruit.tx, secondFruit.ty);
            //The link is valid and the assetID is the same, which means it's linkable
            if(link && this.firstFruit.assetID == secondFruit.assetID){
                //Remove the fruits from the tileMap
                this.firstFruit.tileMap = secondFruit.tileMap = null;
                //show the linked path
                this._showLinkedPath(link);
                //destroy the fruits
                this.firstFruit.destroy();
                secondFruit.destroy();
                //reset
                this.firstFruit = null;
                this.clickRect.destroy();
                this.clickRect = null;
                //dispatch the signal
                this.onLinked.dispatch()
            }else{
                //link failed, move the hint anim to the new start fruit
                this.firstFruit = secondFruit;
                this.clickRect.runAction(cc.moveTo(0.2, secondFruit.x, secondFruit.y));
            }
        }
    },
    /**
     * Show linked path
     * */
    _showLinkedPath:function(link)
    {
        for(var i = 1; i <= link.length - 1; i++)
        {
            var tile0 = link[i - 1];
            var tile1 = link[i];
            this._linkCanvas.drawSegment(fruitsMap.getTiledPosition(tile0.x, tile0.y),fruitsMap.getTiledPosition(tile1.x, tile1.y),LINK_WEIGHT,LINK_COLOR);
        }
        this.scheduleOnce(function(){
            this._linkCanvas.clear();
        }, 0.3);
    },
    shuffle:function()
    {
        LinkFinder.shuffle();
        if(this.clickRect){
            this.clickRect.destroy();
            this.clickRect = null;
        }
        this.firstFruit = null;
    },
    /**
     * Show linkable pair of fruits
     * */
    showHint:function()
    {
        var pair = LinkFinder.findAvailableLink();
        if(!pair) return;
        var fruit0 = pair[0];
        var fruit1 = pair[1];
        if(fruit0 && fruit0){
            var act0 = cc.RepeatForever.create(cc.Sequence.create(cc.FadeOut.create(0.2), cc.FadeIn.create(0.3)));
            fruit0.runAction(act0);
            var act1 = cc.RepeatForever.create(cc.Sequence.create(cc.FadeOut.create(0.2), cc.FadeIn.create(0.3)));
            fruit1.runAction(act1);
        }
    }
})
//Avoid LevelMap to be obscured in advanced compiled mode
window['LevelMap'] = LevelMap;