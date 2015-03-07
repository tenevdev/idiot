define(function() {
    var ProjectsUserController = function($routeParams, ProjectResource) {
        this.projects = ProjectResource.query({
            user: $routeParams.user
        })
    }

    ProjectsUserController.$inject = ['$routeParams', 'ProjectResource']

    return ProjectsUserController
})
