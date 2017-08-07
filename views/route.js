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
              templateUrl: '/header/header.html',
              controller:'sidebarController'
            },
            'sidebar@':{
              templateUrl:'/sidebar/sidebar.html',
              controller:'sidebarController'
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

        .state('setupConenction', {
          url: '/connection',
          templateUrl: '/connection/view.html',
          controller:'connectionController'
  
        })

        .state('root.menu', {
          url: '/menu',
          templateUrl: '/menu/menu.html',
          controller:'menuController',
          resolve:{
            'state':function ($rootScope,$state,$sessionStorage ) {
            if (!$sessionStorage['token']) {
              $state.go('login');
            }else{
              if (!$sessionStorage['connection']) {
                $state.go('setupConenction');
              }
            }
          }
          }
   
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


    // console.log($sessionStorage['token'])

})

  })

