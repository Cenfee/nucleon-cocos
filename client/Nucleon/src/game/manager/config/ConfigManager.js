/**
 * Created by baoli on 2015/3/14.
 */
/**
 * 配置管理器，游戏的主要配置
 */
puremvc.declare("game.manager.config.ConfigManager", cc.Class.extend(
    {
        colors:["#ffffff", "#f97a41", "#f7cb4b", "#30a1dd", "#74bd4b", "#FFFFFF" ],
        totalTime:301,
        //totalTime:5,
        _levelConfigManager:null,
        getLevelConfigManager:function()
        {
            if(!this._levelConfigManager)
                this._levelConfigManager = new game.manager.config.LevelConfigManager();
            return this._levelConfigManager;
        }
    }
));

game.manager.config.ConfigManager._instance;
game.manager.config.ConfigManager.getInstance = function()
{
    if(!game.manager.config.ConfigManager._instance)
    {
        game.manager.config.ConfigManager._instance = new game.manager.config.ConfigManager();
    }
    return game.manager.config.ConfigManager._instance;
}
