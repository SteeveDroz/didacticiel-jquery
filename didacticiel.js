// Tout ce qui suit est exécuté lorsque le DOM est prêt.
$(function() {
  // Enroulement/déroulement des sections
  // ====================================

  // Lorsqu'on clique sur un titre h2 ou h3...
  $('h2, h3').click(function() {
    // ... la section suivante s'ouvre ou se ferme...
    $(this).next('section').slideToggle()
    // ... et le style du titre se modifie.
    $(this).toggleClass('closed')
  });

  // Les titres ayant la classe "collapsed" sont fermés par défaut.
  $('h2.collapsed, h3.collapsed').click()

  // Génération automatique des exemple d'après le code
  // ==================================================

  // Pour chaque exemple,...
  $('.exemple').each(function() {
    // ... on mémorise le nom...
    let nom = $(this).data('nom')
    // ... et on crée des éléments...
    let elements = []
    // .. d'après le data "elements".
    $(this).data('elements').split('|').forEach(function(donnee) {
      // Chaque élément comporte trois parties :
      let parties = donnee.split(/#|::/, 3)
      // 1) Le type de balise (div, a, input, ...)
      let balise = parties[0]
      // 2) La liste des attributs commençant par l'id (style, width, ...)
      let attributs = parties[1]
      // 3) Le contenu de la balise (html)
      let contenu = parties[2]
      // On sépare ces données et on les ajoute à "elements" en JSON.
      elements.push({
        attributs: attributs,
        balise: balise,
        contenu: contenu
      })
    }) // fin du forEach

    // On isole le code.
    let code = $(this).find('code').text()
    // On crée une zone d'exemple...
    let exemple = $('<div>')
    // ... ans laquel on insérera chaque élément...
    elements.forEach(function(element) {
      let attributs = element.attributs.split('&')
      let nouvelElement = $('<' + element.balise + '>', {
        // ... en modifiant simplement son ID pour qu'il soit unique sur la page.
        id: nom + '_' + attributs.shift(),
        html: element.contenu
      })
      // On oublie pas de gérer les attributs.
      attributs.forEach(function(attribut) {
        let cleValeur = attribut.split('=')
        let cle = cleValeur[0]
        let valeur = cleValeur[1]
        nouvelElement.attr(cle, valeur)
      })
      exemple.append(nouvelElement)
    })

    // On ajoute chaque élément à la zone d'exemple...
    $(this).append(exemple)
    // ... puis on ajoute une copie du script qui soit fonctionnelle...
    $(this).append($('<script></script>', {
      // ... en ajustant les ID comme plus haut.
      text: code.replace(/#(\w)/g,'#' + nom + '_$1')
    }))
  })

  // Gestion de la partie affichage de ce code
  // =========================================

  // On place le numéro de version dans l'élément spécifique.
  $('#jQueryVersion').text($(this).jquery)

  // On insère en AJAX le code de "didacticiel.js" dans l'élément spécifique.
  $('#jQuerySource').load('didacticiel.js')
}) // fin de $(function(){})
