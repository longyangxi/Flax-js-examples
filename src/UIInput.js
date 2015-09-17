/**
 * Created by long on 15-3-6.
 */

var UIInput = BaseScene.extend({
    onEnter:function(){
        this._super();
        var ui = flax.assetsManager.createDisplay(res.uiInput, "InputPanel",{parent:this});
        //password input
        ui['pswTxt'].setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        ui['pswTxt'].setMaxLength(12);
        //set the placeholder font color
        ui['telTxt'].setPlaceholderFontColor(cc.color(51, 51, 51));
        //The input text is just EditBox, so you can do anything the EditBox can do
        ui['telTxt'].setDelegate(this);
    },
    editBoxEditingDidBegin: function (editBox) {
        cc.log(editBox.name + " DidBegin!");
    },
    editBoxEditingDidEnd: function (editBox) {
        cc.log(editBox.name + " DidEnd: " + editBox.getString());
    },
    editBoxTextChanged: function (editBox, text) {
        cc.log(editBox.name + " , TextChanged, text: " + text);
    },
    editBoxReturn: function (editBox) {
        cc.log(editBox.name + " was returned!");
    }
})