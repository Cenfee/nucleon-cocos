/**
 * 游戏的所有视图在这里标明
 */
puremvc.define(
    {
        name: "game.manager.extend.ResizeHandler",
        constructor: function()
        {
            var self = this;
            cc.view.setResizeCallback(function()
            {
                if(self._isWaitForResize)
                    return;

                self._isWaitForResize = true;
                cc.director.getScheduler().schedule(function()
                    {
                        self._isWaitForResize = false;
                        cc.eventManager.dispatchCustomEvent(game.GameEvent.RESIZE);
                    },
                    self, 0.3, false, 0, false, "game.manager.extend.ResizeHandler.constructor");
            });

        }
    },

    {
        _isWaitForResize:false

    },

    {});