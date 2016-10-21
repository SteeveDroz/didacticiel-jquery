$(function() {
  $('h2, h3').click(function() {
    $(this).next('section').slideToggle();
    $(this).toggleClass('closed');
  });

  $('h2.collapsed, h3.collapsed').click();

  $('#jQueryVersion').text($(this).jquery)
  $('#jQuerySource').load('didacticiel.js')
});
