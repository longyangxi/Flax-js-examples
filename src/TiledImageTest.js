/**
 * Created by long on 15-2-17.
 */

var TiledImageTest = BaseScene.extend({
    onEnter:function()
    {
        this._super();
        var tImg = new flax.TiledImage(res.tiledImage, "tile1");
        this.addChild(tImg);

        flax.inputManager.addListener(tImg, function(){
            tImg.setTileSource(res.tiledImage, "tile0");
            for(var i = 0; i < tImg.getChildrenCount(); i++){
                if(Math.random() > 0.7){
                    tImg.children[i].gotoAndStop(flax.randInt(0, 5));
                }else{
                    tImg.children[i].gotoAndStop(0);
                }
            }
        })
    }
})