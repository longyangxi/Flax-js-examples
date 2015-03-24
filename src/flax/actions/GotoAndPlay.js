/**
 * Created by long on 15-3-20.
 */

flax.GotoAndPlay = cc.ActionInterval.extend({
    anim:null,
    isOver:false,
    ctor:function(anim)
    {
        cc.ActionInterval.prototype.ctor.call(this);
        this.anim = anim;
    },
    startWithTarget:function (target) {
        this._super(target);
        target.gotoAndPlay(this.anim);
        target.onAnimationOver.add(this.onAnimationOver, this);
        cc.log(this.anim);
        //todo
        this._duration = 1;
    },
    stop:function()
    {
        this.target.stop();
        this.target.onAnimationOver.remove(this.onAnimationOver);
        this._super();
    },
    clone:function()
    {
        return new flax.GotoAndPlay(this.anim);
    },
    isDone:function()
    {
        return this.isOver;
    },
    onAnimationOver:function(target)
    {
        this.isOver = true;
        this.target.onAnimationOver.remove(this.onAnimationOver);
    },
    update:function (dt) {
    }
});

flax.gotoAndPlay = function(anim)
{
    return new flax.GotoAndPlay(anim);
}