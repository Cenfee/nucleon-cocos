/**
 * Created by baoli on 2015/3/9.
 * 游戏多分辨率响应式管理器
 */
puremvc.declare("game.manager.responsive.ResponsiveManager", cc.Class.extend({



    /**
     * 配合cocostudio的百分比定位，实现根据当前显示的窗口进行百分比定位
     * @param ui    cocostudio的实例
     */
    doCcsViewUiByVisible:function(ui)
    {
       // ui.node.setPosition(cc.director.getVisibleOrigin().x, cc.director.getVisibleOrigin().y);
       var visibleSize = cc.director.getVisibleSize();
        ui.node.setContentSize(visibleSize.width, visibleSize.height);
        ccui.helper.doLayout(ui.node);
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