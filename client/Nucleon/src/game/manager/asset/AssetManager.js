/**
 * Created by baoli on 2015/2/15.
 * 资源管理器，负责管理全局资源，视图资源
 */

puremvc.declare("game.manager.asset.AssetManager", cc.Class.extend({

    _viewAssets:{},

    ctor:function()
    {
        
    },


    /**
     * 加载视图资源
     * @param viewName  视图的名字
     * @param res       需要加载的资源
     * @param progress  加载进程
     * @param complete
     * @param isDisplay
     */
    loadViewAsset:function(viewName, res, progress, complete, isDisplay)
    {
        //cc.log("AssetManager:loadViewAsset " + res);
        if(!this._viewAssets[viewName])
            this._viewAssets[viewName] = [];

        this._viewAssets[viewName] = this._viewAssets[viewName].concat(res);

        if(isDisplay)
            this.loadWithDisplay(res, progress, complete);
        else
            this.load(res, progress, complete);
    },
    /**
     * 卸载视图资源
     * @param viewName  视图的名字
     */
    unloadViewAssets:function(viewName)
    {
        if (!this._viewAssets[viewName])
        {
            cc.log("AssetManager:unloadViewAssets " + "没有" + viewName);
            return;
        }
        //cc.log("AssetManager:unloadViewAssets " + this._viewAssets[viewName]);

        var moduleAsset = this._viewAssets[viewName];

        game.manager.asset.AssetUtil.unloadRes(moduleAsset);


        delete this._viewAssets[viewName];
    },

    /**
     * 使用默认的显示加载资源
     * @param res   需要加载的资源
     * @param progress  加载进度回调
     * @param complete  加载完成回调
     */
    loadWithDisplay:function(res, progress, complete)
    {
        this.load(
            res,
            function (result, count, loadedCount)
            {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                //cc.log("Loading... " + percent + "%");

                if(progress)
                    progress(percent);
            },
            function ()
            {
                if(complete)
                    complete();
            });
    },

    /**
     * 加载资源，将会根据默认规则，初始化资源，例如自动生成spriteFrameCache,
     * 想了解规则，可以参考game.manager.asset.AssetUtil.handleLoadedRes
     * @param res
     * @param progress
     * @param complete
     */
    load:function(res, progress, complete)
    {
        cc.loader.load(res, progress, function()
        {
            game.manager.asset.AssetUtil.handleLoadedRes(res);

            if(complete)
                complete();
        });
    },

    /**
     * 获取资源，根据url获取一个已经加载的资源，不会自动加载
     * 想了解规则，可以参考cc.loader.getRes
     *
     * @param url
     */
    getAsset:function(url)
    {
        var texture = cc.textureCache.getTextureForKey(url);
        if(texture)
            return texture;

        return cc.loader.getRes(url);
    }

}));

game.manager.asset.AssetManager._instance;
game.manager.asset.AssetManager.getInstance = function()
{
    if(!game.manager.asset.AssetManager._instance)
    {
        game.manager.asset.AssetManager._instance = new game.manager.asset.AssetManager();
    }
    return game.manager.asset.AssetManager._instance;
}

