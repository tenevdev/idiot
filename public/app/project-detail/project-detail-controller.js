define(function() {
    var ProjectDetailController = function($rootScope, $routeParams, ProjectResource) {
        var self = this

        ProjectResource.get({
            user: $routeParams.user,
            project: $routeParams.project
        }, function success(project, headers) {
            self.project = project
            // This property should be used to show partial views for edditing
            // such as hub-creation
            self.isOwner = $rootScope.globals.currentUser.username === project.owner.username
        }, function error(response) {
            // Handle error - maybe redirect to not found view
        })

    }

    ProjectDetailController.$inject = ['$rootScope', '$routeParams', 'ProjectResource']

    return ProjectDetailController
})
