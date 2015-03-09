define(function() {
    var ProjectsFeaturedController = function(ProjectResource) {
        this.projects = ProjectResource.list({
            // Add feature tags here
            'tags[]': ['noit', 'explore']
        })
    }

    ProjectsFeaturedController.$inject = ['ProjectResource']

    return ProjectsFeaturedController
})
