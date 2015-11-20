/**
 * Created by baoli on 2015/3/5.
 */
puremvc.declare("game.manager.layer.LayerManager", cc.Class.extend({

    _gameLayer:null,
    _popupLayer:null,
    _effectLayer:null,
    _alertLayer:null,
    _guideLayer:null,

    ctor:function()
    {
        this._gameLayer = new cc.Node();
        this._popupLayer = new cc.Node();
        this._effectLayer = new cc.Node();
        this._alertLayer = new cc.Node();
        this._guideLayer = new cc.Node();
    },

    addAllLayerWidthContainer:function(container)
    {
        container.addChild(this._gameLayer);
        container.addChild(this._popupLayer);
        container.addChild(this._effectLayer);
        container.addChild(this._alertLayer);
        container.addChild(this._guideLayer);
    },
    removeAllLayerWidthContainer:function(container)
    {
        container.removeChild(this._gameLayer);
        container.removeChild(this._popupLayer);
        container.removeChild(this._effectLayer);
        container.removeChild(this._alertLayer);
        container.removeChild(this._guideLayer);
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