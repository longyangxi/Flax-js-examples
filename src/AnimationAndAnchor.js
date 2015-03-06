/**
 * Created by long on 15-2-10.
 */

var AnimationWithAnchor = BaseScene.extend({
    onEnter:function(){
        this._super();
        var anim = flax.assetsManager.createDisplay(res.animation, "monkey_run", {parent: this, x: cc.visibleRect.center.x, y: cc.visibleRect.center.y});
        anim.play();

        var ui = flax.assetsManager.createDisplay(res.animation, "ui", {parent: this});
        //默认情况下，动画的fps和fla里的设置是一样的
        //In default, an animation's fps is the same as the settings in the fla
        ui.fpsTxt.text = "FPS: " + anim.fps;

        flax.inputManager.addListener(anim, function(){
            var fps  = anim.fps + 12;
            if(fps > 60) fps = 24;
            anim.fps = fps;
            ui.fpsTxt.text = "FPS: " + fps;
        });
    }
})