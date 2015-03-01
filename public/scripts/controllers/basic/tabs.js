define(['app'], function(app) {
    var injectParams = ['$location'],
        TabsController = function($location) {

            this.tabs = [{
                title: 'Home',
                href: ''
            }, {
                title: 'Explore',
                href: 'explore'
            }, {
                title: 'About',
                href: 'about'
            },{
                title: 'Register',
                href: 'register',
                hide: 'globals.currentUser || nav.isHome()'
            }, {
                title: 'Login',
                href: 'login',
                hide: 'globals.currentUser'
            }, ]

            this.isHome = function(){
                return $location.url() === '/'
            }

            this.findSelectedIndex = function() {
                // Remove leading slash from url
                var url = $location.url().slice(1),
                    selectedIndex = 0

                this.tabs.every(function(tab, index) {
                    if (tab.href === url) {
                        selectedIndex = index
                        return false
                    }
                    return true
                })
                return selectedIndex
            }

            this.selectedIndex = this.findSelectedIndex()
        }

    TabsController.$inject = injectParams

    app.controller('TabsController', TabsController)
})
