define(['app', 'resources/project'], function(app, ProjectResource) {
    var injectParams = ['$scope', 'ProjectResource'],
        ExploreController = function($scope, ProjectResource) {
            this.message = 'Hello, explore!'
            this.featuredProjects = ProjectResource.list();
        }

    ExploreController.$inject = injectParams

    app.register.controller('ExploreController', ExploreController)
})
