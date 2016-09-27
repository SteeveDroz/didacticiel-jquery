$(function() {
  $('h2, h3').click(function() {
    $(this).next('section').slideToggle();
  });
});
