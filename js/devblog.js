$(document).ready(function() {
    function showToast(message) {
        let $toast = $('<div class="toast">' + message + '</div>');
        $('#toast-container').append($toast);
        $toast.fadeIn(400).delay(3000).fadeOut(400, function() {
            $(this).remove();
        });
    }

    $(window).on('scroll', function() {
        let scrollTop = $(window).scrollTop();
        let docHeight = $(document).height();
        let winHeight = $(window).height();
        let scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        $('#scroll-progress-bar').css('width', scrollPercent + '%');
    });

    $('.counter').each(function() {
        let $this = $(this);
        let targetNum = $this.attr('data-target');

        $({ countNum: $this.text() }).animate({
            countNum: targetNum
        }, {
            duration: 2500,
            easing: 'swing',
            step: function() {
                $this.text(Math.floor(this.countNum));
            },
            complete: function() {
                $this.text(this.countNum);
            }
        });
    });

    const searchTerms = ["entity", "forest", "signal 0", "sector c", "breach", "tall man", "evacuation"];
    const $searchInput = $('#search-input');
    const $suggestionsBox = $('#suggestions-box');
    const $logItems = $('.log-item');

    $logItems.each(function() {
        let $textElem = $(this).find('.log-text');
        $textElem.attr('data-original', $textElem.text());
    });

    $searchInput.on('keyup', function() {
        let value = $(this).val().toLowerCase();

        $suggestionsBox.empty().hide();
        if (value.length > 0) {
            let matches = searchTerms.filter(term => term.includes(value));
            if (matches.length > 0) {
                matches.forEach(match => {
                    $suggestionsBox.append('<div class="suggestion-item">' + match + '</div>');
                });
                $suggestionsBox.show();
            }
        }

        $logItems.each(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });

        $logItems.each(function() {
            let $textElem = $(this).find('.log-text');
            let originalText = $textElem.attr('data-original');

            if (value.length > 0) {
                let safeValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                let regex = new RegExp("(" + safeValue + ")", "gi");
                let newText = originalText.replace(regex, "<span class='highlight'>$1</span>");
                $textElem.html(newText);
            } else {
                $textElem.text(originalText);
            }
        });
    });

    $(document).on('click', '.suggestion-item', function() {
        $searchInput.val($(this).text()).trigger('keyup');
        $suggestionsBox.hide();
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.search-section').length) {
            $suggestionsBox.hide();
        }
    });

    $('#copy-btn').on('click', function() {
        let textToCopy = $('#copy-text').text();

        navigator.clipboard.writeText(textToCopy).then(function() {
            let $btn = $('#copy-btn');
            $btn.text('✓ Copied!');
            $btn.css({'background-color': '#00aa00', 'border-color': '#00aa00', 'color': '#fff'});

            showToast("Frequency copied to clipboard!");

            setTimeout(function() {
                $btn.text('Copy');
                $btn.css({'background-color': '', 'border-color': '', 'color': ''});
            }, 2000);
        });
    });

    $('#report-form').on('submit', function(e) {
        e.preventDefault();
        let $btn = $('#submit-btn');

        $btn.prop('disabled', true).html('<span class="spinner"></span> Encrypting...');

        setTimeout(function() {
            $btn.prop('disabled', false).html('Submit Report');
            showToast("Report successfully transmitted to HQ.");
            $('#report-form')[0].reset();
        }, 2500);
    });

    function checkLazyImages() {
        let scrollTop = $(window).scrollTop();
        let winHeight = $(window).height();

        $('.lazy-img').each(function() {
            let $img = $(this);
            if (!$img.attr('src') && $img.offset().top < scrollTop + winHeight + 100) {
                $img.one('load', function() {
                    $(this).addClass('loaded');
                    $(this).parent('.img-placeholder').css('background', 'transparent');
                });
                $img.attr('src', $img.attr('data-src'));
            }
        });
    }

    $(window).on('scroll', checkLazyImages);
    checkLazyImages();
});