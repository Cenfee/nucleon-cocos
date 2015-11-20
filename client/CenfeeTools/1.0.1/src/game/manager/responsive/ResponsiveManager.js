/**
 * Created by baoli on 2015/3/9.
 */
puremvc.declare("game.manager.responsive.ResponsiveManager", cc.Class.extend({


    doCcsViewUiByVisible:function(ui)
    {
        ui.node.setPosition(cc.director.getVisibleOrigin().x, cc.director.getVisibleOrigin().y);
        ui.node.setContentSize(cc.director.getVisibleSize().width, cc.director.getVisibleSize().height);
        ccui.helper.doLayout(ui.node);
    },

    doChildByVisible:function(child, percentX, percentY)
    {
        child.setPosition(
            cc.director.getVisibleOrigin().x + (cc.director.getVisibleSize().width-cc.director.getVisibleOrigin().x) * percentX,
            cc.director.getVisibleOrigin().y + (cc.director.getVisibleSize().height-cc.director.getVisibleOrigin().y) * percentY
        );
    }


}));

game.manager.responsive.ResponsiveManager._instance;
game.manager.responsive.ResponsiveManager.getInstance = function()
{
    if(!game.manager.responsive.ResponsiveManager._instance)
    {
        game.manager.responsive.ResponsiveManager._instance = new game.manager.responsive.ResponsiveManager();
    }
    return game.manager.responsive.ResponsiveManager._instance;
}