$(function() {
  // Lorsqu'on clique sur un titre h2 ou h3...
  $('h2, h3').click(function() {
    // ... la section suivante s'ouvre ou se ferme...
    $(this).next('section').slideToggle()
    // ... et le style du titre se modifie.
    $(this).toggleClass('closed')
  });

  // Les titres ayant la classe "collapsed" sont fermés par défaut.
  $('h2.collapsed, h3.collapsed').click()

  // On place le numéro de version dans l'élément spécifique.
  $('#jQueryVersion').text($(this).jquery)

  // On insère le code de "didacticiel.js" dans l'élément spécifique.
  $('#jQuerySource').load('didacticiel.js')
})
