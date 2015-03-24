/**
 * Created by long on 15-2-14.
 */

/**
 * 为了让某些使用特殊字体的TTF文本能正确显示，请提前注册它所使用的字体
 * To make some TTF TextField used special font to display correctly, pleas pre-register its font
 * */
if(!cc.sys.isNative) flax.registerFont("AntsyPants", "res/font/ANTSYPAN.TTF");

var UIBmFont = BaseScene.extend({
    onEnter:function()
    {
        this._super();

        //注意uiBmFont.fla里的背景元件share.uiPanel.PanelBack，这个元件是从uiPanel.fla里共享的，assetID为PanelBack的元件
        //Note the background symbol of share.uiPanel.PanelBack in uiBmFont.fla, it is shared from the uiPanel.fla with assetID PanelBack
        var panel = flax.assetsManager.createDisplay(res.uiBMFont, "BMPanel", {parent:this});

        //注意uiBmFont.fla里，有一个ttf文本名叫：titleTxt__bmp，在程序中通过titleTxt来访问它，通过bmp这个ID切换多语言
        // 见locale/en.json or locale/zh.json，记住，project.json中languageJson必须为true才能开启多语言模式
        //Note the ttf TextField named titleTxt__bmp in the uiBmFont.fla, we visit it with name titleTxt, and update the multi-language
        //by the ID of bmp, see the locale/en.json or locale/zh.json
        //Remember: the property of languageJson must be true in project.json

        //panel.titleTxt.text = flax.getLanguageStr("bmp");

        //设置文本值
        //Set the text value
        panel['scoreTxt0'].text = 6666;

        panel['scoreTxt1'].text = 6666;
        //调整字符间距，spaceGap用于调整空格字符长度
        //Adjust the gap between the chars, spaceGap is used for adjusting the width of the space char
        panel['scoreTxt1'].gap = 5;

        //如果字符过多，文本将会自动缩放到文本框的矩形范围内
        //If the chars are too much for the text, it will auto scale down to fit in the rect
        panel['scoreTxt2'].text = 9999999;

        //5秒内从0跳到66666, 5秒的时间不精准
        //Tween the value from 0 to 66666 in 5 seconds, the time is not very accurate
        panel['scoreTxt3'].tweenInt(0, 66666, 5);
    }
})