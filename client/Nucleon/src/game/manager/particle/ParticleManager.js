/**
 * Created by baoli on 2015/3/4.
 * 粒子播放管理器
 */
puremvc.declare("game.manager.particle.ParticleManager", cc.Class.extend({

    /**
     * 播放粒子特效，动态加载资源
     * @param viewName  视图的名字
     * @param plistUrl  粒子特效的url
     * @param imgUrl    如果imgUrl为null，将会从plist文件中读取图片数据
     * @param onLoadComplete    粒子实例生成回调
     * @param properties        应用于粒子实例的属性
     */
    playWidthUrl:function(viewName, plistUrl, imgUrl, onLoadComplete, properties)
    {
        var self = this;
        var res;
        if(imgUrl)
            res = [plistUrl, imgUrl];
        else
            res = [plistUrl];

        game.manager.asset.AssetManager.getInstance().loadViewAsset(
            viewName,
            res,
            function (result, count, loadedCount)
            {

            },
            function ()
            {
                var emitter = self.playWidthRes(plistUrl, properties);
                if(onLoadComplete)
                    onLoadComplete.call(this, emitter);
            });

    },

    /**
     * 播放粒子特效,需要先加载需要的资源文件
     * @param plistUrl  Plist文件url
     * @param imgUrl    Img文件url
     * @param properties    应用于粒子实例的属性
     * @returns {cc.ParticleSystem}
     */
    playWidthRes:function(plistUrl, imgUrl, properties)
    {
        var emitter = new cc.ParticleSystem(plistUrl);

        if(properties && properties["container"])
            properties["container"].addChild(emitter);
        else
            game.manager.layer.LayerManager.getInstance().getEffectLayer().addChild(emitter);

        if(properties)
        {
            if(properties["x"] && properties["y"])
            {
                emitter.setPosition(properties["x"], properties["y"]);
            }
            else if(properties["x"])
            {
                emitter.setPosition(properties["x"]);
            }
            else if(properties["y"])
            {
                emitter.setPosition(properties["y"]);
            }

            if(properties["isAutoRemoveOnFinish"])
            {
                emitter.setAutoRemoveOnFinish(properties["isAutoRemoveOnFinish"]);
            }
        }


        return emitter;
    }

}));

game.manager.particle.ParticleManager._instance;
game.manager.particle.ParticleManager.getInstance = function()
{
    if(!game.manager.particle.ParticleManager._instance)
    {
        game.manager.particle.ParticleManager._instance = new game.manager.particle.ParticleManager();
    }
    return game.manager.particle.ParticleManager._instance;
}
