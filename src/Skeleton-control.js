/**
 * Created by long on 15-2-10.
 */
var SkeletonAndControl = BaseScene.extend({
    skeleton:null,
    ctrPanel:null,
    onEnter:function(){
        this._super();
        //产生动画
        this.skeleton = flax.assetsManager.createDisplay(res.skeleton, "monkey", {parent:this, x: cc.visibleRect.center.x - 100, y: cc.visibleRect.center.y});
        //侦听每一帧改变事件：渲染一帧调用一次，频率为动画本身的fps
        this.skeleton.onFrameChanged.add(this._onFrameChanged, this);
        //侦听动画完毕事件：如果是play()，最后一帧发出；如果是gotoAndPlay("anim"), anim动画的最后一帧发出
        this.skeleton.onAnimationOver.add(this._onAnimationOver, this);
        //侦听序列动画完毕事件: 当playSequence或playSequenceLoop时，在一个sequence结束时发出
        this.skeleton.onSequenceOver.add(this._onSequenceOver, this);
        //控制面板
        this.ctrPanel = flax.assetsManager.createDisplay(res.skeleton, "ControlPanel", {parent:this});
        //侦听按钮事件
        var children = this.ctrPanel.getChildren();
        for(var i = 0; i < children.length; i++){
            var child = children[i];
            if(flax.isButton(child)){
                flax.inputManager.addListener(child, this._controlAnim, InputType.click, this);
            }
        }
        this._onFrameChanged(0);
    },
    _controlAnim:function(touch, event)
    {
        var btn = event.currentTarget;
        cc.log("Command: " + btn.label.text);
        //执行动画控制命令
        eval("this.skeleton."+btn.label.text);
    },
    _onFrameChanged:function(frame)
    {
        //注: frame即this.skeleton.currentFrame
        this.ctrPanel.infoTxt.text = "FPS: " + this.skeleton.fps +", currentFrame: " + frame + ", playing: " + this.skeleton.playing + "\ncurrentLabel: " + this.skeleton.currentLabel + ", currentAnim: " + this.skeleton.currentAnim;
    },
    _onAnimationOver:function(sprite)
    {
        this._showMsg("Animation over!");
    },
    _onSequenceOver:function(sprite)
    {
        this._showMsg("Sequence over!");
    },
    _showMsg:function(msg)
    {
        //注意第三个参数为true，对象销毁时将放入对象池，产生的时候优先从对象池拿取
        var infoAnim = flax.assetsManager.createDisplay(res.skeleton, "InfoAnim", {parent: this, x : 140 + Math.random()*400, y : 300 + 500*Math.random()}, true);
        //文本信息
        infoAnim.info.txt.text = msg;
        //autoDestroyWhenOver=true表示动画完毕时，自动销毁，适合做特效类动画
        //还有autoStopWhenOver: 动画完毕时停在当前帧
        //还有autoHideWhenOver: 动画完毕时自动隐藏
        infoAnim.autoDestroyWhenOver = true;
        //开始播放
        infoAnim.play();
    }
})