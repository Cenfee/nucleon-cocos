/**
 * Created by baoli on 2015/3/5.
 */
puremvc.declare("game.manager.animation.AnimationManager", cc.Class.extend({

    playSpineWidthUrl:function(jsonUrl, atlasUrl, pngUrl, onLoadComplete, properties)
    {
        var self = this;
        var res = [jsonUrl, atlasUrl, pngUrl];
        game.manager.asset.AssetManager.getInstance().load(
            res,
            function (result, count, loadedCount)
            {

            },
            function ()
            {
                var amin = self.playSpineWidthRes(jsonUrl, atlasUrl, pngUrl, properties);
                if(onLoadComplete)
                    onLoadComplete.call(self, anim);
            });
    },
    playSpineWidthUrlFromSpineUrl:function(spineUrl, onLoadComplete, properties)
    {
        this.playSpineWidthUrl(spineUrl + ".json", spineUrl + ".atlas", spineUrl + ".png", onLoadComplete, properties);
    },

    playSpineWidthRes:function(jsonUrl, atlasUrl, pngUrl, properties)
    {
        var anim = new sp.SkeletonAnimation(jsonUrl, atlasUrl);

        if(properties && properties["container"])
            properties["container"].addChild(anim);
        else
            game.manager.layer.LayerManager.getInstance().getEffectLayer().addChild(anim);

        if(properties)
        {
            if(properties["x"] && properties["y"])
            {
                anim.setPosition(properties["x"], properties["y"]);
            }
            else if(properties["x"])
            {
                anim.setPosition(properties["x"]);
            }
            else if(properties["y"])
            {
                anim.setPosition(properties["y"]);
            }

            if(properties["animation"])
                anim.setAnimation(0, properties["animation"], properties["loop"] ? properties["loop"] : true);
        }

        return anim;
    }

}));

game.manager.animation.AnimationManager._instance;
game.manager.animation.AnimationManager.getInstance = function()
{
    if(!game.manager.animation.AnimationManager._instance)
    {
        game.manager.animation.AnimationManager._instance = new game.manager.animation.AnimationManager();
    }
    return game.manager.animation.AnimationManager._instance;
}