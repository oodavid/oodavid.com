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
      template: '<h1>{{ ctrl.article.title }}</h1><p>{{ ctrl.article.description }}</p><p><img ng-src="{{ ctrl.article.image }}"></p><p>To see how <strong>prerender.io</strong> renders this route, <a ng-href="http://service.prerender.io/{{ ctrl.url }}" target="_blank">click here</a>.</p>',
      controller: ['$location', 'resolvedArticle', function($location, resolvedArticle){
        this.url = $location.absUrl();
        this.article = resolvedArticle;
      }],
      controllerAs: 'ctrl',
      resolve: {
        resolvedArticle: ['$stateParams', 'ArticlesService', function($stateParams, ArticlesService) {
          return ArticlesService.getArticle($stateParams.articleId);
        }]
      },
    });
}

angular
  .module('app')
  .config(appConfig);
