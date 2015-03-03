define(function() {
    var ProjectsListController = function(ProjectResource) {
        this.projects = ProjectResource.list();
    }

    ProjectsListController.$inject = ['ProjectResource']

    return ProjectsListController
})
