/**
 * @author Cliff Hall
 * 
 * @class RoutesMediator
 * @link https://github.com/PureMVC/puremvc-js-demo-todomvc.git
 */
puremvc.define({
        name: 'game.view.login.LoginMediator',
        parent: puremvc.Mediator
    },
 
    // INSTANCE MEMBERS
    {

        listNotificationInterests:function()
        {
            cc.log(this.notificationShow);
            var arr = [];
            arr.push(game.view.login.LoginMediator.NAME + "Show");
            arr.push(game.view.login.LoginMediator.NAME + "Hide");
            return arr;
        },
        handleNotification:function(note)
        {
            switch ( note.getName() )
            {
                case game.view.login.LoginMediator.NAME + "Show":

                    this.show();

                    break;

                case game.view.login.LoginMediator.NAME + "Hide":

                    this.hide();

                    break;

            }

        },
        onRegister: function ()
        {

        },


        show:function()
        {
            /*cc.loader.load(res,
                function (result, count, loadedCount) {
                    var percent = (loadedCount / count * 100) | 0;
                    percent = Math.min(percent, 100);
                    self._label.setString("Loading... " + percent + "%");
                }, function () {
                    if (self.cb)
                        self.cb();
                });*/
            game.manager.scene.SceneManager.getInstance().switchScene(game.manager.scene.SceneConstants.LOGIN, function()
            {
                game.manager.view.ViewManager.getInstance().showView("LoginView");

                
                //var loginView = new game.view.login.component.LoginView();
                //game.manager.scene.SceneManager.getInstance().getRunningScene().addChild(loginView);//100是z轴，表示放在最上面

            });
        },

        hide:function()
        {

        }
    },
     
     // STATIC MEMBERS
     {
         NAME: 'LoginMediator'
     }    
);
