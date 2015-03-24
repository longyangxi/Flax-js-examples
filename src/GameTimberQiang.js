TREE_X = 323;
TREE_Y = 138;
SEG_H = 124;
MAX_TIME = 6;
START_TIME = 3;
CLICK_TIME = 0.25;

var score = 0;
var gameOver = false;

var MainGame = flax.MovieClip.extend({
    treeBatch:null,
    _currentY:0,
    _deathTree:false,
    _time:0,
    _started:false,
    onEnter:function(){
        this._super();
        this['t0'].play();
        this['t1'].play();
        this['player'].autoStopWhenOver = true;
        this['player'].zIndex = 2;
        this['player'].scale = 1.2;
        this['player'].side = 1;
        score = 0;
        gameOver = false;
        this['scoreTxt'].gap = -2;
        this['scoreTxt'].setString(0);
        flax.inputManager.addListener(this, this.onTouch,null, this)
        this.treeBatch = cc.SpriteBatchNode.create(cc.path.changeBasename(res.timberQiang, ".png"), 8);
        this.addChild(this.treeBatch, 2);
        this.initTree();

        this._time = START_TIME;
        this['energy']['bar'].percentage = 100*this._time/MAX_TIME;
        this.scheduleUpdate();
    },
    update:function(delta){
        if(!this._started || gameOver) return;
        this._time -= 1.8*delta*this['energy']['bar'].percentage/100;
        this._time -= 0.6*delta*Math.min(Math.max(0.5, 0.5*score/100),2);
        this['energy']['bar'].percentage = 100*this._time/MAX_TIME;
        if(this._time <= 0){
            this.unscheduleUpdate();
            this.onFailed();
        }
    },
    onTouch:function(touch, event){
        if(gameOver) return;
        this._started = true;
        if(this['t0']){
            this['t0'].destroy();
            this['t1'].destroy();
            this['t0'] = null;
            this['t1'] = null;
        }
        var pos = touch.getLocation();
        if(pos.x > cc.visibleRect.width/2){
            this['player'].scaleX = -1;
            this['player'].side = 2;
        }else{
            this['player'].scaleX = 1;
            this['player'].side = 1;
        }
        flax.playSound(music.chop);

        this['player'].gotoAndPlay(0);

        var tSide = this.treeBatch.getChildren()[0].side;
        if(tSide != 0 && tSide == this['player'].side){
            this.onFailed();
        }else{
            tSide = this.treeBatch.getChildren()[1].side;
            if( tSide == 0 || tSide != this['player'].side){
                score += 1;
                this._time += CLICK_TIME;
                this['scoreTxt'].setString(score);
                this.showTreeAnim();
                this['energy'].runAction(cc.Sequence.create(cc.ScaleTo.create(0.1, 1.1),cc.ScaleTo.create(0.1, 1.0)));
            }else{
                this.onFailed();
            }
            this.treeBatch.removeChildAtIndex(0, true);
            this.treeBatch.runAction(cc.MoveTo.create(0.1, cc.p(this.treeBatch.x, this.treeBatch.y - SEG_H)))
            this.createTreeSegment();
        }
    },
    initTree:function(){
        var t = flax.assetsManager.createDisplay(res.timberQiang, "tree0",{parent: this.treeBatch}, true);
        t.x = TREE_X;
        t.side = 0;
        this._currentY = t.y = TREE_Y + SEG_H/2;
        for(var i = 1; i < 6; i++){
            var tn = null;
            if(i < 3) tn = "tree0";
            this.createTreeSegment(tn);
        }
    },
    onFailed:function(){
        var death = flax.assetsManager.createDisplay(res.timberQiang,"death", {parent: this, zIndex:200}, true);
        death.x = (this['player'].side == 1) ? 150 : 500;
        death.y = 240;
        death.runAction(cc.MoveTo.create(0.3, cc.p(death.x, 150)));
        this['player'].destroy();
        this.scheduleOnce(function(){
            flax.assetsManager.createDisplay(res.timberQiang,"ResultPanel",{parent: this, zIndex:1000});
        },0.5);
        flax.playSound(music.fail);
        flax.inputManager.removeListener(null, this.onTouch);
    },
    showTreeAnim:function(){
        var anim = flax.assetsManager.createDisplay(res.timberQiang,"treeAnim",{parent: this, zIndex:2,autoDestroyWhenOver:true}, false);
        anim.fps = 60;
        anim.setPosition(TREE_X,TREE_Y + SEG_H - 65);
        anim.replaceChild("tree",this.treeBatch.getChildren()[0].assetID);
        anim.play();
        if(this['player'].side == 2) anim.scaleX = -1;
    },
    createTreeSegment:function(tn){
        var i = 0;
        if(tn == null) {
            if(!this._deathTree)  i = flax.randInt(1, 3);
            tn = "tree"+i;
            this._deathTree = i > 0;
        }
        this._currentY += SEG_H;
        var t = flax.assetsManager.createDisplay(res.timberQiang, tn,{parent: this.treeBatch}, true);
        t.x = TREE_X;
        t.y = this._currentY;
        t.side = i;
    }
});

var GameScene = BaseScene.extend({
    onEnter:function(){
        this._super();

        flax.playMusic(music.bg);

        var ui = flax.assetsManager.createDisplay(res.timberQiang, "MainGame");
        this.addChild(ui);
    }
});

var MenuScene = BaseScene.extend({
    onEnter:function(){
        this._super();
        var ui = flax.assetsManager.createDisplay(res.timberQiang, "MainMenu");
        this.addChild(ui);
        flax.inputManager.addListener(ui['startBtn'], function(){
           flax.replaceScene("timberQiangGame");
        });
        ui['player'].play();
    }
})

var ResultPanel = flax.MovieClip.extend({
   onEnter:function(){
       this._super();
       gameOver = true;
       flax.inputManager.addListener(this['startBtn'], function(){
           flax.replaceScene("timberQiangGame");
       },null, this);

       this['scoreTxt'].setString(parseInt(score));
       var record = false;
       if(flax.userData['score'] < score){
           flax.userData['score'] = score;
           flax.saveUserData();
           record = true;
       }
       this['bestTxt'].setString(parseInt(flax.userData['score']));
   }
});

//Avoid the following class to be obscured in advanced compiled mode
window['MainGame'] = MainGame;
window['ResultPanel'] = ResultPanel;