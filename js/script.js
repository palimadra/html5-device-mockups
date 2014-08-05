$(document).ready(function () {

    var cachedEl = $(".device-container").first();

    function setSize() {
        if ($(cachedEl).find(".device-mockup").attr("data-orientation") == "portrait") {
            $(cachedEl).css("maxWidth", $(cachedEl).attr("data-size-port"));
        } else {
            $(cachedEl).css("maxWidth", $(cachedEl).attr("data-size-land"));
        }
    }

    $("#device-tabs > a").click(function (e) {
        e.preventDefault();
        $(this).addClass("active").siblings().removeClass("active");
        $(cachedEl).attr("data-size-port", $(this).attr("data-size-port")).attr("data-size-land", $(this).attr("data-size-land")).find(".device-mockup").attr("data-device", $(this).attr("data-value"));
        setSize();

        $('#resolution-width').val($(this).attr('data-device-width'));
        $('#resolution-height').val($(this).attr('data-device-height'));
        $('#pixel-ratio').val($(this).attr('data-device-pixel-ratio'));
        $('#change-resolution').trigger('click');
        return false;
    });

    $("#orientation-tabs > a").click(function (e) {
        e.preventDefault();
        $(this).addClass("active").siblings().removeClass("active");
        $(cachedEl).find(".device-mockup").attr("data-orientation", $(this).attr("data-value"));
        setSize();
        $('#change-resolution').trigger('click');
        return false;
    });

    $("#color-tabs > a").click(function (e) {
        e.preventDefault();
        $(this).addClass("active").siblings().removeClass("active");
        $(cachedEl).find(".device-mockup").attr("data-color", $(this).attr("data-value"));
        return false;
    });

    $('#iframe-url').keyup(function (e) {
        if ((e.keyCode || e.which) == 13) {
            $('#change-iframe').trigger('click');
        }
    });

    $('#change-iframe').click(function () {
        url = $('#iframe-url').val();
        if (!url.match(/^http(s)?:\/\//)) {
            url = 'http://' + url;
        }
        $('#iframe-url').val(url);
        $('#device-content').attr('src', url);
    });

    $('#resolution-width').keyup(function () {
        ratio = $('.screen').height() / $('.screen').width();

        $('#resolution-height').val(Math.round(ratio * $(this).val() * 100) / 100);
    });

    $('#change-resolution').click(function () {
        var pixelratio = $('#pixel-ratio').val();
        var width = $('#resolution-width').val();
        var height = $('#resolution-height').val();
        if ($('#orientation-tabs .active').attr('data-value') == "landscape") {
            width = $('#resolution-height').val();
            height = $('#resolution-width').val();
        }
        width = width / pixelratio;
        height = height / pixelratio;

        var scale = $('.screen').width() / width;
        $('.scale').html(Math.round(scale * 100) / 100);
        $('.device-mockup iframe').css('width', width);
        $('.device-mockup iframe').css('height', height);
        $('.device-mockup iframe').css('transform', 'scale(' + scale + ')');
        $('.device-mockup iframe').css('-webkit-transform', 'scale(' + scale + ')');
        $('.device-mockup iframe').css('-o-transform', 'scale(' + scale + ')');
        $('.device-mockup iframe').css('-ms-transform:', 'scale(' + scale + ')');
        $('.device-mockup iframe').css('-moz-transform', 'scale(' + scale + ')');
    });

    $('#device-tabs .active').trigger('click');
});
