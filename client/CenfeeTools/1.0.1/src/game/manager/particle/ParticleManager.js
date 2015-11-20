/**
 * Created by baoli on 2015/3/4.
 */
puremvc.declare("game.manager.particle.ParticleManager", cc.Class.extend({

    playWidthUrl:function(plistUrl, autoRemoveOnFinish, onLoadComplete, properties)
    {
        var self = this;
        var res = [plistUrl];
        game.manager.asset.AssetManager.getInstance().load(
            res,
            function (result, count, loadedCount)
            {

            },
            function ()
            {
                var emitter = self.playWidthRes(plistUrl, autoRemoveOnFinish, properties);
                if(onLoadComplete)
                    onLoadComplete.call(this, emitter);
            });

    },

    playWidthRes:function(plistUrl, autoRemoveOnFinish, properties)
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
