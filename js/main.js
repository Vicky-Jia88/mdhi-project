/*
 * GitHub Pages helper for this standalone Projects-page copy.
 * Links to pages that are not included in this repository continue to open
 * the corresponding page on the original MDHI website.
 */
(function () {
  var originalSite = 'https://mdhiglobal.com/';

  document.querySelectorAll('a[href$=".html"]').forEach(function (link) {
    var href = link.getAttribute('href');

    if (href && href !== 'mdhiproje.html') {
      link.setAttribute('href', originalSite + href);
    } else if (href === 'mdhiproje.html') {
      link.setAttribute('href', 'index.html');
    }
  });
}());

/* Industry filters for the B2B project showcase. */
(function () {
  var buttons = document.querySelectorAll('.industry-filter__button');
  var cards = document.querySelectorAll('.project-card');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var filter = button.getAttribute('data-filter');

      buttons.forEach(function (item) { item.classList.remove('is-active'); });
      button.classList.add('is-active');

      cards.forEach(function (card) {
        var visible = filter === 'all' || card.getAttribute('data-industry') === filter;
        card.classList.toggle('is-hidden', !visible);
      });
    });
  });
}());
