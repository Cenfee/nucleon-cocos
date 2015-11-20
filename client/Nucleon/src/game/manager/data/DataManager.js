/**
 * Created by baoli on 2015/3/14.
 */
/**
 * 数据管理器，游戏的简单数据保存管理器
 */
puremvc.declare("game.manager.data.DataManager", cc.Class.extend
({
    writeObject:function(object, url, onComplete)
    {
        var data = JSON.stringify(object);
        cc.sys.localStorage.setItem(url , data);
        if(onComplete)
            onComplete();
    },

    readObject:function(url, onComplete)
    {
        var data = cc.sys.localStorage.getItem(url);
        if (!data)
        {
            onComplete(null);
            return;
        }

        var object = JSON.parse(data);
        onComplete(object);
    },

    removeObject:function(url)
    {
        sys.localStorage.removeItem(url);
    }

}));

game.manager.data.DataManager._instance;
game.manager.data.DataManager.getInstance = function()
{
    if(!game.manager.data.DataManager._instance)
    {
        game.manager.data.DataManager._instance = new game.manager.data.DataManager();
    }
    return game.manager.data.DataManager._instance;
}
