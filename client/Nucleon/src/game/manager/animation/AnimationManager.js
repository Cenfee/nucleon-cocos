/**
 * Created by Cenfee on 2015/3/5.
 * 动画管理器，负责播放骨骼动画，序列图动画等
 */
puremvc.declare("game.manager.animation.AnimationManager", cc.Class.extend({

    /**
     *  播放spine动画，动态加载spine动画的资源，回调spine实例
     * @param viewName  视图的名字
     * @param jsonUrl   spine动画的json数据路径
     * @param atlasUrl  spine动画的atlas数据路径
     * @param pngUrl    spine动画的png数据路径
     * @param onLoadComplete    动画实例生成回调
     * @param properties        应用于动画实例的属性
     */
    playSpineWidthUrl:function(viewName, jsonUrl, atlasUrl, pngUrl, onLoadComplete, properties)
    {
        var self = this;
        var res = [jsonUrl, atlasUrl, pngUrl];

        game.manager.asset.AssetManager.getInstance().loadViewAsset(
            viewName,
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

    /**
     * 请参考playSpineWidthUrl，简化三个数据文件路径的传入，自动根据spineUr加入三个文件的后缀名
     * @param viewName
     * @param spineUrl  自动根据spineUrl加入三个文件的后缀名
     * @param onLoadComplete
     * @param properties
     */
    playSpineWidthUrlFromSpineUrl:function(viewName, spineUrl, onLoadComplete, properties)
    {
        this.playSpineWidthUrl(viewName, spineUrl + ".json", spineUrl + ".atlas", spineUrl + ".png", onLoadComplete, properties);
    },

    /**
     * 播放spine动画,资源文件需要先预先加载好
     * @param jsonUrl   spine动画的json数据路径
     * @param atlasUrl  spine动画的atlas数据路径
     * @param pngUrl    spine动画的png数据路径
     * @param properties        应用于动画实例的属性
     * @returns {sp.SkeletonAnimation}
     */
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
            {
                anim.setAnimation(0, properties["animation"], properties["loop"] ? properties["loop"] : false);
            }

            if(properties["isAutoRemoveOnFinish"])
            {
                anim.setAnimationListener(this, function animationStateCallback(anim, trackIndex, type, event, loopCount)
                {
                    if(type == sp.ANIMATION_EVENT_TYPE.END)
                    {

                        cc.director.getScheduler().schedule(function()
                        {
                            anim.setAnimationListener(null, null);
                            anim.clearTracks();
                            anim.removeFromParent(true);
                        },
                            anim, 0.001, false, 0, false, "AnimationManager.playSpineWidthRes"
                       );
                    }
                });
            }

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