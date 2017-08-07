'use strict';
angular.module('app')
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/login");
      $stateProvider
        .state('root', {
          abstract: true,
          views: {
          	'header@': {
              templateUrl: '/header/header.html'
            },
            'footer@': {
              templateUrl:'/header/footer.html'
            },
            "":{
            	template:'<ui-view></ui-view>'
            }
          },
        })

        .state('login', {
          url: '/login',
          templateUrl: '/login/login.html',
          controller:'loginController'
  
        })

        .state('root.menu', {
          url: '/menu',
          templateUrl: '/MENU/menu.html'
   
        })
        .state('root.profile', {
          url: '/profile',
          template: '<h1> ==== profile ====</h1><hr/>'
  
        })
        .state('root.app.error', {
          views: {
            'body@root': {
              template: '<div class="error">ERROR</div>'
            }
          }
        });
    }
  ])


   .run(function($rootScope, $state, $stateParams,$sessionStorage) {
  $rootScope.$on('$stateChangeStart', function(event, transition) {

      // if (!$sessionStorage['token']) {
      //   $state.go('login')
      // }
    // console.log($sessionStorage['token'])

})
  })
