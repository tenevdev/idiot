define(function() {
    var ProjectsFeaturedController = function(ProjectResource) {
        this.projects = ProjectResource.list({
            // Add feature tags here
            'tags[]': []
        })
    }

    ProjectsFeaturedController.$inject = ['ProjectResource']

    return ProjectsFeaturedController
})
