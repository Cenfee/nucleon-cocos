/**
 * Created by baoli on 2015/2/15.
 * 场景管理器，切换场景时 会将图层管理器的所有图层移除，再加入到新场景，不会销毁所有子项
 */

puremvc.declare("game.manager.scene.SceneManager", cc.Class.extend({

    _currentSceneName:"",

    getRunningScene:function()
    {
        return cc.director.getRunningScene();
    },

    /**
     * 切换场景
     * @param name  场景的名字
     * @param onEnterCallback
     */
    switchScene:function(name, onEnterCallback)
    {
        if(this._currentSceneName == name)
            return;

        if(this._currentSceneName && this.getRunningScene())
            game.manager.layer.LayerManager.getInstance().removeAllLayerWithContainer(this.getRunningScene());

        this._currentSceneName = name;
        var newScene = new game.manager.scene.SceneBase();
        newScene.setCallbackEnter(function()
        {
            game.manager.layer.LayerManager.getInstance().addAllLayerWithContainer(newScene);
            if(onEnterCallback)
                onEnterCallback();
        });
        cc.director.runScene(newScene);


    }



}));

game.manager.scene.SceneManager._instance;
game.manager.scene.SceneManager.getInstance = function()
{
    if(!game.manager.scene.SceneManager._instance)
    {
        game.manager.scene.SceneManager._instance = new game.manager.scene.SceneManager();
    }
    return game.manager.scene.SceneManager._instance;
}

