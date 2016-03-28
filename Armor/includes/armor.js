/**
 * @author Sergey
 */

$("document").ready(function() 
{ 
	$("nav a:nth-child(1)").css({"color" : "#C0C0C0"});
		$("nav a:nth-child(1)").click(function() 
		{
			$("nav").find("a").each(function() {
       		 $(this).css({"color" : "#ffffff"});
			window.scrollTo(0, 0);
			$("nav a:nth-child(1)").css({"color" : "#C0C0C0"});
		});	
		});
		
		$("nav a:nth-child(2)").click(function() 
		{
			$("nav").find("a").each(function() {
       		 $(this).css({"color" : "#ffffff"});
			window.scrollTo(1300, 125);
			$("nav a:nth-child(2)").css({"color" : "#C0C0C0"});
		});
		});
		
		$("nav a:nth-child(3)").click(function() 
		{
			$("nav").find("a").each(function() {
       		 $(this).css({"color" : "#ffffff"});
			window.scrollTo(0, 0);
			$("nav a:nth-child(3)").css({"color" : "#C0C0C0"});
		});
		});
		
		$("nav a:nth-child(4)").click(function() 
		{
			$("nav").find("a").each(function() {
       		 $(this).css({"color" : "#ffffff"});
			window.scrollTo(1650, 975);
			$("nav a:nth-child(4)").css({"color" : "#C0C0C0"});
		});
		});
		
		$("nav a:nth-child(5)").click(function() 
		{
			$("nav").find("a").each(function() {
       		 $(this).css({"color" : "#ffffff"});
			window.scrollTo(300, 1175);
			$("nav a:nth-child(5)").css({"color" : "#C0C0C0"});
		});
		});
		
		
		
		$(".house1").click(function()
			{
				$('<section id="overlay"></section>')
		        .css("top", "0")
		        .css('opacity', '0')
		        .animate({'opacity': '0.5'}, 'slow')
		        .appendTo('body');
				$(".UserForm")
				.css("top", $(window).height()/2 + "px")
				.css("left", $(window).width()/2 + "px")
				.show("slow");
				$("#overlay").click(function() 
					{
					$(".UserForm").hide("slow");
		       		$("#overlay").fadeOut('slow', function() 
						{
	            			$(this).remove();
						});
   					});
			});
			
		$(".house2").click(function()
			{
				$('<section id="overlay"></section>')
		        .css("top", "0")
		        .css('opacity', '0')
		        .animate({'opacity': '0.5'}, 'slow')
		        .appendTo('body');
				$(".StorageCreate1")
				.css("top", $(window).height()/2+$(window).scrollTop() + "px")
				.css("left", $(window).width()/2+$(window).scrollLeft() + "px")
				.show("slow");
				$("#overlay ,.SubmitCreate").click(function() 
					{
					$(".StorageCreate1 ,.StorageCreate2 ,.StorageTemp").hide("slow");
		       		$("#overlay").fadeOut('slow', function() 
						{
	            			$(this).remove();
						});
   					});
   				$(".CreateButton").click(function() 
					{
					$(".StorageCreate1").hide("slow");
		       		$(".StorageCreate2")
		       		.css("top", $(window).height()/2+$(window).scrollTop() + "px")
					.css("left", $(window).width()/2+$(window).scrollLeft() + "px")
					.show("slow");
   					});	
   				$(".SelectButton").click(function() 
					{
					$(".StorageCreate1").hide("slow");
		       		$(".StorageTemp")
		       		.css("top", $(window).height()/2+$(window).scrollTop() + "px")
					.css("left", $(window).width()/2+$(window).scrollLeft() + "px")
					.show("slow");
   					});	
   					
   					
   					$(".TempRight").click(function()
				{
					var st = parseInt($(".TempSlideIn").css("left"));
					if (st <= -10) {	$(".TempSlideIn").animate({"left":"-=92"},"slow");}
						else	{	$(".TempSlideIn").animate({"left":"-=5"},"normal").animate({"left":"+=5"},"normal");}
					
				});
				
				$(".TempLeft").click(function()
				{
					var st = parseInt($(".TempSlideIn").css("left"));
					if (st <= -10) {	$(".TempSlideIn").animate({"left":"+=92"},"slow");}
						else	{	$(".TempSlideIn").animate({"left":"+=5"},"normal").animate({"left":"-=5"},"normal");}
					
				});
				
				$(".Temp1 , .Temp2 , .Temp3 ").click(function()
				{
					$(".Temp1 , .Temp2 , .Temp3").css("border", "none");
					$(this).css("border", "2px solid #9d9e76");
				});
				
				$(".SubmitTemp").click(function() 
					{
					$(".StorageCreate1 ,.StorageCreate2 ,.StorageTemp").hide("slow");
		       		$("#overlay").fadeOut('slow', function() 
						{
	            			$(this).remove();
						});
						
   					});
								
			});
			
			
			$(".house3").click(function()
			{
				$('<section id="overlay"></section>')
		        .css("top", "0")
		        .css('opacity', '0')
		        .animate({'opacity': '0.5'}, 'slow')
		        .appendTo('body');
				$(".MeaSizes")
				.css("top", $(window).height()/2+$(window).scrollTop() + "px")
				.css("left", $(window).width()/2+$(window).scrollLeft() + "px")
				.show("slow");
				$(".SButton , .MButton , .LButton , .XLButton").click(function()
				{
					$(".SButton , .MButton , .LButton , .XLButton").css("border", "none");
					$(this).css("border", "2px solid #9d9e76");
				});
				$("#overlay , .SubmitMea").click(function() 
					{
					$(".MeaSizes").hide("slow");
		       		$("#overlay").fadeOut('slow', function() 
						{
	            			$(this).remove();
						});
   					});
			});
			
			$(".house4").click(function()
			{
				$('<section id="overlay"></section>')
		        .css("top", "0")
		        .css('opacity', '0')
		        .animate({'opacity': '0.5'}, 'slow')
		        .appendTo('body');
				$(".ShopCart")
				.css("top", $(window).height()/2+$(window).scrollTop() + "px")
				.css("left", $(window).width()/2+$(window).scrollLeft() + "px")
				.show("slow");
				$("#overlay").click(function() 
					{
					$(".ShopCart").hide("slow");
		       		$("#overlay").fadeOut('slow', function() 
						{
	            			$(this).remove();
						});
   					});
   					
   					
   				
   				
   					
   				$(".DownButtonShop").click(function()
				{
					var st = parseInt($(".Buyitems").css("top"));
					if (st >= -150) {	$(".Buyitems").animate({"top":"-=85"},"slow");}
						else	{	$(".Buyitems").animate({"top":"-=5"},"normal").animate({"top":"+=5"},"normal");}
					
				});

			$(".UpButtonShop").click(function()
				{
					var st = parseInt($(".Buyitems").css("top"));
					if (st <= -10) {	$(".Buyitems").animate({"top":"+=85"},"slow");}
						else	{	$(".Buyitems").animate({"top":"+=5"},"normal").animate({"top":"-=5"},"normal");}
				});
				
				
   				$(".ShopSubmit").click(function() 
					{
					$(".ShopCart").hide("slow");
		       		$(".ShippingForm")
		       		.css("top", $(window).height()/2+$(window).scrollTop() + "px")
					.css("left", $(window).width()/2+$(window).scrollLeft() + "px")
					.show("slow");
						$("#overlay").click(function() 
						{
						$(".ShippingForm").hide("slow");
			       		$("#overlay").fadeOut('slow', function() 
							{
		            			$(this).remove();
							});
	   					});
   					});	
   				$(".BackButton").click(function() 
					{
					$(".ShippingForm").hide("slow");
		       		$(".ShopCart")
		       		.css("top", $(window).height()/2+$(window).scrollTop() + "px")
					.css("left", $(window).width()/2+$(window).scrollLeft() + "px")
					.show("slow");
					/*	$("#overlay").click(function() 
						{
						$(".ShippingForm").hide("slow");
			       		$("#overlay").fadeOut('slow', function() 
							{
		            			$(this).remove();
							});
	   					});
					*/
   					});	
   					
   					
			});

           
			$(".DownButtonCreate").click(function()
				{
					var st = parseInt($(".Helmets").css("top"));
					if (st >= -390) {	$(".BigSlide > *").animate({"top":"-=105"},"slow");}
						else	{	$(".BigSlide > *").animate({"top":"-=5"},"normal").animate({"top":"+=5"},"normal");}
					
				});

			$(".UpButtonCreate").click(function()
				{
					var st = parseInt($(".Helmets").css("top"));
					if (st <= 0) {	$(".BigSlide > *").animate({"top":"+=105"},"slow");}
						else	{	$(".BigSlide > *").animate({"top":"+=5"},"normal").animate({"top":"-=5"},"normal");}
				});
				
				$(".RightH").click(function()
				{
					var st = parseInt($(".Frames1").css("left"));
					if (st >= -300) {	$(".Frames1").animate({"left":"-=92"},"slow");}
						else	{	$(".Frames1").animate({"left":"-=5"},"normal").animate({"left":"+=5"},"normal");}
					
				});
				
				$(".LeftH").click(function()
				{
					var st = parseInt($(".Frames1").css("left"));
					if (st <= -10) {	$(".Frames1").animate({"left":"+=92"},"slow");}
						else	{	$(".Frames1").animate({"left":"+=5"},"normal").animate({"left":"-=5"},"normal");}
					
				});
				
				$(".RightBre").click(function()
				{
					var st = parseInt($(".Frames2").css("left"));
					if (st >= -30) {	$(".Frames2").animate({"left":"-=92"},"slow");}
						else	{	$(".Frames2").animate({"left":"-=5"},"normal").animate({"left":"+=5"},"normal");}
					
				});
				
				$(".LeftBre").click(function()
				{
					var st = parseInt($(".Frames2").css("left"));
					if (st <= -10) {	$(".Frames2").animate({"left":"+=92"},"slow");}
						else	{	$(".Frames2").animate({"left":"+=5"},"normal").animate({"left":"-=5"},"normal");}
					
				});

				$(".RightSca").click(function()
				{
					var st = parseInt($(".Frames3").css("left"));
					if (st >= -30) {	$(".Frames3").animate({"left":"-=92"},"slow");}
						else	{	$(".Frames3").animate({"left":"-=5"},"normal").animate({"left":"+=5"},"normal");}
					
				});
				
				$(".LeftSca").click(function()
				{
					var st = parseInt($(".Frames3").css("left"));
					if (st <= -10) {	$(".Frames3").animate({"left":"+=92"},"slow");}
						else	{	$(".Frames3").animate({"left":"+=5"},"normal").animate({"left":"-=5"},"normal");}
					
				});
				
				$(".RightGlove").click(function()
				{
					var st = parseInt($(".Frames4").css("left"));
					if (st >= -30) {	$(".Frames4").animate({"left":"-=92"},"slow");}
						else	{	$(".Frames4").animate({"left":"-=5"},"normal").animate({"left":"+=5"},"normal");}
					
				});
				
				$(".LeftGlove").click(function()
				{
					var st = parseInt($(".Frames4").css("left"));
					if (st <= -10) {	$(".Frames4").animate({"left":"+=92"},"slow");}
						else	{	$(".Frames4").animate({"left":"+=5"},"normal").animate({"left":"-=5"},"normal");}
					
				});
				
				$(".RightPants").click(function()
				{
					var st = parseInt($(".Frames5").css("left"));
					if (st >= -30) {	$(".Frames5").animate({"left":"-=92"},"slow");}
						else	{	$(".Frames5").animate({"left":"-=5"},"normal").animate({"left":"+=5"},"normal");}
					
				});
				
				$(".LeftPants").click(function()
				{
					var st = parseInt($(".Frames5").css("left"));
					if (st <= -10) {	$(".Frames5").animate({"left":"+=92"},"slow");}
						else	{	$(".Frames5").animate({"left":"+=5"},"normal").animate({"left":"-=5"},"normal");}
					
				});
				
				$(".RightBoots").click(function()
				{
					var st = parseInt($(".Frames6").css("left"));
					if (st >= -30) {	$(".Frames6").animate({"left":"-=92"},"slow");}
						else	{	$(".Frames6").animate({"left":"-=5"},"normal").animate({"left":"+=5"},"normal");}
					
				});
				
				$(".LeftBoots").click(function()
				{
					var st = parseInt($(".Frames6").css("left"));
					if (st <= -10) {	$(".Frames6").animate({"left":"+=92"},"slow");}
						else	{	$(".Frames6").animate({"left":"+=5"},"normal").animate({"left":"-=5"},"normal");}
					
				});



//Callback handler for form submit event
			$(".forma").submit(function(e)
			{
			 
			    var formObj = $(this);
			    var formURL = formObj.attr("action");
			    var formData = new FormData(this);
			    $.ajax({
			        url: formURL,
			    type: 'POST',
			        data:  formData,
			    mimeType:"multipart/form-data",
			    contentType: false,
			        cache: false,
			        processData:false,
			    success: function(data, textStatus, jqXHR)
			    {
			    },

			     error: function(jqXHR, textStatus, errorThrown)
			     {
			     },
			     complete: function(jqXHR, textStatus)
			    {
			 			$(".UserForm").hide("slow");
					       		$("#overlay").fadeOut('slow', function() 
									{
				            			$(this).remove();
									});
			    }       
			    });
			    e.preventDefault(); //Prevent Default action.
			   // e.unbind();
			});
			$("#multiform").submit(); //Submit the form
			
			
			
			
			$(".formm").submit(function(e)
			{
			 
			    var formObj = $(this);
			    var formURL = formObj.attr("action");
			    var formData = new FormData(this);
			    $.ajax({
			        url: formURL,
			    type: 'POST',
			        data:  formData,
			    mimeType:"multipart/form-data",
			    contentType: false,
			        cache: false,
			        processData:false,
			    success: function(data, textStatus, jqXHR)
			    {
			    },
			     error: function(jqXHR, textStatus, errorThrown)
				     {
				     },
			     complete: function(jqXHR, textStatus)
			    	{
			 		$(".ShippingForm").hide("slow");
		       		$(".ThankYou")
		       		.css("top", $(window).height()/2+$(window).scrollTop() + "px")
					.css("left", $(window).width()/2+$(window).scrollLeft() + "px")
					.show("slow");
					       		$("#overlay , .ThankYou").click(function() 
									{
										$(".ThankYou").hide("slow");
							       		$("#overlay").fadeOut('slow', function() 
									{
	            			$(this).remove();
						});
   					});
			    	}         
			    });
			    e.preventDefault(); //Prevent Default action.
			   // e.unbind();
			});
			$("#multiform").submit(); //Submit the form


			

			$.getJSON('./includes/data.json', function(data) {
				var output = '<ul class="Bгuyitems">';
				$.each(data, function(key, val) {
					output += '<li>';
					output += '<p >'+ val.name +'</p>';
					output += '<img src="images/'+ val.imgname +'.png" />';
					output += '<select>' + '<option value="1">' +val.qty + '</option>'+'</select>';
					output += '<p class="BuyitemsPrice">'+ val.price +'</p>';
					output += '<img class="BuyitemsDel" src="images/'+ val.delbut +'.png" />';
					output += '</li>';
				});
				output += '</ul>';
				$('.Buyitems').html(output);
			}); //get JSON
		
});
