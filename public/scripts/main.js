require.config({
    paths: {
        angular: '../lib/angular/angular',
        angularRoute: '../lib/angular-route/angular-route',
        angularResource: '../lib/angular-resource/angular-resource'
    }
})

window.name = "NG_DEFER_BOOTSTRAP!";

require(['app',
        'angular'
    ],
    function(app) {
        var $html = angular.element(document.getElementsByTagName('html')[0])

        angular.element().ready(function() {
            angular.resumeBootstrap(['idiotApp'])
        })
    })
