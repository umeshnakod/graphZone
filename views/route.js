'use strict';
var app = angular.module('app')
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/?page=a");
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
        .state('dashboard', {
          parent: 'root',
          url: '/',
 		  template: '',
          controller: function($state) {
             $state.go('root.student');
          }
        })
        .state('root.student', {
          url: '/student',
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
  ]);
