/**
 * Created by baoli on 2015/2/15.
 * 视图管理器
 * 视图例如阵容系统，角色面板等
 */

puremvc.declare("game.manager.view.ViewManager", cc.Class.extend({

    _viewInfo: {},
    _viewCache:{},

    ctor:function()
    {
        //所有的视图的信息需要在这里进行注册
        var viewInfos = game.manager.view.ViewConstants.getViewInfos();
        for(var key in viewInfos)
        {
            this.registerViewInfo(key, viewInfos[key]["classObject"], viewInfos[key]["assets"]);
        };
    },

    /**
     * 注册视图信息
     * @param name
     * @param classObject
     * @param assets
     */
    registerViewInfo: function (name, classObject, assets)
    {
        this._viewInfo[name] = {"classObject": classObject, "assets":assets};
    },

    /**
     * 生成并且缓存视图
     * @param name  视图名
     * @returns {*}
     * @private
     */
    _cacheView: function (name)
    {
        if(this._viewCache[name]) return this._viewCache[name];

        var classObject = this._viewInfo[name].classObject;
        this._viewCache[name] = new classObject();
        this._viewCache[name].retain();
        return this._viewCache[name];
    },
    _uncacheView: function(name)
    {
        var view = this._viewCache[name];
        view.cleanup();
        view.release();
        delete this._viewCache[name];
    },

    /**
     * 显示视图
     * @param name  视图名
     * @param data complete completeThis
     */
    showView: function (name, data)
    {
        var self = this;

        cc.assert(this._viewInfo[name], name + ": 没有在管理器进行注册");

        game.manager.asset.AssetManager.getInstance().loadViewAsset(
            name,
            this._viewInfo[name]["assets"],
            function(progress)
            {

            },
            function()
            {
                var view = self._cacheView(name);
                if(data && data["complete"])
                    data["complete"].call(data["completeThis"], view);
                game.manager.layer.LayerManager.getInstance().getGameLayer().addChild(view);
            },
            true
        )
    },
    /**
     * 隐藏视图
     * @param name  视图名
     * @param clearup   是否销毁视图，如果销毁，也会把视图的资源从AssetManager销毁
     */
    hideView:function(name, clearup)
    {
        if(clearup == null)
            clearup = true;

        var view = this._viewCache[name];
        if(!view)
        {
            cc.log(name,"不在ViewManager缓存中");
            return;
        }

        game.manager.layer.LayerManager.getInstance().getGameLayer().removeChild(view, false);
        if(clearup)
        {
            this._uncacheView(name);
            game.manager.asset.AssetManager.getInstance().unloadViewAssets(name);
        }


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

