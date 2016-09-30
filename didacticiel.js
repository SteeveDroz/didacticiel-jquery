$(function() {
  $('h2, h3').click(function() {
    $(this).next('section').slideToggle();
  });

  $('h2.collapsed, h3.collapsed').next('section').hide();
});
