/**
 * Created by long on 15-2-10.
 */
var SkeletonAndControl = BaseScene.extend({
    skeleton:null,
    ctrPanel:null,
    onEnter:function(){
        this._super();
        //产生动画
        //Create a skeleton animation
        this.skeleton = flax.assetsManager.createDisplay(res.skeleton, "monkey", {parent:this, x: cc.visibleRect.center.x - 100, y: cc.visibleRect.center.y});
        //Auto play children's animation when monkey playing, so the monkey can blink his eyes when gotoAndPlay("idle")
        //当播放这个骨骼动画时，自动播放子元素动画, 所以猴子在gotoAndPlay("idle")时可以眨眼
        this.skeleton.autoPlayChildren = true;
        //侦听每一帧改变事件：渲染一帧调用一次，频率为动画本身的fps
        //Listening the frame change signal, one callback one frame, the rate is according by the fps of the animation
        this.skeleton.onFrameChanged.add(this._onFrameChanged, this);
        //侦听帧Label事件
        //Listening the frame label change signal
        this.skeleton.onFrameLabel.add(this._onFrameLabel, this);
        //侦听动画完毕事件：如果是play()，最后一帧发出；如果是gotoAndPlay("anim"), anim动画的最后一帧发出
        //Listening the animation over signal, if tricked by play(), sent on the last frame;
        //or if gotoAndPlay("anim"), sent on the last frame of the animation "anim"
        this.skeleton.onAnimationOver.add(this._onAnimationOver, this);
        //侦听序列动画完毕事件: 当playSequence或playSequenceLoop时，在一个sequence结束时发出
        //Listening the animation sequence signal, sent when playSequence or playSequenceLoop is over
        this.skeleton.onSequenceOver.add(this._onSequenceOver, this);
        //控制面板
        //Control panel
        this.ctrPanel = flax.assetsManager.createDisplay(res.skeleton, "ControlPanel", {parent:this});
        //侦听按钮事件
        //Listening the buttons click
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
        cc.log("Command: " + btn['label'].text);
        //执行动画控制命令
        //Execute the animation control command
        eval("this.skeleton."+btn['label'].text);
        if(this.skeleton['head']){
            //Replace the head with anotherHead in this.skeleton's assetsFile
            this.skeleton.replaceChild("head", "anotherHead");
            //Replace the head with anotherHead in another assetsFile
//            this.skeleton.replaceChild("head", "anotherHead", res.animation);
        }
    },
    _onFrameChanged:function(frame)
    {
        //注: frame即this.skeleton.currentFrame
        //Note: frame is just the same as this.skeleton.currentFrame
        this.ctrPanel['infoTxt'].text = "FPS: " + this.skeleton.fps +", currentFrame: " + frame + ", playing: " + this.skeleton.playing + "\ncurrentLabel: " + this.skeleton.currentLabel + ", currentAnim: " + this.skeleton.currentAnim;
    },
    _onFrameLabel:function(label)
    {
//        this._showMsg("Frame label: " + label);
        cc.log("Frame label: " + label);
    },
    _onAnimationOver:function(sprite)
    {
        this._showMsg("Animation over!");
    },
    _onSequenceOver:function(sprite)
    {
//        this._showMsg("Sequence over!");
        cc.log("Sequence over!");
    },
    _showMsg:function(msg)
    {
        //注意第四个参数为true，对象销毁时将放入对象池，产生的时候优先从对象池拿取
        //Note the forth param is true, which means the animation will be put in the object pool when destroy
        //And fetch a new one from the pool
        var infoAnim = flax.assetsManager.createDisplay(res.skeleton, "InfoAnim", {parent: this, x : 140 + Math.random()*400, y : 300 + 500*Math.random()}, true);
        //文本信息
        //Text message
        infoAnim['info']['txt'].text = msg;
        //autoDestroyWhenOver: 表示动画完毕时，自动销毁，适合特效类动画 (Means auto destroy when animation is over, is good choice for effect animation)
        //autoStopWhenOver: 动画完毕时停在当前帧 (Stop at the current frame when animation is over)
        //autoHideWhenOver: 动画完毕时自动隐藏 (Hide itself when animation is over)
        infoAnim.autoDestroyWhenOver = true;
        //开始播放 (Start play animation)
        infoAnim.play();
    }
})
//Avoid the properties or methods to be obscured in advanced compiled mode
/** @expose */
SkeletonAndControl.prototype.skeleton;
/** @expose */
flax.FlaxSprite.prototype.play;
/** @expose */
flax.FlaxSprite.prototype.stop;
/** @expose */
flax.FlaxSprite.prototype.gotoAndPlay;
/** @expose */
flax.FlaxSprite.prototype.gotoAndStop;
/** @expose */
flax.FlaxSprite.prototype.playSequence;
/** @expose */
flax.FlaxSprite.prototype.playSequenceLoop;