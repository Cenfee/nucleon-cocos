/**
 * 游戏的所有视图在这里标明
 */
puremvc.define({ name: "game.manager.extend.CocosFunction"}, {}, {

    createSpriteTouchListener:function(onTouchBegan, onTouchMoved, onTouchEnded, data)
    {
        var listener = cc.EventListener.create
        ({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,					   // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
            data:data,
            onTouchBegan: function (touch, event)
            {	 //实现 onTouchBegan 事件处理回调函数
                var target = event.getCurrentTarget();  // 获取事件所绑定的 target, 通常是cc.Node及其子类
                // 获取当前触摸点相对于按钮所在的坐标
                //var locationInNode = target.convertToNodeSpace(touch.getLocation());
                //var s = target.getContentSize();
                //var p = target.getAnchorPoint();
                var worldBound = target.getBoundingBoxToWorld();
                //var rect = cc.rect(-s.width*p.x, -s.height*p.y, s.width, s.height);
                //if (cc.rectContainsPoint(rect, locationInNode))
                if(cc.rectContainsPoint(worldBound, touch.getLocation()))
                {	   // 判断触摸点是否在按钮范围内
                    //cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    target.opacity = 180;
                    if(onTouchBegan)
                    {
                        onTouchBegan.call(this, touch, event);
                    }
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event)
            {		 //实现onTouchMoved事件处理回调函数, 触摸移动时触发
                // 移动当前按钮精灵的坐标位置
                //var target = event.getCurrentTarget();
                //var delta = touch.getDelta();			  //获取事件数据: delta
                //target.x += delta.x;
                //target.y += delta.y;

                if(onTouchMoved)
                {
                    onTouchMoved.call(this, touch, event);
                }
            },
            onTouchEnded: function (touch, event)
            {		 // 实现onTouchEnded事件处理回调函数
                var target = event.getCurrentTarget();
                //cc.log("sprite onTouchesEnded.. ");
                target.setOpacity(255);

                if(onTouchEnded)
                {
                    onTouchEnded.call(this, touch, event);
                }
            }
        });
        return listener;
    }

});