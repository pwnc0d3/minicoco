// --------------------------------------------------- //

// --------------------------------------------------- //
//        |  YOUTUBE AND GOOGLE MAPS SECTION  |        //
// --------------------------------------------------- //

// --------------------------------------------------- //

$(document).ready(function () {

    // find iframe (youtube-videos especially) and put it in video-container for responsive-view

    $('iframe[src*="youtube-nocookie.com"], iframe[src*="youtube.com"]').wrap("<div id='yt' class='video-container my-4'></div>");

    // find google maps and wrap in div

    $('iframe[src*="google.com/maps"], iframe[src*="maps.google.de/maps"]').wrap("<div id='gmap'></div>");


    // Opt-out via "a[href*="eraseCookie"]"

    $('a[href*="eraseCookie"], a[href*="eraserefreshCookie"]').each(function () {
        var googleoptout = '<a href="" class="btn btn-primary">TESTbutton</a>'
        //$(this).html(googleoptout);
        $(this).css({
            'font-size': '16px',
            'padding': '8px 24px',
            'background': '#d7d7d7',
            'color': '#666666',
            'transition': 'none',
            'border': '1px solid #999',
            'margin': '10px 0 0',
            'display': 'inline-block',
            'text-decoration': 'none'
        });

        if (readCookie("ALLOW_GL")) {
            $(this).wrap( "<div class='minicoco'></div>" );
            var cookiedate = readCookie("ALLOW_GL");
            $(this).parent().prepend('<p>' + '<strong>' + 'Datum Ihrer Einwilligung: ' + '</strong>' + '<br>' + cookiedate + '</p>' + '<p>' + 'Wenn Sie die Einwilligung widerrufen und die externen Inhalte nicht mehr anzeigen möchten, klicken Sie bitte hier:' + '</p>');
            $(this).parent().css({"border": "1px solid #d7d7d7", "padding": "16px"});
        } else {
            $(this).hide();

        }

        $(this).on('click', function(erase) {
            erase.preventDefault();
            eraserefreshCookie("ALLOW_GL");
            alert('Cookie erfolgreich gelöscht');
        })

    });


    // optional Opt-out with checkbox to opt-in and opt-out

    /*     $('a[href*="eraseCookie"], a[href*="eraserefreshCookie"]').each(function() {
            var googleeinwilligungshtml = '<div><input type="checkbox" id="googlecheckbox" name="googlecheckbox" value="0"><label for="googlecheckbox">Hiermit willige ich den Google-Cookierichtlinien ein</label></div>'
            $(this).parent().append(googleeinwilligungshtml);
        }); */

    // check if cookie ALLOW_GL exists then initial toggle the state of #googlecheckbox input onload

    /*     if (readCookie("ALLOW_GL")) {
            $("#googlecheckbox").prop( "checked", true );
        } else {
            $("#googlecheckbox").prop( "checked", false );
        } */


    // change state of #googlecheckbox onclick - depending on which state create or erase cookie "ALLOW_GL"

    /*     $('input#googlecheckbox').on('click', function() {
            if (readCookie("ALLOW_GL")) {
                eraseCookie('ALLOW_GL');
                $("#googlecheckbox").prop( "checked", false );
            } else {
                createCookie('ALLOW_GL', '1', 30);
                $("#googlecheckbox").prop( "checked", true );
            }
        }); */

});


//  Youtube-Opt-In
//
//  [1] read if cookie ALLOW_YT exists ---> if true -> load iframe | if false -> show opt-in
//  [2] on opt-in -> create cookie ALLOW_YT -> reload page
//  [OPT-IN] Prevent YT from loading by exchange of src -> data-src and vice-versa by opt-in ? 


// ------------> declare cookie functions -> create - read - erase
 
function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString()
    } else {
        expires = ""
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/"
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length))
    }
    return null
}

function eraseCookie(name) {
    createCookie(name, "", -1)
}

function eraserefreshCookie(name) {
    createCookie(name, "", -1);
    location.reload();
}


// ------------> declare variables

var cookie_yt = readCookie('ALLOW_GL');

