/**
 * Created by long on 15-2-16.
 */

var GameShooters = BaseScene.extend({
    onEnter:function()
    {
        this._super();
        flax.assetsManager.createDisplay(res.shooters, "level1",{parent:this});
    }
})

var thePropNames = ["HealProp", "MultiProp", "SpeedProp", "ArmorProp"];

var BattleStage = flax.MovieClip.extend({
    enemies:null,
    props:null,
    onEnter:function()
    {
        this._super();
        //Init the global bullet container(SpriteBatchNode)
        flax.BulletCanvas.create(res.shooters, this);
        this.initElements();
        //Set the enemies as the player's target
        //TODO, there is another method with TileMap to check the bullet collision in Flax
        this['player'].targets = this.enemies;
        this['player'].props = this.props;
        //Scrolling background
//        var bg = new flax.ScrollingBG(this.bg);
//        bg.startYScroll(-50);
    },
    initElements:function()
    {
        this.enemies = [];
        this.props = [];
        for(var i = 0; i < this.getChildrenCount(); i++){
            var child = this.children[i];
            if(child instanceof Enemy){
                this.enemies.push(child);
            }else if(thePropNames.indexOf(child.assetID) > -1){
                this.props.push(child);
            }
        }
    }
})
/**
 * More available param in flax.GunParam of Gun.js
 * */
var PlayerGunParam = {
    bulletAssets:res.shooters,//the assets file of the bullet
    bulletID:"Bullet0",//the id of the bullet asset
    targetMap:null,//the TileMap name of the target to shoot
    damage:10,//the damage of the bullet, if it's Array with two elements, set a random value between them
    interval:0.5,//the interval time between two launch
    fireSound:null,//music.gun0,//the sound when fire
    fireEffectID:"FireEffect",//the id of fire effect, it must be packed with the bullet asset id together
    hitEffectID:"HitEffect"//the id of hit effect, it must be packed with the bullet assets id together
}

var EnemyGunParam = {
    bulletAssets:res.shooters,//the assets file of the bullet
    bulletID:"EnemyBullet",//the id of the bullet asset
    targetMap:null,//the TileMap name of the target to shoot
    damage:1,//the damage of the bullet, if it's Array with two elements, set a random value between them
    interval:0.5,//the interval time between two launch
    fireSound:null,//music.gun1,//the sound when fire
    fireEffectID:"FireEffect",//the id of fire effect, it must be packed with the bullet asset id together
    hitEffectID:"HitEffect"//the id of hit effect, it must be packed with the bullet assets id together
}

var Player = flax.Gunner.extend({
    props:null,
    onEnter:function()
    {
        this._super();
        this.health = this.maxHealth = 1000;
        this.setGunParam(PlayerGunParam, ["weapon0", "weapon1"]);
        this.autoShoot();
        this.play();
        flax.inputManager.addListener(this, this.onDrag, InputType.move, this)
    },
    onDrag:function(touch, event)
    {
        this.setPosition(touch.getLocation());
        //check the props
        for(var i = 0; i < this.props.length; i++){
            var prop = this.props[i];
            if(prop.mainCollider.checkCollision(this.mainCollider)){
                prop.destroy();
                switch(prop.assetID){
                    case "MultiProp":
                        this.upgradeGun({count:2}, 10)
                        break;
                    case "SpeedProp":
                        this.upgradeGun({interval:-0.2}, 10);
                        break;
                    case "ArmorProp":
                        this.hurtable = false;
                        var armor = flax.assetsManager.createDisplay(res.shooters, "HealCircle", {parent: this}, true);
                        armor.setPosition(cc.pAdd(this.getAnchorPointInPoints(),cc.p(0, 35)))
                        armor.play();
                        this.scheduleOnce(function(){
                            armor.destroy();
                            this.hurtable = true;
                        }, 10);
                        break
                    case "HealProp":
                        var healAnim = flax.assetsManager.createDisplay(res.shooters, "HealEffect",{parent: this, autoDestroyWhenOver: true}, true);
                        healAnim.setPosition(this.getAnchorPointInPoints());
                        healAnim.play();
                        this.health = Math.min(this.maxHealth, this.health + 100);
                        break;
                }
            }
        }
    },
    onDie:function()
    {
        this._super();
    }
})

var Enemy = flax.MCGunner.extend({
    onEnter:function()
    {
        this._super();
        this.health = this.maxHealth = 100;
        this.setGunParam(EnemyGunParam, ["weapon0"]);
        this.autoShoot();
        //The enemy always aim to the player
        this.aimToTarget(this.parent['player']);
        //Auto play children's animation when this is playing
        this.autoPlayChildren = true;
        this.sameFpsForChildren = false;
        this.gotoAndPlay("180");
    },
    onAimingTarget:function(angle)
    {
        angle = Math.round(angle/45)*45;
        if(angle == 360) angle = 0;
        this.gotoAndPlay("" + angle);
    },
    onDie:function()
    {
        var targets = this.parent['player'].targets;
        //Play die animation
        var dieAnim = flax.assetsManager.createDisplay(res.shooters, "EnemyDeath", {parent: this.parent, x: this.x, y: this.y, zIndex: this.zIndex}, true);
        dieAnim.autoDestroyWhenOver = true;
        dieAnim.onAnimationOver.add(function(anim){
            //New born enemy
            var newEnemy = flax.assetsManager.createDisplay(res.shooters, "Enemy", {parent: anim.parent, x: anim.x, y: anim.y, zIndex: anim.zIndex}, true);
            targets.push(newEnemy);
        }, this);
        dieAnim.play();

        var i = targets.indexOf(this);
        if(i > -1) targets.splice(i, 1);

        this._super();
    }
})
//Avoid the following class to be obscured in advanced compiled mode
window['BattleStage'] = BattleStage;
window['Player'] = Player;
window['Enemy'] = Enemy;