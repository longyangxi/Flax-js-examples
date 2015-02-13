var currentSceneIndex = 0;

cc.game.onStart = function(){
    //初始化引擎
    //第一个参数：分辨率模式
    //第二个参数：初始化用户数据，可以在cookie里存储复杂的数据
    flax.init(cc.ResolutionPolicy.SHOW_ALL,{score:0});

    //根据config配置来注册场景
    for(var i = 0; i < Global.scenesList.length; i++)
    {
        var s = Global.scenesList[i];
        //注册场景： 名字，场景，所需素材
        flax.registerScene(s.name, s.class, s.res);
    }

    //根据url来获取GET参数
    var getVars = flax.getUrlVars();
    //从url中解析是否有通过lan指定当前语言，否则按照project.json中的language设置或者系统语言
    if(getVars.lan) flax.updateLanguage(getVars.lan);
    //根据参数s，来显示第一个场景
    currentSceneIndex = getVars.s || 0;
    flax.replaceScene(Global.scenesList[currentSceneIndex].name);
};

cc.game.run();