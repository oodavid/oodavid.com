ArticlesService.$inject = ['$location'];
function ArticlesService($location){
  var rootUrl = $location.protocol()+'://'+$location.host();
  if($location.port()){
    rootUrl += ':'+$location.port();
  }
  var service = this;
  this.getArticle = getArticle;
  var articles = {
    'one': {
      title: 'AngularJS Meta Tags Management',
      description: 'How to manage and update meta tags in your AngularJS app. This AngularJS service lets you manage the <meta> tags used by various social networks and search engines. From Google to Facebook and Twitter to Pinterest.',
      image: rootUrl+'/demo/angularjs-meta-tags-management/meta-tags.png',
      twitter_id: '@oodavid',
    },
    'two': {
      title: 'AngularJS Pagination Component',
      description: 'A simple component that adds pagination to your pages. The debounce feature is especially useful for rapid cycling of pages without overloading your server.',
      image: rootUrl+'/demo/angularjs-meta-tags-management/pagination.png',
      twitter_id: '@oodavid',
    },
  }
  function getArticle(articleId){
    return articles[articleId];
  }
}

angular
  .module('app')
  .service('ArticlesService', ArticlesService);
