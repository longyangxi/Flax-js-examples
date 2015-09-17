/**
 * Created by long on 15-2-14.
 */
var EffectAndPool = BaseScene.extend({
    onEnter:function()
    {
        this._super();
        //一般情况下，flax会在首次使用某个素材时自动解析，但对于稍大的素材，如果能预先处理，可避免第一次使用该素材可能造成的卡顿
        //Flax always auto parse an asset when used at the first time. But for some large size of asset, if we handled it in advance,
        //the game will run more smoothly when the asset is used at the first time
        flax.assetsManager.addAssets(res.effect);
        //侦听鼠标或者触摸
        //Listening the mouse or touch
        //第一个target参数为null，表示点击屏幕任何地方均可触发
        //The first param(target) is null, means clicking anywhere of the screen will trigger the event
        flax.inputManager.addListener(null, this._onClick);
    },
    _onClick:function(touch, event)
    {
        var pos = touch.getLocation();
        //autoDestroyWhenOver = true, 表示动画播放完毕自动销毁
        //means the animation will auto destroyed after played
        //第四个参数为true, 表示动画将由对象池来处理
        //The forth param(fromPool) = true, means the animation will handled by the ObjectPool
        var effect = flax.assetsManager.createDisplay(res.effect, "effect", {parent:this,x:pos.x, y:pos.y, autoDestroyWhenOver:true},true);
        effect.gotoAndPlay(0);
    }
})