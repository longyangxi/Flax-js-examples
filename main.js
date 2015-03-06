var currentSceneIndex = 0;

cc.game.onStart = function(){
    //初始化引擎 (Initialize Flax)
    //第一个参数：分辨率模式 (First param: resolution policy)
    //第二个参数：初始化用户数据，可以在cookie里存储复杂的数据 (Second param: the initial user data saved with cookie)
    flax.init(cc.ResolutionPolicy.SHOW_ALL,{score:0, warningShowed:false});

    //根据config配置来注册场景 (Register all the scenes according by the Config.js)
    for(var i = 0; i < Global.scenesList.length; i++)
    {
        var s = Global.scenesList[i];
        //注册场景： 名字，场景，所需素材 (Register scene: scene name, scene class and the resources needed)
        flax.registerScene(s.name, s.class, s.res);
    }

    //根据url来获取GET参数 (Fetch the GET params by the url)
    var getVars = flax.getUrlVars();
    //从url中解析是否有通过lan指定当前语言，否则按照project.json中的language设置或者系统语言 (Param lan in url means current language)
    if(getVars.lan) flax.updateLanguage(getVars.lan);
    //根据参数sid，来显示第一个场景 (Param s in url means the initial scene index)
    currentSceneIndex = parseInt(getVars.sid) || 0;
    flax.replaceScene(Global.scenesList[currentSceneIndex].name);

    //Show the warning for a new user
    if(!flax.userData.warningShowed){
        alert("Warning: \n示例中所有的素材，只能作为学习目的使用，不得用于任何上线的游戏中，谢谢合作!\nAll the assets in this example, only can be used to research, is FORBIDDEN to any business project, thank you!")
        flax.userData.warningShowed = true;
        flax.saveUserData();
    }
};

cc.game.run();