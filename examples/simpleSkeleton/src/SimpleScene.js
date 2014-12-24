var SimpleScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var zombie = flax.assetsManager.createDisplay(res.zombie, "ZombieWalk", {parent: this, x: 200, y: 50, fps:60});
        zombie.play();
        //监听zombie的鼠标事件
        flax.inputManager.addListener(zombie, function(touch, event){
            //将zombie的脑袋（head）替换成戴帽子的脑袋（zombie_head6)
            zombie.replaceChild("head","zombie_head6");
        },InputType.click);
    }
});