var showyoutubeagainold = "<div id='ytaccept' class='acceptbox'><span><a class='allow_yt' href='javascript:void(0)'><svg version='1.1' id='play' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' height='100px' width='100px' viewBox='0 0 100 100' enable-background='new 0 0 100 100' xml:space='preserve'><path class='stroke-solid' fill='none' stroke='var(--minicoco)' d='M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7 C97.3,23.7,75.7,2.3,49.9,2.5'></path><path class='stroke-dotted' fill='none' stroke='var(--minicoco)' d='M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7 C97.3,23.7,75.7,2.3,49.9,2.5'></path> <path class='icon' fill='var(--minicoco)' d='M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z'></path> </svg></a></span><span>Dieses Video wurde durch Ihre Cookie-Einstellung blockiert.</span><span>Bitte <a class='allow_yt' href='javascript:void(0)'>akzeptieren Sie Cookies</a>, um dieses Video zu sehen.</span></div>";

var showyoutubeagain = '<div id="ytaccept" class="acceptbox"><span><svg version="1.1" id="play" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="100px" width="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path class="stroke-solid" fill="none" stroke="var(--minicoco)" d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7 C97.3,23.7,75.7,2.3,49.9,2.5"></path><path class="stroke-dotted" fill="none" stroke="var(--minicoco)" d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7 C97.3,23.7,75.7,2.3,49.9,2.5"></path> <path class="icon" fill="var(--minicoco)" d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"></path> </svg></span><h2 class="ce_headline first"><span>[externer Inhalt von YouTube]</span></h2><p>Wenn Sie externe Inhalte von Google Maps oder YouTube auf dieser Seite sehen möchten, werden personenbezogene Daten an Google und deren Werbepartner übermittelt. Es ist möglich, dass Google diese Informationen speichert, analysiert oder mit weiteren Daten zusammenführt, die im Zusammenhang mit der Nutzung ihrer Dienste gesammelt wurden. Wenn Sie auf „Anzeigen + Cookies zulassen“ klicken, willigen Sie in das Anzeigen der eingebetteten Inhalte von Google Maps oder YouTube in Ihrem Browser ein. Mit dem Laden der Inhalte akzeptieren Sie die <a href="https://policies.google.com/privacy?hl=de" target="_blank">Datenschutzerklärung von Google</a>. Weitere Informationen und die Möglichkeit zum Widerruf Ihrer Einwilligung finden Sie in unserer <a class="googleprivacy" href="javascript:void(0)">Datenschutzerklärung</a>.</p><span class="allow_google acceptbtn" href="javascript:void(0)">Anzeigen + Cookies zulassen</span></div>';



// ------------> going for it

$(document).ready(function() {

// read if ALLOW_GL exists and do stuff

if ((document.cookie.indexOf('ALLOW_GL') != '-1') && ($('#yt').length)) {
    $('#yt').addClass('allowed video-container');
} else {

// hide youtube-video by changing src to data-src || just removeAttr src

$('iframe[src*="youtube-nocookie.com"], iframe[src*="youtube.com"]').each(function() {
    $(this).attr("data","youtube");
    $(this).removeAttr("src");
});
$('iframe[data*="youtube"]').parent().removeClass('video-container');

// show msg to allow yt
$('iframe[data*="youtube"]').parent().html(showyoutubeagain);

// create on click to allow youtube and set a cookie -> reload page
// $('#ytaccept span a.allow_google, span.allow_google').click(function() { // click on svg and button
    $('span.allow_google').click(function() {
    var timestampSetCookie = new Date();
    createCookie('ALLOW_GL', timestampSetCookie, 30);
    location.hash = "#youtube";
    location.reload()
});

$('#ytaccept p a.googleprivacy').click(function() {
    window.location.href = $('a[href*="datenschutz"]').attr("href");
});

}

});

// Googlemap Opt-In
//
//  [1] read if cookie ALLOW_GL exists ---> if true -> load iframe | if false -> show opt-in
//  [2] on opt-in -> create cookie ALLOW_GL -> reload page
//  [OPT-IN] Prevent YT from loading by exchange of src -> data-src and vice-versa by opt-in ? 

// ---> declare variables

