/**
 * Created by long on 15-2-10.
 */

/**
 * 所有测试场景的基类
 * */
var BaseScene = cc.Scene.extend({
    onEnter:function()
    {
        this._super();
        var nav = flax.assetsManager.createDisplay(res.sceneNav, "SceneNav", {parent: this, zIndex: 99999});
        flax.inputManager.addListener(nav.leftBtn, this._showPrevScene);
        flax.inputManager.addListener(nav.rightBtn, this._showNextScene);
        flax.inputManager.addListener(nav.zhBtn, this._updateLanguage);
        flax.inputManager.addListener(nav.enBtn, this._updateLanguage);

        var info = Global.scenesList[currentSceneIndex];
        nav.navTxt.text = (currentSceneIndex + 1) + "/" + Global.scenesList.length;
        nav.titleTxt.text = flax.getLanguageStr(info.name);
    },
    _showPrevScene:function()
    {
        currentSceneIndex--;
        if(currentSceneIndex < 0) {
            currentSceneIndex = 0;
            return;
        }
        flax.replaceScene(Global.scenesList[currentSceneIndex].name);
    },
    _showNextScene:function()
    {
        currentSceneIndex++;
        if(currentSceneIndex > Global.scenesList.length - 1) {
            currentSceneIndex = Global.scenesList.length - 1;
            return;
        }
        flax.replaceScene(Global.scenesList[currentSceneIndex].name);
    },
    /**
     * 更新当前语言
     * */
    _updateLanguage:function(touch, event)
    {
        var lanBtn = event.currentTarget;
        if(lanBtn.name == "zhBtn"){
            flax.updateLanguage("zh");
        }else{
            flax.updateLanguage("en");
        }
        flax.refreshScene();
    }
})