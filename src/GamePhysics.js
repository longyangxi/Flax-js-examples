/**
 * Created by long on 15-2-24.
 */
var theGravity = {x:0, y:-35};
var GamePhysics = BaseScene.extend({
    ui:null,
    gun:null,
    onEnter:function()
    {
        this._super();
        this.ui = flax.assetsManager.createDisplay(res.physics, "gameUI", {parent:this});
        this.gun = this.ui['gun'];
        this.initPhysics(this.ui);
        flax.inputManager.addListener(this.ui['back'], this.onClick, InputType.click, this);
    },
    initPhysics:function(ui){
        flax.createPhysicsWorld(theGravity);
        flax.startPhysicsWorld();

        ui.createPhysics(flax.physicsTypeStatic);
        ui.addPhysicsShape("topBar", 1, 0.3, 0.5);
        ui.addPhysicsShape("leftBar", 1, 0.3, 0.5);
        ui.addPhysicsShape("rightBar", 1, 0.3, 0.5);
        ui.addPhysicsShape("leftEdge", 1, 0.3, 0.5);
        ui.addPhysicsShape("rightEdge", 1, 0.3, 0.5);
        ui.addPhysicsShape("hole", 1, 0.3, 0.5, true);

//        ui.getCollider("leftEdge").debugDraw();
//        ui.getCollider("rightEdge").debugDraw();
//        ui.getCollider("hole").debugDraw();

        flax.onCollideStart.add(this.onCollid, this);
    },
    onClick:function(touch, event)
    {
        var pos = touch.getLocation();
        var rot = flax.getAngle(this.gun.getPosition(), pos);
        if(rot > 180) rot -= 360;
        rot = Math.max(-65, rot);
        rot = Math.min(65, rot);
        this.gun.rotation = rot;

        var anchor = this.gun.getAnchor("shoot");
        pos = cc.p(anchor.x, anchor.y);
        pos = this.gun.convertToWorldSpace(pos);

        var ball = flax.assetsManager.createDisplay(res.physics, "b" + flax.randInt(0, 5), {parent:this, zIndex: 99}, true);
        ball.setPosition(pos);
        ball.createPhysics(flax.physicsTypeDynamic, false, true);
        ball.addPhysicsShape("main", 1, 0.3, 0.5);
        var v = flax.getPointOnCircle(cc.p(), 1600, rot);
        ball.physicsBody.SetLinearVelocity({x: v.x/PTM_RATIO, y: v.y/PTM_RATIO});

        flax.clearDraw();
        var pos1 = flax.getPointOnCircle(pos, 600, rot);
        flax.physicsRaycast(function(collider,collisionPoint, endPoint, fraction){
            if(collider.name != "leftBar" && collider.name != "rightBar") return;
            flax.drawLine(pos, collisionPoint, 1, cc.color(0, 255, 0));
            flax.drawDot(collisionPoint);
            flax.drawLine(collisionPoint, endPoint);
        }, pos, pos1, 24);

//        if(this.ui.getCollider("hole").containsPoint(touch.getLocation())){
//            cc.log("click");
//        }
    },
    onCollid:function(collider0, collider1)
    {
        var ball;
        if(collider0 && collider0.name == "hole"){
            ball = collider1.owner;
        }else if(collider1 && collider1.name == "hole"){
            ball = collider0.owner;
        }
        if(ball){
            ball.scheduleOnce(ball.destroy, 0.01);
        }else{
            var mainfold = new Box2D.Collision.b2WorldManifold();
            collider0.physicsContact.GetWorldManifold(mainfold);
            var contactPoint = cc.pMult(mainfold.m_points[0], PTM_RATIO);
            var effect = flax.assetsManager.createDisplay(res.physics, "collideEffect", {parent:this, zIndex: 999, autoDestroyWhenOver:true}, true);
            effect.setPosition(contactPoint);
            effect.play();
        }
    }
})