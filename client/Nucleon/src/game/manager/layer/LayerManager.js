/**
 * Created by baoli on 2015/3/5.
 * 游戏层级管理器，游戏层，弹出层，特效层等
 */
puremvc.declare("game.manager.layer.LayerManager", cc.Class.extend({

    _container:null,

    _gameLayer:null,
    _popupLayer:null,
    _effectLayer:null,
    _alertLayer:null,
    _guideLayer:null,

    ctor:function()
    {
        this._container = new cc.Node();

        this._gameLayer = new cc.Node();
        this._popupLayer = new cc.Node();
        this._effectLayer = new cc.Node();
        this._alertLayer = new cc.Node();
        this._guideLayer = new cc.Node();

        this._container.addChild(this._gameLayer);
        this._container.addChild(this._popupLayer);
        this._container.addChild(this._effectLayer);
        this._container.addChild(this._alertLayer);
        this._container.addChild(this._guideLayer);

        //bug 调用removeAllLayerWidthContainer，按js原理 还有一个变量引用，应该不会被回收， 但是C++里面被回收了，只能主动retain
        this._container.retain();
    },

    /**
     * 将所有的图层加入到特定容器
     * @param container
     */
    addAllLayerWithContainer:function(container)
    {
        /*
        container.addChild(this._gameLayer);
        container.addChild(this._popupLayer);
        container.addChild(this._effectLayer);
        container.addChild(this._alertLayer);
        container.addChild(this._guideLayer);
        */
        container.addChild(this._container);

    },
    /**
     * 将所有的图层移除于特定容器
     * @param container
     */
    removeAllLayerWithContainer:function(container)
    {
        /*
        container.removeChild(this._gameLayer, false);
        container.removeChild(this._popupLayer, false);
        container.removeChild(this._effectLayer, false);
        container.removeChild(this._alertLayer, false);
        container.removeChild(this._guideLayer, false);
        */
        container.removeChild(this._container, false);
    },

    getGameLayer:function()
    {
        return this._gameLayer;
    },
    getPopupLayer:function()
    {
        return this._popupLayer;
    },
    getEffectLayer:function()
    {
        return this._effectLayer;
    },
    getAlertLayer:function()
    {
        return this._alertLayer;
    },
    getGuideLayer:function()
    {
        return this._guideLayer;
    }
}));

game.manager.layer.LayerManager._instance;
game.manager.layer.LayerManager.getInstance = function()
{
    if(!game.manager.layer.LayerManager._instance)
    {
        game.manager.layer.LayerManager._instance = new game.manager.layer.LayerManager();
    }
    return game.manager.layer.LayerManager._instance;
}