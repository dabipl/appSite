var offset = '50%';
var supportPlaceholder = false;
var clickedMail = false;

$(document).ready(function(){
    function supportsSVG() {
		return !! document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect;
	}
	if (supportsSVG()) {
		document.documentElement.className += ' svg';
	} else {
		document.documentElement.className += ' no-svg';
		var imgs = document.getElementsByTagName('img'),
			dotSVG = /.*\.svg$/;
		for (var i = 0; i != imgs.length; ++i) {
			if(imgs[i].src.match(dotSVG)) {
				imgs[i].src = imgs[i].src.slice(0, -3) + "png";
			}
		}
	}

    var testPlaceholder = document.createElement('input');

	if('placeholder' in testPlaceholder){
        supportPlaceholder = true;
    }

    if(!supportPlaceholder){
        $('[placeholder]').focus(function() {
          var input = $(this);
          if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
          }
        }).blur(function() {
          var input = $(this);
          if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
          }
        }).blur();
    }

    if(document.URL.split("?")[1] != null && document.URL.split("?")[1] != ''){
        var queryMessage = getQueryStringParameter("message");
        if(queryMessage == "success"){
            $('.query-message').text("Thank you! Message sent successfully!");
            $('.query-message').css('display', 'block');
        }
        else if(queryMessage == "invalidfile"){
            $('.query-message').text("There was an error with the attachement. Simply try again.");
            $('.query-message').css('display', 'block');
        }
        else if(queryMessage == "invalidfileformat"){
            $('.query-message').text("Sorry, but only images are allowed as an attachement.");
            $('.query-message').css('display', 'block');
        }


    }

    $('#surface').addClass('visible');
    $('#question').addClass('visible');
    $('#protect').addClass('visible');
    $('#mail').addClass('visible');
    $('#compare').addClass('visible');
    setTimeout(function(){
        $('#spstore-button').addClass('visible');
    },200);

    $('.about-screen-1').waypoint({
        offset: offset,
        triggerOnce: true,
        handler: function(direction) {
          setTimeout(function(){
              $('.about-screen-1').addClass('visible');
            },150);
        }
    });

    $('.about-screen-2').waypoint({
        offset: offset,
        triggerOnce: true,
        handler: function(direction) {
          setTimeout(function(){
            $('.about-screen-2').addClass('visible');
          },150);
        }
    });

    $('.about-screen-3').waypoint({
        offset: offset,
        triggerOnce: true,
        handler: function(direction) {
          setTimeout(function(){
            $('.about-screen-3').addClass('visible');
          },150);
        }
    });

    $('.about-screen-4').waypoint({
        offset: offset,
        triggerOnce: true,
        handler: function(direction) {
          setTimeout(function(){
            $('.about-screen-4').addClass('visible');
          },150);
        }
    });

    $('.features').waypoint({
        offset: offset,
        triggerOnce: true,
        handler: function(direction) {
            var i = 0;
            $('.listview li').each(function(){
                var el = $(this);
                i++;
                setTimeout(function(){
                    el.addClass('visible');
                }, i * 50);
            });
        }
    });

    $('.future-features').waypoint({
        offset: offset,
        triggerOnce: true,
        handler: function(direction) {
            var i = 0;
            $('.notices2 > div').each(function(){
                var el = $(this);
                i++;
                setTimeout(function(){
                    el.addClass('visible');
                }, i * 100);
            });
        }
    });

    $('#about').on('click',function(){
        $(window).scrollTo( $('#section-about'), 200, { offset: -70 } );

    });

    $('#features').on('click',function(){
        $(window).scrollTo( $('#section-features'), 200, { offset: -70 } );
    });

    $('#practicies').on('click',function(){
        $(window).scrollTo( $('#section-practicies'), 200, { offset: -70 } );
    });

    $('.sign-up-form a').on('click',function(){
        saveEmail();
    });

    $('#unsubscribe').on('click',function(){
        remEmail();
    });

    $('#image-button').on('click',function(){
        $('#attachement').click();
    });

    $("#attachement").change(function() {
        $('#image-button').html('File attached! Click to change. <i class="icon-upload-3 fg-color-white"></i>');
    });

    $('#form-submit').on('click',function(){

        if(!supportPlaceholder){
            if ($('#name').val() == $('#name').attr('placeholder')) {
              $('#name').val('');
            }
            if ($('#email').val() == $('#email').attr('placeholder')) {
              $('#email').val('');
            }
            if ($('#subject').val() == $('#subject').attr('placeholder')) {
              $('#subject').val('');
            }
            if ($('#message').val() == $('#message').attr('placeholder')) {
              $('#message').val('');
            }
        }
        var name = $('#name').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var message = $('#message').val();

        $('.info').removeClass('visible');
        $('#name').removeClass('invalid');
        $('#email').removeClass('invalid');
        $('#subject').removeClass('invalid');
        $('#message').removeClass('invalid');

        if(name && email && subject && message && validateEmail(email)){
			if(!clickedMail){
				$('#contact-form').submit();
				clickedMail = true;
			}
        }
        else{
            errormessage = "Please fill all required fields. ";
            if(!name){
                $('#name').addClass('invalid');
                if(!supportPlaceholder){
                    $('#name').val($('#name').attr('placeholder'));
                }
            }
            if(!email){
                $('#email').addClass('invalid');
                if(!supportPlaceholder){
                    $('#email').val($('#email').attr('placeholder'));
                }
            }
            if(email){
                var validEmail = validateEmail(email);
                if(!validEmail){
                    $('#email').addClass('invalid');
                    errormessage += "It seems that your email is in invalid format.";
                }
            }
            if(!subject){
                $('#subject').addClass('invalid');
                if(!supportPlaceholder){
                    $('#subject').val($('#subject').attr('placeholder'));
                }
            }
            if(!message){
                $('#message').addClass('invalid');
                if(!supportPlaceholder){
                    $('#message').val($('#message').attr('placeholder'));
                }
            }

            $('#contact-form-error').text(errormessage);
            $('#contact-form-error').addClass('visible');
        }

    });



    var docElem = document.documentElement,
        header = $('header');
		didScroll = false,
		changeHeaderOn = 50;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 50 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			header.addClass('small');
		}
		else {
			header.removeClass('small');
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

    function initFaq(){
        var i = 0;
        $('#faq .notices > div').each(function(){
            var el = $(this);
            i++;
            setTimeout(function(){
                el.addClass('visible');
            }, i * 100);
        });

        $('#faq .notices > div').each(function(){
            var el = $(this);
            el.click(function(){
                if(el.find('i').hasClass('icon-arrow-down-3')){
                    el.find('i').removeClass('icon-arrow-down-3');
                    el.find('i').addClass('icon-arrow-up-3');
                }
                else{
                    el.find('i').removeClass('icon-arrow-up-3');
                    el.find('i').addClass('icon-arrow-down-3');
                }
                var id = el.attr('id').replace('question','answer');
                $('#' + id).toggleClass('visible');
            });
        });
    }

    initFaq();

	init();

	showAnswerByID();

});

