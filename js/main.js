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

/* Project reference data and working market filters. */
(function () {
  var projects = [
    {name:'PLTU Jawa No. 7', location:'Indonesia', market:'power', label:'Power Generation & Utilities', scope:'2 × 1,050 MW coal-fired power plant; boiler structural steel.', image:'images/prpp.jpg'},
    {name:'Beni Suef, New Capital & Burullus Megaproject', location:'Egypt', market:'power', label:'Power Generation & Utilities', scope:'24 HRSG structures, casing, stacks, and secondary steel.', image:'images/prph.jpg'},
    {name:'Al Layyah', location:'United Arab Emirates', market:'power', label:'Power Generation & Utilities', scope:'1,026 MW, two HRSG NPP; main steel, duct and casing, and secondary steel.', image:'images/prph.jpg'},
    {name:'Dinginin / Mariveles', location:'Philippines', market:'power', label:'Power Generation & Utilities', scope:'1,336 MW and 668 MW coal-fired power plants; structural steel.', image:'images/prpp.jpg'},
    {name:'Mong Duong II', location:'Vietnam', market:'power', label:'Power Generation & Utilities', scope:'2 × 660 MW coal-fired power plant; structural steel.', image:'images/prpp.jpg'},
    {name:'Kwinana Waste-to-Energy Plant', location:'Australia', market:'power renewable', label:'Power & Low-Carbon Energy', scope:'36 MW; structural steel, ducts, silos, and secondary steel.', image:'images/prpp.jpg'},
    {name:'Kushiro, Ofunato & Buzen CFB / Biomass Projects', location:'Japan', market:'renewable', label:'Renewable & Low-Carbon Energy', scope:'Boiler structural steel references for CFB and biomass power applications.', image:'images/prph.jpg'},
    {name:'Corpus Christi Jumbo Polymers Project', location:'Texas, USA', market:'oil-gas', label:'Oil, Gas, LNG & Chemicals', scope:'Three-kilometre modular pipe racks and steel structures.', image:'images/prpo.jpg'},
    {name:'Curtis Island / APLNG / Gladstone LNG', location:'Queensland, Australia', market:'oil-gas', label:'Oil, Gas, LNG & Chemicals', scope:'Air-cooled condenser modules, structural steel, and support steel.', image:'images/prpo.jpg'},
    {name:'Petrofac / Kuwait Oil Gathering Center', location:'Kuwait', market:'oil-gas', label:'Oil, Gas, LNG & Chemicals', scope:'Manifold Group Trunkline modules.', image:'images/prpo.jpg'},
    {name:'Fluor / Invista China Adiponitrile Nylon 6,6 Chemical Plant', location:'China', market:'oil-gas', label:'Oil, Gas, LNG & Chemicals', scope:'Steel structures, non-oxidizers, and vent stacks.', image:'images/prpo.jpg'},
    {name:'Gazprom Omsk Refinery', location:'Russia', market:'oil-gas', label:'Oil, Gas, LNG & Chemicals', scope:'Conveyors, tower structures, tripper cars, hoppers, and support steel.', image:'images/prpo.jpg'},
    {name:'Yamama Cement Plant', location:'Saudi Arabia', market:'industrial', label:'Industrial Manufacturing', scope:'Structural steel, silos, conveyors, trusses, and support steel.', image:'images/prpm.jpg'},
    {name:'Kamoa Kakula Mining Project', location:'Location not specified', market:'mining', label:'Mining, Metals & Minerals Processing', scope:'SMPP scope including structural, mechanical, piping, and platework.', image:'images/prpm.jpg'},
    {name:'Roy Hill Iron Mine', location:'Location not specified', market:'mining ports', label:'Mining & Bulk Terminals', scope:'Overland conveyor modules and support structural steel.', image:'images/prpm.jpg'},
    {name:'Oyu Tolgoi Gold & Copper Mine', location:'Mongolia', market:'mining', label:'Mining, Metals & Minerals Processing', scope:'Underground steel structures, conveyors, transfer stations, bridge cranes, and platework.', image:'images/prpm.jpg'},
    {name:'Baffinland Mary River Iron Mine', location:'Location not specified', market:'mining ports', label:'Mining & Bulk Terminals', scope:'Conveyor modules and support structural steel for bulk-material handling.', image:'images/prpm.jpg'},
    {name:'NYU Langone Medical Center — Kimmel Pavilion', location:'USA', market:'buildings', label:'Buildings & Infrastructure', scope:'Main structural steel.', image:'images/prpb.jpg'},
    {name:'Shanghai Plaza 66', location:'China', market:'buildings', label:'Buildings & Infrastructure', scope:'Office and commercial complex; tower structural steel and roof superstructure.', image:'images/prpb.jpg'},
    {name:'King Abdulaziz International Airport Terminal 1', location:'Saudi Arabia', market:'buildings', label:'Buildings & Infrastructure', scope:'Structural steel.', image:'images/prpb.jpg'},
    {name:'American Dream Water Park & Mall', location:'USA', market:'buildings', label:'Buildings & Infrastructure', scope:'Curved trusses and box-girder structural steel.', image:'images/prpb.jpg'},
    {name:'Shenzhen Bay Sports Center', location:'China', market:'buildings', label:'Buildings & Infrastructure', scope:'Steel structures and erection services for a 13,000-seat stadium.', image:'images/prpb.jpg'},
    {name:'National Football League Stadium', location:'USA', market:'buildings', label:'Buildings & Infrastructure', scope:'Main structural steel assemblies.', image:'images/prpb.jpg'}
  ];
  var descriptions = {
    all:'Across power, energy, process industries, mining, infrastructure and bulk-material handling.',
    power:'Coal-fired, combined-cycle, waste-to-energy and utility-related power projects.',
    renewable:'Waste-to-energy, biomass and other low-carbon project environments.',
    'oil-gas':'Upstream, LNG, petrochemicals, refining and chemical processing facilities.',
    industrial:'Industrial production, cement and material-handling facilities.',
    mining:'Mining, mineral processing, conveying and transfer facilities.',
    buildings:'Commercial, healthcare, airport, sports and long-span structures.',
    ports:'Bulk terminals, stockyards, conveying and marine-related structures.'
  };
  var grid = document.getElementById('project-grid');
  var count = document.getElementById('project-count');
  var description = document.getElementById('project-market-description');
  var buttons = document.querySelectorAll('.industry-filter__button');
  var lightbox = document.getElementById('project-lightbox');
  var lightboxImage = document.getElementById('project-lightbox-image');
  var lightboxTitle = document.getElementById('project-lightbox-title');
  var lightboxLocation = document.getElementById('project-lightbox-location');
  var lightboxIndustry = document.getElementById('project-lightbox-industry');
  var lightboxScope = document.getElementById('project-lightbox-scope');
  var lastLightboxTrigger = null;

  if (!grid) return;

  function escapeText(value) {
    var node = document.createElement('div');
    node.textContent = value;
    return node.innerHTML;
  }

  function openLightbox(trigger) {
    if (!lightbox) return;
    lastLightboxTrigger = trigger;
    lightboxImage.src = trigger.getAttribute('data-image');
    lightboxImage.alt = trigger.getAttribute('data-title') + ' project reference';
    lightboxTitle.textContent = trigger.getAttribute('data-title');
    lightboxLocation.textContent = trigger.getAttribute('data-location');
    lightboxIndustry.textContent = trigger.getAttribute('data-industry');
    lightboxScope.textContent = trigger.getAttribute('data-scope');
    lightbox.hidden = false;
    document.body.classList.add('project-lightbox-open');
    lightbox.querySelector('.project-lightbox__close').focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lightboxImage.src = '';
    document.body.classList.remove('project-lightbox-open');
    if (lastLightboxTrigger) lastLightboxTrigger.focus();
  }

  if (lightbox) {
    lightbox.querySelector('.project-lightbox__close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.project-lightbox__backdrop').addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeLightbox();
    });
  }

  function render(filter) {
    var visible = projects.filter(function (project) {
      return filter === 'all' || project.market.split(' ').indexOf(filter) !== -1;
    });

    grid.innerHTML = visible.map(function (project, index) {
      var itemId = 'project-title-' + filter + '-' + index;
      return '<article class="project-card" itemscope itemtype="https://schema.org/CreativeWork" aria-labelledby="' + itemId + '">' +
        '<meta itemprop="image" content="' + project.image + '">' +
        '<button class="project-card__visual" type="button" style="background-image:url(\'' + project.image + '\')" data-image="' + project.image + '" data-title="' + escapeText(project.name) + '" data-location="' + escapeText(project.location) + '" data-industry="' + escapeText(project.label) + '" data-scope="' + escapeText(project.scope) + '" aria-label="Enlarge image for ' + escapeText(project.name) + '">' +
          '<span class="project-card__number">REF ' + ('0' + (index + 1)).slice(-2) + '</span>' +
          '<span class="project-card__zoom"><i class="fa fa-search-plus" aria-hidden="true"></i><em>VIEW IMAGE</em></span>' +
        '</button>' +
        '<div class="project-card__body">' +
          '<span class="project-card__sector">' + escapeText(project.label) + '</span>' +
          '<h4 id="' + itemId + '" itemprop="name">' + escapeText(project.name) + '</h4>' +
          '<dl class="project-card__facts">' +
            '<div><dt>Location</dt><dd itemprop="spatialCoverage"><i class="fa fa-map-marker" aria-hidden="true"></i>' + escapeText(project.location) + '</dd></div>' +
            '<div><dt>Delivered scope</dt><dd itemprop="description">' + escapeText(project.scope) + '</dd></div>' +
          '</dl>' +
          '<button class="project-card__details-button" type="button" aria-expanded="false">VIEW REFERENCE DETAILS <i class="fa fa-plus" aria-hidden="true"></i></button>' +
          '<div class="project-card__details" hidden>' +
            '<div><span>Project environment</span><p>' + escapeText(project.label) + '</p></div>' +
            '<div><span>Procurement discussion</span><p>Further technical, quality, documentation and delivery information can be reviewed against your package requirements.</p></div>' +
            '<a href="https://mdhiglobal.com/mdhicont.html">DISCUSS A COMPARABLE PACKAGE <i class="fa fa-angle-right" aria-hidden="true"></i></a>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');

    grid.querySelectorAll('.project-card__details-button').forEach(function (detailButton) {
      detailButton.addEventListener('click', function () {
        var detailPanel = detailButton.nextElementSibling;
        var expanded = detailButton.getAttribute('aria-expanded') === 'true';
        detailButton.setAttribute('aria-expanded', String(!expanded));
        detailButton.innerHTML = expanded ? 'VIEW REFERENCE DETAILS <i class="fa fa-plus" aria-hidden="true"></i>' : 'CLOSE DETAILS <i class="fa fa-minus" aria-hidden="true"></i>';
        detailPanel.hidden = expanded;
        detailButton.closest('.project-card').classList.toggle('is-expanded', !expanded);
      });
    });

    grid.querySelectorAll('.project-card__visual').forEach(function (imageButton) {
      imageButton.addEventListener('click', function () { openLightbox(imageButton); });
    });

    count.textContent = visible.length;
    description.textContent = descriptions[filter];
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      buttons.forEach(function (item) { item.classList.remove('is-active'); });
      buttons.forEach(function (item) { item.setAttribute('aria-pressed', 'false'); });
      button.classList.add('is-active');
      button.setAttribute('aria-pressed', 'true');
      render(button.getAttribute('data-filter'));
    });
  });

  render('all');
}());
