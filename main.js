var renameApp = angular.module(
        'renameApp', 
        ['ngRoute', 'renameControllers', 'renameServices', 'renameDirectives']
    );

renameApp.config(function($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: '/templates/index.html',
                controller: 'IndexCtrl'
            })
            .when('/questions', {
                templateUrl: '/templates/questions.html',
                controller: 'QuestionsCtrl'
            })
            
            //Removed
            
            .otherwise({
                redirectTo: '/'
            })
            ;
});
renameApp.run(function() {});


    
    