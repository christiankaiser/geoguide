PLATFORM = '{--platform--}';

function loadUrl(url) {
    var target = '_system';
    if (typeof(Ext) != 'undefined') {
        if (Ext.os.deviceType == 'Desktop') target = '_blank';
    }
    if (PLATFORM == 'android') {
        navigator.app.loadUrl(url, {openExternal:true});
        return;
    }
    window.open(url, target);
}


// Native scrolling in Browser
// code from http://www.sencha.com/forum/showthread.php?110792-Add-support-for-mouse-scrolling-(for-development)
document.addEventListener('mousewheel', function(e){
    var el = e.target;
    var offset, scroller, _results;
    _results = [];
    while (el !== document.body) {
        if (el && el.className && el.className.indexOf('x-container') >= 0) {
            var cmp = Ext.getCmp(el.id);
            if (cmp && typeof cmp.getScrollable == 'function' && cmp.getScrollable()){
                var scroller = cmp.getScrollable().getScroller();
                if (scroller) {
                    var offset = {x:0, y: -e.wheelDelta*0.5};
                    scroller.fireEvent('scrollstart', scroller, scroller.position.x, scroller.position.y, e);
                    scroller.scrollBy(offset.x, offset.y);
                    scroller.snapToBoundary();
                    scroller.fireEvent('scrollend', scroller, scroller.position.x, scroller.position.y-offset.y);
                    break;
                }
            }
        }
        _results.push(el = el.parentNode);
    }
    return _results;
}, false);