
var userInfo = {coins: 900, energy: 100};
var itemsCount = [1, 5, 3, 10];
var itemsPrice = [100, 200, 300, 500];

var UIPanelScene = BaseScene.extend({
    onEnter:function(){
        this._super();
        //产生一个面板
        var panel = flax.assetsManager.createDisplay(res.uiPanel, "storePanel", {parent: this});
        //将子动画播放
        panel.playBtn.play();
        //显示用户数据
        panel.coinsTxt.text = userInfo.coins;
        panel.energyTxt.text = userInfo.energy;
        //显示商店物品数据
        for(var i = 0; i < 4; i++)
        {
            var item = panel["p" + i];
            item.icon.gotoAndStop(i);
            item.countTxt.text = itemsCount[i];
            item.priceTxt.text = itemsPrice[i];
            item.__index = i;
            //侦听商店物品点击事件
            flax.inputManager.addListener(item, this._onItemClick, InputType.click, this);
        }
        //侦听playBtn的点击事件
        flax.inputManager.addListener(panel.playBtn, this._onPlayClick, InputType.click, this);
    },
    _onItemClick:function(touch, event)
    {
        //currentTarget就是我们点选的物品
        var item = event.currentTarget;
        cc.log("NO." + item.__index + " item was clicked, its price is: " + item.priceTxt.text);
    },
    _onPlayClick:function(touch, event)
    {
        cc.log("playBtn was clicked!");
    }
});