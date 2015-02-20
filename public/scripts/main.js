require.config({
    paths: {
        angular: '../lib/angular/angular',
        angularRoute: '../lib/angular-route/angular-route',
        angularResource: '../lib/angular-resource/angular-resource',
        angularAria: '../lib/angular-aria/angular-aria',
        angularAnimate: '../lib/angular-animate/angular-animate',
        hammer: '../lib/hammerjs/hammer',
        angularMaterial: '../lib/angular-material/angular-material'

    },
    shim: {
        'angular': {
            'exports': 'angular'
        },
        'angularRoute': ['angular'],
    },
    priority: [
        'angular'
    ]
})

require(['angular',
        'app'
    ],
    function(angular, app) {
        var $html = angular.element(document.getElementsByTagName('html')[0])

        angular.element().ready(function() {
            // Manual bootstrap
            angular.bootstrap(document, ['idiotApp'])
        })
    })
