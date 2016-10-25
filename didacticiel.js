$(function() {
  // Lorsqu'on clique sur un titre h2 ou h3...
  $('h2, h3').click(function() {
    // ... la section suivante s'ouvre ou se ferme...
    $(this).next('section').slideToggle()
    // ... et le style du titre se modifie.
    $(this).toggleClass('closed')
  });

  $('.exemple').each(function() {
    let nom = $(this).data('nom')
    let elements = []
    $(this).data('elements').split('|').forEach(function(donnee) {
      let parties = donnee.split(/#|::/, 3)
      let balise = parties[0]
      let attributs = parties[1]
      let contenu = parties[2]
      elements.push({
        attributs: attributs,
        balise: balise,
        contenu: contenu
      })
    })
    let code = $(this).find('code').text()
    let exemple = $('<div>')
    elements.forEach(function(element) {
      let attributs = element.attributs.split('&')
      let nouvelElement = $('<' + element.balise + '>', {
        id: nom + '_' + attributs.shift(),
        html: element.contenu
      })
      attributs.forEach(function(attribut) {
        let cleValeur = attribut.split('=')
        let cle = cleValeur[0]
        let valeur = cleValeur[1]
        nouvelElement.attr(cle, valeur)
      })
      exemple.append(nouvelElement)
    })

    $(this).prepend(exemple)
    $(this).append($('<script></script>', {
      text: code.replace(/#(\w)/g,'#' + nom + '_$1')
    }))
  })

  // Les titres ayant la classe "collapsed" sont fermés par défaut.
  $('h2.collapsed, h3.collapsed').click()

  // On place le numéro de version dans l'élément spécifique.
  $('#jQueryVersion').text($(this).jquery)

  // On insère en AJAX le code de "didacticiel.js" dans l'élément spécifique.
  $('#jQuerySource').load('didacticiel.js')
})
