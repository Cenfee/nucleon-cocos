/**
 * Created by Administrator on 2015/7/6.
 */
puremvc.define({ name: "game.manager.util.PathUtil"}, {}, {

    checkIsImageURL: function (url)
    {
        var ext = /(\.png)|(\.jpg)|(\.bmp)|(\.jpeg)|(\.gif)/.exec(url);
        return (ext != null);
    }
});