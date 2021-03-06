define(function() {
    var ProjectCreationController = function($rootScope, $location, ProjectResource) {
        this.tags = []

        this.submit = function() {
            var newProject = new ProjectResource({
                name: this.name,
                tags: this.tags
            })

            newProject.$save({
                user: $rootScope.globals.currentUser.username
            }, function success(project, headers) {
                $location.path('/projects/' + $rootScope.globals.currentUser.username + '/' + project.name)
            }, function error(response) {
                // Handle error with dialog
            })
        }
    }

    ProjectCreationController.$inject = ['$rootScope', '$location', 'ProjectResource']

    return ProjectCreationController
})
