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
    let exemple = $('<div></div>')
    // ... ans laquel on insérera chaque élément...
    elements.forEach(function(element) {
      let attributs = element.attributs.split('&')
      /*
      La ligne ci-dessous a des problèmes d'affichage lorsqu'on la voit par
      le didacticiel. Merci de vérifier le code source.
      */
      let nouvelElement = $(`<${element.balise}></${element.balise}>`, {
        // ... en modifiant simplement son ID pour qu'il soit unique sur la page.
        id: `${nom}_${attributs.shift()}`,
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

    // On crée un fieldset...
    let resultat = $('<fieldset></fieldset>')
    // ... auquel on donne le titre "Résultat"...
    resultat.append('<legend>Résultat</legend>')
    // ... et dans lequel on ajoute chaque élément à la zone d'exemple.
    $(resultat).append(exemple)
    // ... avant de l'ajouter à l'exemple.
    $(this).append(resultat)
    // Ensuite, on ajoute une copie du script qui soit fonctionnelle...
    $(this).append($('<script></script>', {
      // ... en ajustant les ID comme plus haut.
      text: code.replace(/#(\w)/g,`#${nom}_$1`)
    }))
    // On règle encore quelques propriétés CSS.
    resultat.css('position', 'relative').css('white-space', 'normal')

    // Pour chaque élément du résultat...
    resultat.children().eq(1).children().each(function() {
      // ... on mémorise d'élément pour éviter des conflits,
      let element = $(this)
      // ... on crée un tooltip
      let tooltip = $('<div></div>', {
        // qui contient l'ID de l'élément...
        text: `#${element.attr('id').replace(/^[^_]*_/, '')}`,
        // ... et du CSS.
        css: {
          background: '#ccf',
          border: '1px solid #00f',
          boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.4)',
          display: 'block',
          padding: '5px',
          position: 'absolute'
        }
      })
      // On règle le survol de l'élément comme suit :
      $(this).hover(function() {
        // On ajoute son tooltip au body quand on le survole...
        $('body').append(tooltip)
      }, function() {
        // ... et on l'enlève quand on arrête le survol.
        tooltip.detach()
      }).mousemove(function(e) {
        // Puis on place le tooltip à proximité du curseur quand il bouge.
        tooltip.css('left', e.pageX).css('top', e.pageY + 20)
      })
    })
  })

  // Exercice 1
  // ==========

  $('#exercice1Code').keyup(function() {
    $('#exercice1Script').text($('#exercice1Code').val())
  })

  // Gestion de la partie affichage de ce code
  // =========================================

  // On place le numéro de version dans l'élément spécifique.
  $('#jQueryVersion').text($(this).jquery)

  let jQuerySource = $('<div></div>')
  jQuerySource.load('didacticiel.js', function() {
    $('#jQuerySource').text(jQuerySource.html())
  })
  // On insère en AJAX le code de "didacticiel.js" dans l'élément spécifique.
}) // fin de $(function(){})
