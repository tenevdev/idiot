define(['app'], function(app){
    var injectParams = ['ProjectResource'],
    ProjectsListController = function(ProjectResource){
        this.projects = ProjectResource.list();
    }

    ProjectsListController.$inject = injectParams;

    app.register.controller('ProjectsListController', ProjectsListController);
});
