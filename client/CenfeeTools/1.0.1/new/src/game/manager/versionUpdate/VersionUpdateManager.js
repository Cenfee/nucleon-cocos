/**
 * Created by baoli on 2015/3/9.
 */
GameVersionUpdateManager = cc.Class.extend({


    checkHotUpdate:function()
    {
        var scene = new AssetsManagerLoaderScene();
        scene.run();
    },

    loadGame:function()
    {
        var gameMainUrl = "res/version_update/game_main.json";
        cc.loader.load(
            [gameMainUrl],
            function (result, count, loadedCount)
            {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                cc.log("Loading... " + percent + "%");

            },
            function ()
            {
                var gameMainJsData = cc.loader.getRes(gameMainUrl);

                cc.loader.loadJs("", gameMainJsData["jsList"], function(err)
                {
                    var applicationFacade = new game.Application();
                });
            }
        );
    }
});

GameVersionUpdateManager._instance;
GameVersionUpdateManager.getInstance = function()
{
    if(!GameVersionUpdateManager._instance)
    {
        GameVersionUpdateManager._instance = new GameVersionUpdateManager();
    }
    return GameVersionUpdateManager._instance;
}

var AssetsManagerLoaderScene = cc.Scene.extend({
    _am:null,
    _progress:null,
    _percent:0,
    _percentByFile:0,
    __failCount:0,
    run:function(){
        if (!cc.sys.isNative) {
            this.loadGame();
            return;
        }

        var layer = new cc.Layer();
        this.addChild(layer);
        this._progress = new cc.LabelTTF.create("0%", "Arial", 12);
        this._progress.x = cc.winSize.width / 2;
        this._progress.y = cc.winSize.height / 2 + 50;
        layer.addChild(this._progress);

        // android: /data/data/com.huanle.magic/files/
        var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");

        this._am = new jsb.AssetsManager("res/version_update/project.manifest", storagePath);
        this._am.retain();

        if (!this._am.getLocalManifest().isLoaded())
        {
            cc.log("Fail to update assets, step skipped.");
            GameVersionUpdateManager.getInstance().loadGame();
        }
        else
        {
            var that = this;
            var listener = new jsb.EventListenerAssetsManager(this._am, function(event) {
                switch (event.getEventCode()){
                    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                        cc.log("No local manifest file found, skip assets update.");
                        GameVersionUpdateManager.getInstance().loadGame();
                        break;
                    case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                        that._percent = event.getPercent();
                        that._percentByFile = event.getPercentByFile();
                        cc.log(that._percent + "%");

                        var msg = event.getMessage();
                        if (msg) {
                            cc.log(msg);
                        }
                        break;
                    case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                    case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                        cc.log("Fail to download manifest file, update skipped.");
                        GameVersionUpdateManager.getInstance().loadGame();
                        break;
                    case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                    case jsb.EventAssetsManager.UPDATE_FINISHED:
                        cc.log("Update finished.");
                        GameVersionUpdateManager.getInstance().loadGame();
                        break;
                    case jsb.EventAssetsManager.UPDATE_FAILED:
                        cc.log("Update failed. " + event.getMessage());
// 直接重新下载失败的资源，建议你对重试次数计数，超过一定次数放弃
                        this.__failCount ++;
                        if (this.__failCount < 5)
                        {
                            that._am.downloadFailedAssets();
                        }
                        else
                        {
                            cc.log("Reach maximum fail count, exit update process");
                            this.__failCount = 0;
                            GameVersionUpdateManager.getInstance().loadGame();
                        }
                        break;
                    case jsb.EventAssetsManager.ERROR_UPDATING:
                        cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
                        GameVersionUpdateManager.getInstance().loadGame();
                        break;
                    case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                        cc.log(event.getMessage());
                        GameVersionUpdateManager.getInstance().loadGame();
                        break;
                    default:
                        break;
                }
            });

            cc.eventManager.addListener(listener, 1);
            this._am.update();
            cc.director.runScene(this);
        }

        this.schedule(this.updateProgress, 0.5);
    },
    updateProgress:function(dt){
        this._progress.string = "" + this._percent;
    },
    onExit:function(){
        cc.log("AssetsManager::onExit");

        this._am.release();
        this._super();
    }});