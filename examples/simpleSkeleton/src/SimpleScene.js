var SimpleScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var winSize = cc.visibleRect;
        var zombie = flax.assetsManager.createDisplay(res.zombie, "ZombieWalk", {parent: this, x: winSize.width/2, y: winSize.height/2, fps:60});
        zombie.play();
    }
});