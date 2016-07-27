# auto-track-event
让页面元素自动具有事件跟踪功能, 即前端自动打点, 自动监听页面元素的事件(click)并发送事件跟踪消息

即可以统计某些元素被用户使用了多少次, 例如注册按钮被点击了 1024 次

## 事件跟踪主要是为了做效果评估
* 某个新功能上线后, 可以看下新功能是否有用户点击, 以此来评估新功能是否够醒目, 用户是否知道新功能上线了
* 某个旧功能做优化, 优化后是否提升了用户的使用度
* 某个按钮是放在这里点击率高些, 还是放那里点击率高些, 做效果的对比

## 依赖
* 百度统计
* jQuery | Zepto

## 使用方法
完整使用请参考[项目主页](https://ufologist.github.io/auto-track-event/)

1. 在 head 结束前添加百度统计代码(已加的可以跳过)

    ```html
    <script>
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?{你的百度统计ID}";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
    })();
    </script>
    ```
2. 在页面底部(body 结束前)添加 jQuery 或者 Zepto(已加的可以跳过)

    ```html
    <script src="//cdn.bootcss.com/jquery/1.11.1/jquery.js"></script>
    ```
3. 在页面底部(body 结束前)添加 auto-track-event.js

    ```html
    <script src="//rawgit.com/ufologist/auto-track-event/master/auto-track-event.js"></script>
    ```
4. 给需要做事件跟踪的元素设置自定义属性 data-track-event

    ```html
    <button type="button" data-track-event>千万别点我</button>
    ```
5. 更多关于 data-track-event 属性的设置请参考 [auto-track-event.js 源码](https://github.com/ufologist/auto-track-event/blob/master/auto-track-event.js)