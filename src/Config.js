/**
 * Created by long on 15-2-11.
 */

var Global = Global || {};

Global.scenesList = [
    //动画和锚点
    {name:"animation", class:AnimationWithAnchor, res:res_animation},
    //骨骼动画与控制
    {name:"skeleton", class:SkeletonAndControl, res:res_skeleton},
    //ui面板
    {name:"uiPanel", class:UIPanelScene, res:res_uiPanel},
    //光头强砍树游戏
    {name:"timberQiangMenu", class:MenuScene, res:res_timberQiang},
    {name:"timberQiangGame", class:GameScene}
];