/**
 * Created by long on 15-2-10.
 */

var AnimationWithAnchor = BaseScene.extend({
    onEnter:function(){
        this._super();
        var anim = flax.assetsManager.createDisplay(res.animation, "monkey_run", {parent: this, x: cc.visibleRect.center.x, y: cc.visibleRect.center.y});
        anim.play();
    }
})