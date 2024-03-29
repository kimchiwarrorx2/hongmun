
var modal = (function(){
	var 
	method = {},
	$overlay,
	$modal,
	$content,
	$close,
	_width = 'auto',
	_height = 'auto';
	_overflow = 'auto';

	// Center the modal in the viewport
	method.center = function () {
		var top, left;

		top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
		left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

		$modal.css({
			top:top + $(window).scrollTop(), 
			left:left + $(window).scrollLeft()
		});
	};

	method.set = function(w, h, overflow, obj)
	{
		_width = (w!=null && obj.width()>w) ? w : 'auto';
		_height = (h!=null && obj.height()>h) ? h : 'auto';
		_overflow = overflow!=null ? overflow : 'auto';
	};

	// Open the modal
	method.open = function (settings) {
		$content.empty().append(settings.content);

		$modal.css({
			width: settings.width || 'auto', 
			height: settings.height || 'auto'
		});

		$content.css({
			width: _width, 
			height: _height,
			overflow: _overflow
		});	

		method.center();
		$(window).bind('resize.modal', method.center);
		$modal.show();
		$overlay.show();
	};

	// Close the modal
	method.close = function () {
		$modal.hide();
		$overlay.hide();
		$content.empty();
		$(window).unbind('resize.modal');
	};

	// Generate the HTML and add it to the document
	$overlay = $('<div id="modal_overlay"></div>');
	$modal = $('<div id="modal_wrap"></div>');
	$content = $('<div id="modal_content"></div>');
	$close = $('<a id="modal_close" href="#">close</a>');

	$modal.hide();
	$overlay.hide();
	$modal.append($content, $close);


	$(document).ready(function(){
		$('body').append($overlay, $modal);						
	});

	$close.click(function(e){
		e.preventDefault();
		method.close();
	});

	return method;
}());