(function($) {
  $.fn.lider = function(options) {
    return this.each(function() {
      var setting = $.extend({
        labelWidth: 40,
        firstPage: 1,
        duration: 400,
        easing: 'swing'
      }, options);
      var showPage = setting['firstPage'] - 1;
      var container = $(this);
      var pages = container.children();
      var pageNum = pages.length;
      var labelWidth = setting['labelWidth'];
      var anim = function(p, l) {
        pages.eq(p).animate({left: l}, setting['duration'], setting['easing']);
      }
      container.css({
        position: 'relative',
        overflow: 'hidden'
      });
      pages.each(function(page, elem) {
        var left = page * labelWidth;
        if (page > showPage) left += container.width() - pageNum * labelWidth;
        $(elem).css({
          position: 'absolute',
          top: 0,
          left: left,
          width: container.width() - labelWidth * (pageNum - 1),
          height: container.height()
        }).click(function() {
          if (showPage < page) {
            for (var p = showPage + 1; p <= page; p++) {
              anim(p, p * labelWidth);
            }
          } else if (page < showPage) {
            for (var p = showPage; p > page; p--) {
              anim(p, container.width() - (pageNum - p) * labelWidth);
            }
          }
          showPage = page;
        });
      });
    });
  }
})(jQuery);
