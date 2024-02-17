$(document).ready(function(){
	// Set the height of footer 
	$(window)
		.resize( function() {
			//$(this).close_sidemenu(false);
			$(this).footer_height();
		} )
		.load( function() {
			$(this).close_sidemenu(false);
			$(this).footer_height();
		}
	);

	$.fn.footer_height = function() {
		$("#footer").css( { height: $("#footer-content").outerHeight() + 1 + "px" } );
	}

	// Mian Image slide START
	$(".icon-menu").on("click", function(){
		var div = document.createElement("div");
		div.id = "overlay-wrap";
		document.body.appendChild(div);

		//var wrapHeight = $(document).height();
		//$("#menu-wrap").css("height",wrapHeight);
		$("#menu-wrap").show(0, function() {
			$("#menu-wrap").css('margin-left', 0);
        	$("#menu-wrap").css('transition', 'all 0.5s ease');
        });
		
		$("#overlay-wrap").show(0, function() {
            $("#overlay-wrap").fadeTo('500', 0.5);
        });
       	$(this).close_subnav(false);
	});
	$(document).on("click touchstart", "#overlay-wrap", function(){
		$(this).close_sidemenu(true);
	});
	$.fn.close_sidemenu = function (fadein_effect) {
		if($(document).width()<720)
		{
			if(fadein_effect)
			{
				$("#overlay-wrap").fadeTo('500', 0, function() {
					$("#overlay-wrap").remove();
				});
			}
			else
			{
				$("#menu-wrap").css('transition', '');
				$("#overlay-wrap").remove();
			}
			$("#menu-wrap").css('margin-left', $("#menu-wrap").width() * -1 + 'px');
			
			$(this).close_subnav(false);
			$(this).select_sub_menu();
		}
		else
		{
			$("#menu-wrap").css('margin-left', 0);
			$(".sub-menu-wrap").hide();
		}
	}

	$.fn.close_subnav = function(toggle){
		var has_sub = $(".sub-menu-list-wrap li").length>1 ? true : false;
		if(toggle && $( ".sub-menu-list-wrap" ).is(":hidden"))
		{
			if(has_sub)
			{
				$(".sub-nav").addClass("on");
				$( ".sub-menu-list-wrap" ).show();
			}
		}
		else
		{
			$(".sub-nav").removeClass("on");
			$( ".sub-menu-list-wrap" ).hide();
		}
		if(!has_sub) $(".sub-nav").css("background-image", "none");
	}

	$(".sub-nav").on("click", function(){
		$(this).close_subnav(true);
	});

	// Set the main Slide
	$(".slider").bxSlider({auto: true,autoControls: false});
	
	$(".navi-title").on("click", function(){
		if($(this).parent().find(".sub-menu-wrap li").length>1 && $(document).width()<720)
		{
			if($(this).parent().children("ul").is(":hidden"))
			{
				$(this).parent().children("ul").slideDown();
				$(this).addClass("on");
				$(this).parent().siblings().find("ul").hide();
				$(this).parent().siblings().children(".navi-title").removeClass("on");
				$(this).parent().siblings().children("ul").removeClass("on");
				$(this).parent().siblings().children().find("li").removeClass("on");
			}
			else
			{
				$(this).parent().children("ul").slideUp();
				$(this).removeClass("on");
			}
		}
		else $(this).move_to_page("val");
	});

	// Auto Link from the main button menu to sub menu
	$(".sub-menu-list").on("click", function(){
		$(this).move_to_page("val");
	});

	$(".navi-title-sub").on("click", function(){
		$(this).move_to_page("val");
	});

	$(".menu-btn").on("click", function(){
		$(this).move_to_page("menu_id");
	});


	$.fn.move_to_page = function(page_id)
	{
		location.href = "sub"+$(this).data(page_id)+".asp";
	}

	// Go to top
	$("#goto-top").on("click", function(){
		$('html, body').animate({scrollTop:0}, 500); 
	});

	if ($(location).attr('host') != "luminaobgy.ilikedoc.kr" )
	{
		//Keep track of last scroll
		var lastScroll = 0;
		$(window).scroll(function(event){
		  //Sets the current scroll position
		  var st = $(this).scrollTop();
		  //Determines up-or-down scrolling
		  if (st > lastScroll){
			 //Replace this with your function call for downward-scrolling
			if ($(window).scrollTop()+$(window).height() > $("#footer").offset().top){
				$(".snsbtn-wrap-width").css("position","relative");
			}
		  }
		  else {
			 //Replace this with your function call for upward-scrolling
			 $(".snsbtn-wrap-width").css("position","fixed");
		  }
		  //Updates scroll position
		  lastScroll = st;
		});
	}


	// Detacted sub menu tab
	$.fn.select_sub_menu = function()
	{
		var str=location.pathname.toLowerCase();
		var uri_arr = str.split('index.html');
		str = uri_arr[uri_arr.length-1];
		str = str.indexOf('_')<0 ? str.replace(".asp", "_1.html"):str;
		$(".navbar-nav li").each(function() {
			var sub_len = $(this).find(".sub-menu-wrap li")!=null ? $(this).find(".sub-menu-wrap li").length: 0;
			if(sub_len<=1) $(this).children(".navi-title").css("background", "transparent");
			var sub_menu_id = "sub"+$(this).data("val")+".asp";
			if (typeof sub_menu_id !== 'undefined' && sub_menu_id == str)
			{
				if($(document).width()<720)
				{
					$(".sub-nav").html($(this).parent().parent().find(".navi-title").html());
					$(".sub-menu-title").html($(this).html());
					$(this).addClass("on");
					if($(this).parent().find("li").length>1) $(this).parent().show();
					$(this).parent().parent().find(".navi-title").addClass("on");
					$(this).parent().parent().siblings().children().find("li").removeClass("on");
				}
			}
		});
	}

	$(".tab-link").on("click", function(){
		$(this).addClass("on").siblings().removeClass("on");
		var n = $( ".tab-view" ).length;
		var id = $(this).data("id");
		for(i=1; i<=n; i++)
		{
			if( "tab"+i ==  id) $("#div_tab"+i).show();
			else $("#div_tab"+i).hide();
		}
	});

	$("#div_tab1").show();
	$(this).select_sub_menu();
});

