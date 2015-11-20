/**
 * Created by Administrator on 2015/6/29.
 */
puremvc.declare("game.manager.config.LevelConfigManager", cc.Class.extend(
    {
        getConfigByLevel:function(value)
        {
            var data = game.manager.asset.AssetManager.getInstance().getAsset("res/config/level.json");

            return data[value-1];
        }
    }
));