require.config({
    waitSeconds: 60
    paths: {
        angular: '../lib/angular/angular.min',
        angularRoute: '../lib/angular-route/angular-route.min',
        angularResource: '../lib/angular-resource/angular-resource.min',
        angularAria: '../lib/angular-aria/angular-aria.min',
        angularAnimate: '../lib/angular-animate/angular-animate.min',
        angularMaterial: '../lib/angular-material/angular-material.min',
        angularCookies: '../lib/angular-cookies/angular-cookies.min',
        angularMessages: '../lib/angular-messages/angular-messages.min',
        angularIgnite: '../lib/ignite-ui/igniteui-angular',
        ignite: '../lib/ignite-ui/ig.min'
        jquery: [
            '//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
            '../lib/jquery/dist/jquery'
        ],
        jqueryUi: [
            '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min',
            '../lib/jquery-ui/jquery-ui'
        ],
        modernizr: '../lib/modernizr/modernizr',
        components: './components'
    },
    shim: {
        'angular': {
            'exports': 'angular',
            'deps': ['jqueryUi']
        },
        'jqueryUi': {
            'exports': '$',
            'deps': ['jquery']
        },
        'igniteCore': ['jqueryUi'],
        'igniteDv': ['jqueryUi'],
        'igniteLob': ['jqueryUi'],
        'angularRoute': ['angular'],
        'angularResource': ['angular'],
        'angularAria': ['angular'],
        'angularAnimate': ['angular'],
        'angularMaterial': ['angular'],
        'angularCookies': ['angular'],
        'angularMessages': ['angular'],
        'angularIgnite': ['angular', 'ignite'],
        'ignite': ['jquery', 'jqueryUi']
    },
    priority: [
        'angular'
    ]
})

require(['modernizr',
        'angular',
        'app'
    ],
    function(modernizr, angular, app) {
        var $html = angular.element(document.getElementsByTagName('html')[0])

        angular.element().ready(function() {
            // Manual bootstrap
            angular.bootstrap(document, ['Application'])
        })
    })
