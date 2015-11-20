/**
 * Created by baoli on 2015/2/15.
 */

puremvc.declare("game.manager.view.ViewManager", cc.Class.extend({

    _viewInfo: {},
    _viewCache:{},

    ctor:function()
    {
        this.registerViewInfo("LoginView", game.view.login.component.LoginView, ["res/ui/login.png", "res/ui/login.plist", "res/login.json"]);
    },

    registerViewInfo: function (name, classObject, res)
    {
        this._viewInfo[name] = {"classObject": classObject, "res":res};
    },

    _cacheView: function (name)
    {
        if(this._viewCache[name]) return this._viewCache[name];

        var classObject = this._viewInfo[name].classObject;
        this._viewCache[name] = new classObject();
        return this._viewCache[name];
    },

    showView: function (name)
    {
        var self = this;

        cc.assert(this._viewInfo[name], name + ": 没有在管理器进行注册");

        game.manager.asset.AssetManager.getInstance().loadWidthDisplay(
            self._viewInfo[name]["res"],
            function(progress)
            {

            },
            function()
            {
                game.manager.layer.LayerManager.getInstance().getGameLayer().addChild(self._cacheView(name));
            }
        )
    }

}));

game.manager.view.ViewManager._instance;
game.manager.view.ViewManager.getInstance = function()
{
    if(!game.manager.view.ViewManager._instance)
    {
        game.manager.view.ViewManager._instance = new game.manager.view.ViewManager();
    }
    return game.manager.view.ViewManager._instance;
}

