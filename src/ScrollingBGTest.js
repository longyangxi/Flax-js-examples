/**
 * Created by long on 15-2-17.
 */

var ScrollingBGTest = BaseScene.extend({
    onEnter:function()
    {
        this._super();
        var ui = flax.assetsManager.createDisplay(res.scrollingBG, "ui", {parent:this});

        var sbg = new flax.ScrollingBG(ui.bg);

        ui.resetBtn.label.text = flax.getLanguageStr("reset");
        ui.startxBtn.label.text = flax.getLanguageStr("startx");
        ui.startyBtn.label.text = flax.getLanguageStr("starty");
        ui.pauseBtn.label.text = flax.getLanguageStr("pause");
        ui.resumeBtn.label.text = flax.getLanguageStr("resume");

        flax.inputManager.addListener(ui.resetBtn, function(){
            sbg.reset();
        },null, this);

        flax.inputManager.addListener(ui.startxBtn, function(){
            sbg.startXScroll(this._getSpeed());
        },null, this);
        flax.inputManager.addListener(ui.startyBtn, function(){
            sbg.startYScroll(this._getSpeed());
        },null, this);
        flax.inputManager.addListener(ui.pauseBtn, function(){
            sbg.pauseScroll();
        },null, this);
        flax.inputManager.addListener(ui.resumeBtn, function(){
            sbg.resumeScroll();
        },null, this);
    },
    _getSpeed:function()
    {
        var s = 200 + Math.random()*800;
        return (Math.random() > 0.5) ? -s : s;
    }
})