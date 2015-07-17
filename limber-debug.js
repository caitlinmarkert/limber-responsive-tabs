var initTabs = function(){
	var newID = 1;
	$('.limber-tabs').each(function(){
// initialize tabs ID -> tabs1, tabs2++ unless already has ID
		var tID = $(this).attr('id');
		if (tID == undefined) {
			$(this).attr('id','tabs'+newID);
			++newID;
		}
// mobile (starts setting up elements)
		$(this).find('.limber-tab').each( function() {
			$(this).wrapInner('<div class="limber-content"></div>');
			$(this).find('.limber-title').prependTo($(this));
		});
// initialize tabs NAMEs (creates anchors, links for each tab using tab's title)
		var tID = $(this).attr('id');
		$('#'+tID+' .limber-title').each(function(){
			var tabN = tID + '-' + $(this).text().replace(/ /g,'');
			$(this).attr('href','#'+tabN);
			$(this).attr('name',tabN);
			$(this).wrapInner('<a class="limber-title" href="#'+tabN+'" name="'+tabN+'"></a>').children().unwrap();
		});
// desktop
		$(this).prepend($('<hr />'));
		$(this).prepend($('<div class="limber-nav"></div>'));
		$('#'+tID+' .limber-title').each(function(){
			// duplicates the .limber-title that's a sub of .limber-tab, puts it in .limber-nav
			$(this).clone().appendTo( $(this).parent().parent().find('.limber-nav') );
		});
	});
}

var orientTabs = function(){
	// resets hr's position
	$('.limber-tabs hr').removeAttr('style');
	$('.limber-tabs').each(function(){
// desktop
		$(this).removeClass('mini').addClass('max');
// mobile
		// checks to see if the titles in .limber-nav overlap to the second line
		// if they do, tabs are minified
		var navH = $(this).find('.limber-nav').height();
		var aH = $(this).find('.limber-nav .limber-title').height();
		if (navH >= (2*aH)) {
			$(this).removeClass('max').addClass('mini');
		}
	});
}

var switchMiniTab = function(link, tID){
	var oldTabI = $('#'+tID+' .limber-tab.open').index();
	var isOldTabMax = $('#'+tID+' .limber-nav .limber-title.open').index();
	var isOldTabResized = $('#'+tID+' .limber-tab.open').data('beforeResize');
	var newTabI = link.parent().index();
	$('#'+tID+' .limber-title').removeClass('open');
	$('#'+tID+' .limber-tab').removeClass('open');
	// if open tab is clicked on, it collapses
	if ((oldTabI != newTabI) || (isOldTabMax > -1))
		link.parent().addClass('open');
	else if (isOldTabResized == true)
		link.parent().addClass('open');
	// tab scrolls to top if mini tabs are all set up
	if ($('#'+tID).data('miniSet') == true) {
		var toTop = link.offset().top;
		window.scrollTo(0,toTop);
	}
}

var switchMaxTab = function(link, tID){
	$('#'+tID+' .limber-title').removeClass('open');
	$('#'+tID+' .limber-tab').removeClass('open');
	// finds this tab's index
	var linkI = link.index();
	var $tabI = $('#'+tID+' .limber-tab:eq('+linkI+')');
	$tabI.addClass('open');
	link.addClass('open');
}

var changeMaxHrPosition = function(link, tID){
	var hrW = link.outerWidth(true);
	var hrX = (link.position().left - link.parent().position().left);
	// if all tabs closed, hr becomes as tall as entire tabs object
	if (!($('#'+tID+' .limber-tab').hasClass("open"))) {
		hrW = $('#'+tID).outerWidth();
		hrX = 0;
	}
	$('#'+tID+' hr').css('width',hrW+'px');
	$('#'+tID+' hr').css('left',hrX+'px');
}

var changeMiniHrPosition = function(link, tID){
	var hrH = link.parent().outerHeight();
	var hrY = link.parent().position().top;
	// if all tabs closed, hr becomes as tall as entire tabs object
	if (!($('#'+tID+' .limber-tab').hasClass("open"))) {
		hrH = $('#'+tID).outerHeight();
		hrY = 0;
	}
	$('#'+tID+' hr').css('height',hrH+'px');
	$('#'+tID+' hr').css('top',hrY+'px');
}

var setMaxDefault = function(h, tID){
	$('#'+tID).data('miniSet',false);
	var link = $('#'+tID+' .limber-nav a.limber-title:eq(0)');
	$('#'+tID+' .limber-nav .limber-title').each(function(){
		var tabID = $(this).attr('name');
		var wasResized = $('#'+tID+' .limber-tab .limber-title[name="'+tabID+'"]').parent().data('beforeResize');
		if ((tabID == h) || (wasResized == true))
			link = $('#'+tID+' .limber-nav .limber-title[name="'+tabID+'"]');
	});
	link.trigger('click-tab');
}

var setMiniDefault = function(h, tID){
	var link = $('#'+tID+' .limber-tab:eq(0) .limber-title');
	$('#'+tID+' .limber-tab .limber-title').each(function(){
		var tabID = $(this).attr('name');
		var wasResized = $(this).parent().data('beforeResize');
		if ((tabID == h) || (wasResized == true))
			link = $('#'+tID+' .limber-tab .limber-title[name="'+tabID+'"');
	});
	link.trigger('click-tab');
	// for anchor scrolling on mobile
	$('#'+tID).data('miniSet',true);
}

var setDefault = function(){
	// checks URL to tab anchor name
	var h = window.location.hash.substring(1);
	var tID;
	$('.limber-tabs.max').each(function(){
		tID = $(this).attr('id');
		setMaxDefault(h, tID);
	});
	$('.limber-tabs.mini').each(function(){
		tID = $(this).attr('id');
		setMiniDefault(h, tID);
	});
}
var setClicks = function(){
	// note: unbind() to prevent functions from triggering twice
	$('.limber-tabs.max .limber-nav .limber-title').unbind().on('click click-tab', function(event){
		event.preventDefault();
		var link = $(this);
		var tID = $(this).parent().parent().attr('id');
		switchMaxTab(link, tID);
		changeMaxHrPosition(link, tID);
	});
	$('.limber-tabs.mini .limber-tab .limber-title').unbind().on('click click-tab', function(event){
		event.preventDefault();
		var link = $(this);
		var tID = $(this).parent().parent().attr('id');
		switchMiniTab(link, tID);
		changeMiniHrPosition(link, tID);
	});
}

var rememberCurrentTab = function(){
	$('.limber-tabs').each(function(){
		// sets data var to retrieve at mode set default
		$(this).find('.limber-tab.open').data('beforeResize',true);
	});
}

var forgetPastTab = function(){
	$('.limber-tabs').each(function(){
		// sets data var to retrieve at mode set default
		$(this).find('.limber-tab').data('beforeResize',undefined);
	});
}

$(document).ready(function(){
	if ($('.limber-tabs').length) {
		initTabs();
		orientTabs();
		setClicks();
		setDefault();
	}
});

var wWidth = window.innerWidth;
$(window).on("resize", decide);
function decide(){
	if ($('.limber-tabs').length) {
		// mobile fix - so that tabs don't keep trying to resize when scrolling on phones
		// if window resizes more than 25px, then tabs resize and possibly change modes
		if(Math.abs(wWidth - window.innerWidth) > 20){
			var w = window.innerWidth;
			rememberCurrentTab();
			orientTabs();
			setClicks();
			setDefault();
			forgetPastTab();
			window.scrollTo(0,0);
			wWidth = w;
		}
	}
}