/**
 * Created by long on 15-3-18.
 */

var CustomClickTest = BaseScene.extend({
    p:null,
    onEnter:function()
    {
        this._super();
        this.p = flax.assetsManager.createDisplay(res.customClick, "panel", {parent:this});
        this.p['infoTxt'].text = "";
        for(var i = 0; i < 4; i++)
        {
            var m = this.p["m" + i]
            m.mainCollider.debugDraw();
            flax.inputManager.addListener(m, this._onClick, null, this);
        }
    },
    _onClick:function(touch, event)
    {
        var target = event.currentTarget;
        this.p['infoTxt'].text = target.name + " was clicked!";
        this.scheduleOnce(function(){
            this.p['infoTxt'].text = "";
        }, 1.0);
    }
})