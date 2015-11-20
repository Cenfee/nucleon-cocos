/**
 * Created by baoli on 2015/2/15.
 */

puremvc.declare("game.manager.asset.AssetManager", cc.Class.extend({

    loadWidthDisplay:function(res, progress, complete)
    {
        cc.loader.load(
            res,
            function (result, count, loadedCount)
            {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                cc.log("Loading... " + percent + "%");

                if(progress)
                    progress(percent);
            },
            function ()
            {
                cc.log("什么东西");

                if(complete)
                    complete();
            });
    },

    load:function(res, progress, complete)
    {
        cc.loader.load(res, progress, complete);
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