function saveEmail(){

    var emptyWithPlaceholder = false;
    if(!supportPlaceholder){
        var input = $('.sign-up-form input');
        if (input.val() == input.attr('placeholder')) {
          emptyWithPlaceholder = true;
        }
    }
    var email = $('.sign-up-form input').val();

    if(email != null && email != '' && validateEmail(email) && !emptyWithPlaceholder){
        $('.sign-up-form .info').removeClass('visible');
        $('.sign-up-form').addClass('saving');
        $.get("/api", { email: email }).done(function(data) {

            //good
            if(data == "1"){
                $('.sign-up-form').html('<h3>Thank you! Your email address has been saved.</h3>');
                $('.sign-up-form').removeClass('saving');
            }
            //already exists
            else if(data == "0"){
                $('.sign-up-form').html('<h3>Good news! Your email address already exists in our database.</h3>');
                $('.sign-up-form').removeClass('saving');
            }
            //error
            else{
                alert('Sorry, something went wrong. Simply try again ;)');
                $('.sign-up-form').removeClass('saving');
            }
        });
    }
    else{
        if(email == null || email == '' || (!supportPlaceholder && emptyWithPlaceholder)){
            $('.sign-up-form .info').text('Please fill the field above with your email address.');
            $('.sign-up-form .info').addClass('visible');
        }
        else if(!validateEmail(email)){
            $('.sign-up-form .info').text('It seems, that the email address you put is incorrect.');
            $('.sign-up-form .info').addClass('visible');
        }
    }
}

function remEmail(){

    var emptyWithPlaceholder = false;
    if(!supportPlaceholder){
        var input = $('.sign-up-form input');
        if (input.val() == input.attr('placeholder')) {
          emptyWithPlaceholder = true;
        }
    }
    var email = $('.sign-up-form input').val();

    if(email != null && email != '' && validateEmail(email) && !emptyWithPlaceholder){
        $('.sign-up-form .info').removeClass('visible');
        $('.sign-up-form').addClass('saving');
        $.get("/api/remsubs", { email: email }).done(function(data) {

            //good
            if(data == "1"){
                $('.sign-up-form').html('<h3>Done!</h3>');
                $('.sign-up-form').removeClass('saving');
            }
            //not in db
            else if(data == "0"){
                $('.sign-up-form').html('<h3>This adress was not found in our database.</h3>');
                $('.sign-up-form').removeClass('saving');
            }
            //error
            else{
                alert('Sorry, something went wrong. Simply try again ;)');
                $('.sign-up-form').removeClass('saving');
            }
        });
    }
    else{
        if(email == null || email == '' || (!supportPlaceholder && emptyWithPlaceholder)){
            $('.sign-up-form .info').text('Please fill the field above with your email address.');
            $('.sign-up-form .info').addClass('visible');
        }
        else if(!validateEmail(email)){
            $('.sign-up-form .info').text('It seems, that the email address you put is incorrect.');
            $('.sign-up-form .info').addClass('visible');
        }
    }
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function showAnswerByID(){
	var id = getParameterByName("id");
    var answer = "#answer_"+ id;
	$(answer).addClass("answer visible");
	$('html, body').animate({
	scrollTop: $(answer).offset().top - 140}, 1000);
}

function getParameterByName(name) {
 return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function getQueryStringParameter(paramToRetrieve) {
    var params =
        document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}
