/**
 * 游戏的所有视图在这里标明
 */
puremvc.define({ name: "game.manager.view.ViewConstants"}, {}, {

    LOAD_VIEW:"loadView",
    LOGIN_VIEW:"loginView",
    GAME_VIEW:"gameView",
    OVER_VIEW:"overView",
    TIMEUP_VIEW:"timeupView",
    PAUSE_VIEW:"pauseView",


    getViewInfos:function()
    {
        var viewInfos =
            {
                "loadView":
                {
                    classObject:game.view.load.component.LoadView,
                    assets:game.manager.asset.AssetConstants.viewAssets["loadView"]
                },

                "loginView":
                {
                    classObject:game.view.login.component.LoginView,
                    assets:game.manager.asset.AssetConstants.viewAssets["loginView"]
                },

                "gameView":
                {
                    classObject:game.view.game.component.GameView,
                    assets:game.manager.asset.AssetConstants.viewAssets["gameView"]
                },

                "overView":
                {
                    classObject:game.view.over.component.OverView,
                    assets:game.manager.asset.AssetConstants.viewAssets["overView"]
                },

                "timeupView":
                {
                    classObject:game.view.timeup.TimeupView,
                    assets:game.manager.asset.AssetConstants.viewAssets["timeupView"]
                },

                "pauseView":
                {
                    classObject:game.view.pause.PauseView,
                    assets:game.manager.asset.AssetConstants.viewAssets["pauseView"]
                }
            };

        return viewInfos;
    }

});