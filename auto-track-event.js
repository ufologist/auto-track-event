/**
 * 让页面元素自动具有事件跟踪功能
 * 
 * @author https://github.com/ufologist/auto-track-event
 * @version 1.0.0 2016-7-27
 * 
 * 原理
 * --------
 * 给页面元素自动添加百度统计 trackEvent
 * 通过事件代理全局监听有自定义属性 data-track-event 元素的 click 事件来发送 trackEvent 通知 
 * data-track-event 属性存放一段 JSON 数据作为配置项
 * 
 * 具体配置如下(参考百度统计 - 事件跟踪 http://tongji.baidu.com/open/api/more?p=guide_trackEvent)
 * --------
 * {
 *   "category": "",            // 可选参数, 事件类型, 默认为页面标题
 *   "action": "",              // 可选参数, 事件名称, 默认会根据元素类型获取不同的值(val, text, href)
 *   "actionAttributeName": "", // 可选参数, 事件名称需要动态的从 data 属性中取时指定属性名
 *   "actionPrefix": "",        // 可选参数, 事件名称的前缀, 一般用于分类, 例如新增类, 设置类
 *   "label": "",               // 可选参数, 事件的一些额外信息
 *   "value": 1                 // 可选参数, 事件的一些数值信息
 * }
 * 
 * 使用示例(注意 data-track-event 属性用单引号, 这样才能方便使用 JSON 格式)
 * --------
 * 如果你很懒可以什么都不用设置
 * <button type="button" data-track-event>注册</button>
 * 
 * 一般我们只需设置 category 即可
 * <button type="button" data-track-event='{"category": "主页"}'>注册</button>
 * 
 * 如果需要从 data 属性中获取 action 的值可以这样做
 * <button type="button" data-track-event='{"actionAttributeName": "hint"}' data-hint="邀请">注册</button>
 * 
 * 如果需要给 action 添加一个前缀可以这样
 * <button type="button" data-track-event='{"actionPrefix": "用户"}'>注册</button>
 */
(function($, _hmt) {
if (!$) {
    throw new Error("dependency jQuery 1.7+ or Zepto 1.0+");
}

$(document.body).on('click', '[data-track-event]', function(event) {
    var $currentTarget = $(event.currentTarget);
    // data方法会自动将 data 中的 JSON 数据转成对象, 除非 data-track-event 为空(此时得到的是一个空字符串)
    var trackEventData = $currentTarget.data('track-event') || {};

    // 默认取页面的标题或者页面URL
    var category = trackEventData.category || document.title || window.location.href;

    var action = '';
    if (trackEventData.action) { // 可以显式的设置 action
        action = trackEventData.action;
    } else if (trackEventData.actionAttributeName) { // 从元素 data 中取
        action = $currentTarget.data(trackEventData.actionAttributeName);
    }
    // 如果没有设置 action, 则获取默认值
    if (!action) {
        if ($currentTarget.is('input, select, textarea')) { // 对于表单则取表单元素的值
            action = $currentTarget.val();
        } else if ($currentTarget.is('a')) { // 对于链接有文本则取文本, 否则取链接地址
            action = $currentTarget.text().trim() || $currentTarget.prop('href');
        } else {
            action = $currentTarget.text();
        }
    }
    action = action.trim();
    // 事件名称的前缀
    if (trackEventData.actionPrefix) {
        action = trackEventData.actionPrefix + ':' + action;
    }

    var label = trackEventData.label;
    var value = trackEventData.value;

    // 百度统计事件跟踪
    var args = [];
    args.push('_trackEvent');
    args.push(category.trim());
    args.push(action);
    // 事件跟踪的可选参数
    label && args.push(label);
    value && args.push(value);

    _hmt.push(args);
});
})(window.jQuery || window.Zepto, window._hmt);