/**
 * Created by long on 15-2-13.
 */
var UIProgress = BaseScene.extend({
    onEnter:function()
    {
        this._super();

        var panel = flax.assetsManager.createDisplay(res.uiProgress, "ProgressPanel", {parent: this});
        //水平进度条
        //Horizontal progress bar
        panel.p0.bar.percentage = 20 + Math.random()*70;

        panel.p1.bar.tween(0, 20 + Math.random()*70, 10);

        panel.p2.bar.reversed = true;
        panel.p2.bar.tween(0, 20 + Math.random()*70, 10);

        panel.p3.bar.type = flax.ProgressBarType.VERTICAL;
        panel.p3.bar.percentage = 20 + Math.random()*70;

        //垂直进度条
        //Vertical progress bar
        panel.p4.bar.type = flax.ProgressBarType.VERTICAL;
        panel.p4.bar.tween(0, 20 + Math.random()*70, 10);

        panel.p5.bar.type = flax.ProgressBarType.VERTICAL;
        panel.p5.bar.reversed = true;
        panel.p5.bar.tween(0, 20 + Math.random()*70, 10);

        panel.p6.bar.type = flax.ProgressBarType.RADIAL
        panel.p6.bar.percentage = 20 + Math.random()*70;

        //圆形进度条
        //Radial progress bar
        panel.p7.bar.type = flax.ProgressBarType.RADIAL
        panel.p7.bar.tween(0, 20 + Math.random()*70, 10);

        panel.p8.bar.type = flax.ProgressBarType.RADIAL
        panel.p8.bar.reversed = true;
        panel.p8.bar.tween(0, 20 + Math.random()*70, 10);

        //带动画的进度条，注意class参数，表示产生的显示对象是flax.ProgressBar类，而不是默认的flax.Animator
        //ProgressBar with animation, note the param of class, which means the display object is flax.ProgressBar instead of the default flax.Animator
        var anim = flax.assetsManager.createDisplay(res.animation, "monkey_run", {parent: this, x: 160,y: 280, class:"flax.ProgressBar"});
        anim.percentage = 60;
        anim.play();
    }
})