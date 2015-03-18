/**
 * Created by long on 15-2-11.
 */

var Global = Global || {};

Global.scenesList = [
    //动画和锚点
    //Animation and the anchor
    {name:"animation", class:AnimationWithAnchor, res:res_animation},
    //骨骼动画与控制
    //Skeleton and the animation control
    {name:"skeleton", class:SkeletonAndControl, res:res_skeleton},
    //按钮
    //Button
    {name:"uiButton", class:UIButton, res:res_button},
    //自定义点击范围
    //Custom Click Area
    {name:"customClick", class:CustomClickTest, res:res_customClick},
    //进度条
    //ProgressBar
    {name:"uiProgress", class:UIProgress, res:res_progress},
    //位图字体
    //Bitmap Font
    {name:"uiBmFont", class:UIBmFont, res:res_uiBmFont},
    //输入文本
    //Input Text
    {name:"uiInput", class:UIInput, res:res_uiInput},
    //UI面板
    //UI panel
    {name:"uiPanel", class:UIPanelScene, res:res_uiPanel},
    //特效
    //effect
    {name:"effect", class:EffectAndPool, res:res_effect},
    //滚动背景
    //scroling BG
    {name:"scrollingBG", class: ScrollingBGTest, res:res_scrollingBG},
    //瓦片地图
    //Tiled Image
    {name:"tiledImage", class:TiledImageTest, res:res_tiledImage},
    //消除星星游戏
    //A simple game of popping stars
    {name:"poppingStars", class:GamePopStars, res:res_poppingStars},
    //泡泡游戏
    //A simple game of bubbles
    {name:"bubbles", class: GameBubbles, res:res_bubbles},
    //水果连连看
    //A simple game of fruits link
    {name:"fruitsLink", class: GameFruitsLink, res: res_fruitsLink},
    //射击
    //A simple game of shooters
    {name:"shooters", class: GameShooters, res: res_shooters},
    //物理游戏
    //A simple game of physics
    {name:"physics", class: GamePhysics, res: res_physics},
    //光头强砍树游戏
    //A simple game of timber qiang
    {name:"timberQiangMenu", class:MenuScene, res:res_timberQiang},
    {name:"timberQiangGame", class:GameScene}
];