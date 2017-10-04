$(document).ready(function() {
    // Grid view button click
    $('#btn-grid').click(function() {
        if ($(this).hasClass('active')) {
            return;
        }
        $.cookie('view', 'grid');
        $('#btn-grid').addClass('active');
        $('#btn-list').removeClass('active');
        $('#content')
            .removeClass('content-list')
            .addClass('content-grid')
            .find('.col-outer').each(function() {
                $(this).removeClass('col-12')
                    .addClass($(this).data('grid-classes'))
                    .one(
                        'webkitTransitionEnd',
                        function () {
                            $('#content').find('.card-body').removeAttr('style').equalHeights();
                        })
            });
    });

    // List view button click
    $('#btn-list').click(function() {
        if ($(this).hasClass('active')) {
            return;
        }
        $.cookie('view', 'list');
        $('#btn-list').addClass('active');
        $('#btn-grid').removeClass('active');
        $('#content')
            .removeClass('content-grid')
            .addClass('content-list')
            .height('auto')
            .find('.col-outer').each(function() {
                $(this).find('.card').height('200px');
                $(this).find('.card-body').attr('style', 'height: 80%;');
                $(this).find('.card-img-top').addClass('card-img-left').removeClass('card-img-top img-fluid').attr('style', 'height: 100%; width: auto;');
                $(this).removeClass($(this).data('grid-classes'))
                    .addClass('col-12')
                    .one(
                    'webkitTransitionEnd',
                    function () {
                        $('#content').find('.card-body').equalHeights();
                    })
            });
    });

//    $(window).resize(function() {
//      $('.content-list').find('.col-outer').each(function() {
//        $(this).find('.card-body').css('min-height', $(this).find('.card-img-top').height() - $(this).find('.card-footer').outerHeight());
//        console.log($(this).find('.card-img-top').height() - $(this).find('.card-footer').outerHeight());
//      });
//    });

    // Side bar
    var sidebar = $("#sidebar");
    var navigationButtons = $('#navigationButtons')
    if (sidebar.length && navigationButtons.length) {
        sidebar.css('top', (navigationButtons.offset().top + 1) + 'px');
        $('#info-link').click(function () {
            var sidebar = $('#sidebar');
            if (parseInt(sidebar.css('right')) < 0) {
                sidebar.animate({right: "+=250"}, 500);
            } else {
                sidebar.animate({right: "-=250"}, 500);
            }
            return false;
        });
    }
});

/* help popup */
function bd_popup(url) {
    window.open(url, 'bd_popup', 'alwaysRaised=yes,dependent=yes,toolbar=no,height=420,width=500,menubar=no,resizable=yes,scrollbars=yes,status=no');
}


/* changeElementType: this function changes element types. e.g. <div> to <ul> */
(function($) {
    $.fn.changeElementType = function(newType) {
        var attrs = {};
        if (!(this[0] && this[0].attributes))
            return;

        $.each(this[0].attributes, function(idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });
        this.replaceWith(function() {
            return $("<" + newType + "/>", attrs).append($(this).contents());
        });
    }
})(jQuery);

/* change rgba alpha */
function setColorOpacity(colorStr, opacity) {
  if(colorStr.indexOf("rgb(") == 0)
  {
    var rgbaCol = colorStr.replace("rgb(", "rgba(");
    rgbaCol = rgbaCol.replace(")", ", "+opacity+")");
    return rgbaCol;
  }

  if(colorStr.indexOf("rgba(") == 0)
  {
    var rgbaCol = colorStr.substr(0, colorStr.lastIndexOf(",")+1) + opacity + ")";
    return rgbaCol;
  }

  if(colorStr.length == 6)
    colorStr = "#" + colorStr;

  if(colorStr.indexOf("#") == 0)
  {
    var rgbaCol = 'rgba(' + parseInt(colorStr.slice(-6, -4), 16)
        + ',' + parseInt(colorStr.slice(-4, -2), 16)
        + ',' + parseInt(colorStr.slice(-2), 16)
        + ','+opacity+')';
    return rgbaCol;
  }
  return colorStr;
}
