
var userInfo = {coins: 900, energy: 100};
var itemsCount = [1, 5, 3, 10];
var itemsPrice = [100, 200, 300, 500];

var UIPanelScene = BaseScene.extend({
    onEnter:function(){
        this._super();
        //产生一个面板,注意面板背景元件jpg.PanelBack，jpg表示这个素材会被输出为单独的jpg而非打包到贴图里
        //Create a UI panel, note the background symbol of jpg.PanelBack, jpg means the asset will be exported as a single jpg file
        //instead of packing into the texture
        var panel = flax.assetsManager.createDisplay(res.uiPanel, "storePanel", {parent: this});
        //将子动画播放
        //Play a child animation
        panel.playBtn.play();
        //显示用户数据
        //Update the user info
        panel.coinsTxt.text = userInfo.coins;
        panel.energyTxt.text = userInfo.energy;
        //显示商店物品数据
        //Update the shop items info
        for(var i = 0; i < 4; i++)
        {
            var item = panel["p" + i];
            item.icon.gotoAndStop(i);
            item.countTxt.text = itemsCount[i];
            item.priceTxt.text = itemsPrice[i];
            item.__index = i;
            //侦听商店物品点击事件
            //Listening the click event of the shop item
            flax.inputManager.addListener(item, this._onItemClick, InputType.click, this);
        }
        //侦听playBtn的点击事件
        //Listening the click event of the playBtn
        flax.inputManager.addListener(panel.playBtn, this._onPlayClick, InputType.click, this);
    },
    _onItemClick:function(touch, event)
    {
        //currentTarget就是我们点选的物品
        //currentTarget is just the shop item we clicked
        var item = event.currentTarget;
        cc.log("NO." + item.__index + " item was clicked, its price is: " + item.priceTxt.text);
    },
    _onPlayClick:function(touch, event)
    {
        cc.log("playBtn was clicked!");
    }
});