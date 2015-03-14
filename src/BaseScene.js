/**
 * Created by long on 15-2-10.
 */

/**
 * 所有测试场景的基类
 * The base class of all the test scene
 * */
var BaseScene = cc.Scene.extend({
    onEnter:function()
    {
        this._super();

//        flax.createBGLayer(this, cc.color(102, 102, 102));
        flax.createBGLayer(this, cc.color(51, 51, 51));

        var nav = flax.assetsManager.createDisplay(res.sceneNav, "SceneNav", {parent: this, zIndex: 9999});
        //场景导航按钮事件
        //Navigation button event
        flax.inputManager.addListener(nav.leftBtn, this._showPrevScene, InputType.click, this);
        flax.inputManager.addListener(nav.rightBtn, this._showNextScene, InputType.click, this);

        //侦听按键事件
        //Listening the keyboard event
        flax.inputManager.addListener(this, this._onKeyDown, InputType.keyPress);

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
        var newScene = Global.scenesList[currentSceneIndex].name;
        //ignore physics demo in JSB
        if(cc.sys.isNative && newScene == "physics") this._showPrevScene();
        //todo, transiontion moves the scene then cause TileMap bug in JSB
        else flax.replaceScene(newScene);//, cc.TransitionMoveInB, 0.3);
    },
    _showNextScene:function()
    {
        currentSceneIndex++;
        if(currentSceneIndex > Global.scenesList.length - 1) {
            currentSceneIndex = Global.scenesList.length - 1;
            return;
        }
        var newScene = Global.scenesList[currentSceneIndex].name;
        //ignore physics demo in JSB
        if(cc.sys.isNative && newScene == "physics") this._showNextScene();
        //todo, transiontion moves the scene then cause TileMap bug in JSB
        else flax.replaceScene(newScene);//, cc.TransitionMoveInB, 0.3);
    },
    _onKeyDown:function(key)
    {
        if(key == "left") this._showPrevScene();
        else if(key == "right") this._showNextScene();
    }
})
/**
 * 特别注意：这里是Flax里资源到js类的动态映射，sceneNav.fla里有一个mc.TopBar的容器，创建时会优先寻找是否有一个js类叫TopBar，
 * 并继承于flax.MovieClip，有则动态映射过去，如果是逐帧动画，则应继承于flax.Animation
 *
 * Attention: Here we use the dynamic mapping in Flax, there is a container of mc.TopBar in sceneNav.fla, Flax will find if
 * there has a js class named TopBar and extends from flax.MovieClip when create this asset, if has, dynamic map to it. Of
 * course, if it's frame-by-frame animation, it should extend from flax.Animation
 *
 * Detail: http://flax.so/?p=196
 * */
var TopBar = flax.MovieClip.extend({
    onEnter:function()
    {
        this._super();
        //初始化暂停按钮和声音按钮
        //Initial the pause button and the sound button
        this.pauseBtn.selected = true;
        this.soundBtn.selected = !flax.getSoundEnabled();
        //侦听暂停和声音按钮事件
        //Listening the pause and sound button click event
        flax.inputManager.addListener(this.pauseBtn, this._onPauseChange, InputType.click, this);
        flax.inputManager.addListener(this.soundBtn, this._onSoundChange, InputType.click, this);
        //多语言切换按钮事件
        //Language switch button event
        flax.inputManager.addListener(this.zhBtn, this._updateLanguage);
        flax.inputManager.addListener(this.enBtn, this._updateLanguage);
    },
    _onPauseChange:function(touch, event)
    {
        //选取状态则暂停游戏
        //Pause the game if the pauseBtn is selected
        if(!this.pauseBtn.selected){
            //暂停游戏
            //Pause the game
            cc.director.pause();
            //弹出暂停面板
            //Popup a cover of pause
            var cover = flax.assetsManager.createDisplay(res.sceneNav, "PauseCover", {parent:flax.currentScene, zIndex:99999});
            //将面板作为遮挡层加入到inputManager，遮挡层以下的按钮事件将被屏蔽
            //Add the cover as a mask to the inputManager, the click event under the cover will be disabled
            flax.inputManager.addMask(cover);
            //点击cover的继续按钮，则游戏继续
            //Click the resumeBtn in the cover to resume the game
            flax.inputManager.addListener(cover.resumeBtn, function(){
                //销毁cover
                //Destroy the cover
                cover.destroy();
                //继续游戏
                //Resume the game
                cc.director.resume();
                //恢复按钮状态
                //Recover the state of the pauseBtn
                this.pauseBtn.selected = true;
            },InputType.click, this);
        }
    },
    _onSoundChange:function(touch, event)
    {
        //根据声音按钮是否选取状态来开关游戏声音
        //Enable or disable the game sound according to the sound button state,
        flax.setSoundEnabled(!this.soundBtn.selected);
    },
    /**
     * 更新当前语言, 语言的配置在res/locale的json中
     * Update the current language, the language config json is in res/locale
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