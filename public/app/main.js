require.config({
    waitSeconds: 20,
    paths: {
        angular: '../lib/angular/angular',
        angularRoute: '../lib/angular-route/angular-route',
        angularResource: '../lib/angular-resource/angular-resource',
        angularAria: '../lib/angular-aria/angular-aria',
        angularAnimate: '../lib/angular-animate/angular-animate',
        hammer: '../lib/hammerjs/hammer',
        angularMaterial: '../lib/angular-material/angular-material',
        angularCookies: '../lib/angular-cookies/angular-cookies',
        angularMessages: '../lib/angular-messages/angular-messages',
        angularIgnite: '../lib/ignite-ui/igniteui-angular',
        ignite: '../lib/ignite-ui/infragistics',
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
