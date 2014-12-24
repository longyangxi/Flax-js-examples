cc.game.onStart = function(){
    //初始化引擎
    //第一个参数：分辨率模式
    //第二个参数：初始化用户数据，可以在cookie里存储复杂的数据
    flax.init(cc.ResolutionPolicy.SHOW_ALL, {score:0});
    //注册场景
    flax.registerScene("menu", MenuScene, res_maingame);
    flax.registerScene("game", GameScene, res_maingame);
    //运行场景
    flax.replaceScene("menu");
};
cc.game.run();