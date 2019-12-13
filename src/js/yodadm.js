$(".userinf-yd").click(function (e) {
    e.stopPropagation();
    $(".drop-opns").toggleClass('opensidemenu');
}); 

$('.userinf-yd').on('click', function () {
	$(this).toggleClass('opensidemenu');});
	$(document).click(function (e) {  
	if (!$(e.target).hasClass('userinf-yd')) { 
	$('.drop-opns.opensidemenu').removeClass('opensidemenu')   
	}})
$(document).click(function (e) { 
 if (!$(e.target).hasClass('userinf-yd')) {  
 $('.userinf-yd.opensidemenu').removeClass('opensidemenu')    
 }}) 
