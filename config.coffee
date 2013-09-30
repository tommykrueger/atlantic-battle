exports.config =
  # See docs at http://brunch.readthedocs.org/en/latest/config.html.
  files:
    javascripts:
      defaultExtension: 'js'
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
      order:
        before: [
          'vendor/scripts/console-helper.js',
          'vendor/scripts/jquery-1.7.2.js',
          'vendor/scripts/underscore-1.3.3.js',
          'vendor/scripts/backbone-0.9.2.js',
          'vendor/scripts/backbone-relational.js',
          'vendor/scripts/d3.v3.min.js',
          'vendor/scripts/d3.geo.projection.v0.min.js',
          'vendor/scripts/queue.v1.min.js',
          'app/lib/utils.js',
          'vendor/scripts/app-cities.js',
          'vendor/scripts/app-fleets.js',
          'vendor/scripts/app-provinces.js'
        ]

    stylesheets:
      defaultExtension: 'styl'
      joinTo: 'stylesheets/app.css'
      order:
        before: [
          'vendor/styles/normalize.css'
        ]

    templates:
      defaultExtension: 'eco'
      joinTo: 'javascripts/app.js'
