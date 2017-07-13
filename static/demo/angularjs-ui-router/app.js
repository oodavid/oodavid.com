function ArticleService(){
  var service = this;
  this.getArticle = getArticle;
  var articles = {
    'one': {
      title: 'AngularJS Meta Tags Management',
      description: 'How to manage and update meta tags in your AngularJS app. This AngularJS service lets you manage the <meta> tags used by various social networks and search engines. From Google to Facebook and Twitter to Pinterest.',
      image: '/demo/angularjs-meta-tags-management/meta-tags.png',
      twitter_id: '@oodavid',
    },
    'two': {
      title: 'AngularJS Pagination Component',
      description: 'A simple component that adds pagination to your pages. The debounce feature is especially useful for rapid cycling of pages without overloading your server.',
      image: '/demo/angularjs-meta-tags-management/pagination.png',
      twitter_id: '@oodavid',
    },
  }
  function getArticle(articleId){
    return articles[articleId];
  }
}




appConfig.$inject = ['$locationProvider', '$stateProvider'];
function appConfig($locationProvider, $stateProvider){
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('home', {
      url: '/',
      template: '<h1>This is the home page</h1>'
    })
    .state('article', {
      url: '/article/:articleId',
      template: '<h1>{{ ctrl.article.title }}</h1><p>{{ ctrl.article.description }}</p><p><img ng-src="{{ ctrl.article.image }}"></p>',
      controller: function(resolvedArticle){
        this.article = resolvedArticle;
      },
      controllerAs: 'ctrl',
      resolve: {
        resolvedArticle: ['$stateParams', 'ArticleService', function($stateParams, ArticleService) {
          return ArticleService.getArticle($stateParams.articleId);
        }]
      },
    });
}




var app = angular.module('app',['ui.router']);
app.service('ArticleService', ArticleService);
app.config(appConfig);
