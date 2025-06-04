$(document).ready(function () {
  var $popup = $('#banner-popup');
  if ($popup.length) {
    var $img = $popup.find('img');
    modal.set($(window).width() * 0.9, $(window).height() * 0.9, 'auto', $img);
    modal.open({
      content: $popup.html(),
      width: 'auto',
      height: 'auto'
    });
  }
});
