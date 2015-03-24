/**
 * Created by long on 15-2-13.
 */
var UIButton = BaseScene.extend({
    onEnter:function()
    {
        this._super();

        var panel = flax.assetsManager.createDisplay(res.uiButton, "ButtonPanel", {parent: this});

        panel['simpleBtn2'].setMouseEnabled(false);
        panel['labelBtn2'].setMouseEnabled(false);

        //animBtn是一个很复杂的按钮，通过一个collider.Circle的元件，可限定其点击范围, 更多的collider我们将在后面示例中添加,包括物理编辑
        //animBtn is a complicated button, Flax defined its clickable area by a symbol of collider.Circle,
        // we will give more detail about collider in future include physics edit
        panel['animBtn'].playChildrenOnState = true;
        panel['animBtn'].clickSound = music.chop;
        flax.inputManager.addListener(panel['animBtn'], function(){
            panel['groupBtn2'].selected = true;
        })

        //设置按钮Label，并支持多语言，多语言配置json在res/locale/中
        //Set the Label for these buttons, and support multi-language, the language json is placed at res/locale/
        panel['groupBtn0']['label'].text = flax.getLanguageStr("Tab") + "0";
        panel['groupBtn1']['label'].text = flax.getLanguageStr("Tab") + "1";
        panel['groupBtn2']['label'].text = flax.getLanguageStr("Tab") + "2";

        //按钮组
        //Button Group
        var group = new flax.ButtonGroup();
        group.addButton(panel['groupBtn0'], panel['groupBtn1'], panel['groupBtn2']);
        group.onSelected.add(this._onButtonGroupChange);

        panel['groupBtn0'].selected = true;
    },
    _onButtonGroupChange:function(selected)
    {
        cc.log("Tab selected: " + selected.name);
    }
})