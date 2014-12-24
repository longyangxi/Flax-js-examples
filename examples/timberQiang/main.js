cc.game.onStart = function(){
    //初始化引擎
    flax.init(cc.ResolutionPolicy.SHOW_ALL, {score:0});
    //注册场景
    flax.registerScene("menu", MenuScene, res_maingame);
    flax.registerScene("game", GameScene, res_maingame);
    //运行场景
    flax.replaceScene("menu");
};
cc.game.run();