/**
 * Created by baoli on 2015/3/13.
 */
/**
 * AssetManager的协助类，根据规则处理加载的资源，卸载各种资源
 */
puremvc.define({ name: "game.manager.asset.AssetUtil"}, {}, {

    handleLoadedRes:function(res)
    {
        for(var resIndex=0; resIndex < res.length; ++resIndex)
        {
            //加载plist的时候，会自动加入frames，并且销毁存储在textureCache，cc.loader.cache里面的图片缓存。
             game.manager.asset.AssetUtil.handleSpriteFrames(res[resIndex]);
        }
    },
    handleSpriteFrames:function(url)
    {
        var type = cc.path.extname(url);
        if(type == ".plist")
        {
            var plistDict = cc.loader.getRes(url);
            if(plistDict["frames"])
            {
                var imgDirname = cc.path.mainFileName(url);
                var imgUrl = imgDirname + ".png";
                var plistTexture = cc.textureCache.getTextureForKey(imgUrl);
                cc.spriteFrameCache.addSpriteFrames(url, plistTexture);
            }
        }
    },

    unloadRes:function(res)
    {
        for(var resIndex=0; resIndex < res.length; ++resIndex)
        {
            var url = res[resIndex];
            var type = cc.path.extname(url);
            if(game.manager.util.PathUtil.checkIsImageURL(url))
            {
                cc.textureCache.removeTextureForKey(url);

                var resObject = cc.loader.getRes(url);

                //解决发布版 web 的bug
                if(resObject && resObject.src && cc.loader.getRes(resObject.src))
                {
                    cc.loader.release(resObject.src);
                    //cc.loader.release("http://localhost:63342/CandyLegend/publish/html5/"+url);
                }
            }
            else if(type == ".plist")
            {
                cc.spriteFrameCache.removeSpriteFramesFromFile(url);
            }
            if(type == ".json")
            {
            }


            if(cc.loader.getRes(url))
            {
                cc.loader.release(url);
            }
        }
    }
})