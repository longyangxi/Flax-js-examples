/**
 * Created by long on 15-2-17.
 */

var ScrollingBGTest = BaseScene.extend({
    onEnter:function()
    {
        this._super();
        var ui = flax.assetsManager.createDisplay(res.scrollingBG, "ui", {parent:this});

        var sbg = new flax.ScrollingBG(ui['bg']);
        //Following bgs is optional
        //下面添加的更多背景是可选的
        sbg.addSource(res.scrollingBG, "bg0");
        sbg.addSource(res.scrollingBG, "bg1");
        //如果scroll的loop设为false，滚动结束会触发这个事件
        //if the loop is flase when scroll, scroll over will trigger this event
        sbg.onScrolledOver.add(this._onScrolledOver, this);

        ui['resetBtn']['label'].text = flax.getLanguageStr("reset");
        ui['startxBtn']['label'].text = flax.getLanguageStr("startx");
        ui['startyBtn']['label'].text = flax.getLanguageStr("starty");
        ui['pauseBtn']['label'].text = flax.getLanguageStr("pause");
        ui['resumeBtn']['label'].text = flax.getLanguageStr("resume");

        flax.inputManager.addListener(ui['resetBtn'], function(){
            sbg.reset();
        },null, this);

        flax.inputManager.addListener(ui['startxBtn'], function(){
            sbg.startXScroll(this._getSpeed(), false);
        },null, this);
        flax.inputManager.addListener(ui['startyBtn'], function(){
            sbg.startYScroll(this._getSpeed());
        },null, this);
        flax.inputManager.addListener(ui['pauseBtn'], function(){
            sbg.pauseScroll();
        },null, this);
        flax.inputManager.addListener(ui['resumeBtn'], function(){
            sbg.resumeScroll();
        },null, this);
    },
    _getSpeed:function()
    {
        var s = 200 + Math.random()*800;
        return (Math.random() > 0.5) ? -s : s;
    },
    _onScrolledOver:function()
    {
        cc.log("Scrolled over!");
    }
})