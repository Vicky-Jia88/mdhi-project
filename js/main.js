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
