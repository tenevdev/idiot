require.config({
    paths: {
        angular: '../lib/angular/angular',
        angularRoute: '../lib/angular-route/angular-route',
        angularResource: '../lib/angular-resource/angular-resource',
        angularAria: '../lib/angular-aria/angular-aria',
        angularAnimate: '../lib/angular-animate/angular-animate',
        hammer: '../lib/hammerjs/hammer',
        angularMaterial: '../lib/angular-material/angular-material',
        angularCookies: '../lib/angular-cookies/angular-cookies'

    },
    shim: {
        'angular': {
            'exports': 'angular'
        },
        'angularRoute': ['angular'],
        'angularResource': ['angular'],
        'angularAria': ['angular'],
        'angularAnimate': ['angular'],
        'angularMaterial': ['angular'],
        'angularCookies': ['angular']
    },
    priority: [
        'angular'
    ]
})

require(['angular',
        'app',
        'services/authService',
        'services/base64',
        'controllers/user/login'
    ],
    function(angular, app) {
        var $html = angular.element(document.getElementsByTagName('html')[0])

        angular.element().ready(function() {
            // Manual bootstrap
            angular.bootstrap(document, ['idiotApp'])
        })
    })
