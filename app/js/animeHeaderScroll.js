$(document).ready(function(){
	// появление/затухание кнопки #back-top
	$(function (){
		// прячем кнопку #back-top
		$(".arrow-top").hide();
	
		$(window).scroll(function (){
			if ($(this).scrollTop() > 100){
				$(".arrow-top").fadeIn();
			} else{
				$(".arrow-top").fadeOut();
			}
		});
		// при клике на ссылку плавно поднимаемся вверх
		$(".arrow-top a").click(function (){
			$("body,html").animate({
				scrollTop:0
			}, 800);
			return false;
		});
	});
});