var cookie_gmap = readCookie('ALLOW_GL');

var showgooglemapagain_old = '<div class="privacy text-center"><h2 class="ce_headline first"><span>Anfahrt</span></h2><p>Das Laden von Google Maps wurde nicht erlaubt. Bitte ändern Sie die Datenschutz-Einstellungen.<br><span class="hinweis">Hinweis: Sobald Sie Google Maps laden, geben Sie Ihr Einverständnis, dass Daten (IP-Adresse, ...) an Google übertragen werden. Sie können Ihre Einwilligung jederzeit für die Zukunft widerrufen, indem Sie das Cookie ALLOW_GMAP löschen.</span><br>Detaillierte Informationen zum Umgang mit Nutzerdaten finden Sie in unserer <a class="gmapprivacy" href="javascript:void(0)">Datenschutzerklärung</a><br><span class="allow_gmap btn btn-primary">Google Maps laden</span></p></div>';

var showgooglemapagain = '<div class="privacy text-center"><span><svg version="1.1" id="play" class="gmapsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="100px" width="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path class="stroke-solid" fill="none" stroke="var(--minicoco)" d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7 C97.3,23.7,75.7,2.3,49.9,2.5"></path><path class="stroke-dotted" fill="none" stroke="var(--minicoco)" d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7 C97.3,23.7,75.7,2.3,49.9,2.5"></path> <path class="icon gmap" fill="var(--minicoco)" d="M49.9,26.3c-9.7,0-17.7,8-17.7,17.8c0,13.9,16,28.4,16.7,29c0.3,0.2,0.6,0.4,1,0.4s0.7-0.1,1-0.4c0.7-0.6,16.7-15,16.7-29C67.6,34.3,59.6,26.3,49.9,26.3z M49.9,53.8c-5.4,0-9.8-4.4-9.8-9.8s4.4-9.8,9.8-9.8s9.8,4.4,9.8,9.8S55.3,53.8,49.9,53.8z"></path> </svg></span><h2 class="ce_headline first"><span>[externer Inhalt von Google Maps]</span></h2><p>Wenn Sie externe Inhalte von Google Maps oder YouTube auf dieser Seite sehen möchten, werden personenbezogene Daten an Google und deren Werbepartner übermittelt. Es ist möglich, dass Google diese Informationen speichert, analysiert oder mit weiteren Daten zusammenführt, die im Zusammenhang mit der Nutzung ihrer Dienste gesammelt wurden. Wenn Sie auf „Anzeigen + Cookies zulassen“ klicken, willigen Sie in das Anzeigen der eingebetteten Inhalte von Google Maps oder YouTube in Ihrem Browser ein. Mit dem Laden der Inhalte akzeptieren Sie die <a href="https://policies.google.com/privacy?hl=de" target="_blank">Datenschutzerklärung von Google</a>. Weitere Informationen und die Möglichkeit zum Widerruf Ihrer Einwilligung finden Sie in unserer <a class="googleprivacy" href="javascript:void(0)">Datenschutzerklärung</a>.</p><span class="allow_google acceptbtn">Anzeigen + Cookies zulassen</span></div>';

// ---> search for google maps and wrap in div #60

// ---> go for it

$(document).ready(function() {
    if ((document.cookie.indexOf('ALLOW_GL') != '-1') && ($('#gmap').length)) {

        $('iframe[src*="google.com/maps"], iframe[src*="maps.google.de/maps"]').parent().addClass('allowed');

    } else {

        $('iframe[src*="google.com/maps"], iframe[src*="maps.google.de/maps"]').each(function() {
            $(this).attr("data","gmap");
            $(this).removeAttr("src");
        });
        $('iframe[data*="gmap"]').parent().html(showgooglemapagain);
        $('#gmap span.allow_google').click(function() {
            var timestampSetCookie = new Date();
            createCookie('ALLOW_GL', timestampSetCookie, 30);
            location.hash = "#anfahrt";
            location.reload()
        });
        $('#gmap .privacy p a.googleprivacy').click(function() {
            window.location.href = $('a[href*="datenschutz"]').attr("href");
        });
    }


});

