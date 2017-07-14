
function MetaTagsService(){
  var service = this;
  service.setDefaultTags = setDefaultTags;
  service.setTags = setTags;
  var defaultTags = {};
  var tagElements = [];
  function setDefaultTags(tags){
    angular.copy(tags, defaultTags);
    setTags({});
  }
  function mergeDefaultTags(tags){
    angular.forEach(defaultTags, function(defaultTagContent, defaultTagName){
      if(!tags[defaultTagName]){
        tags[defaultTagName] = defaultTagContent;
      } else if(defaultTagName === 'title'){
        tags['title'] += ' - '+defaultTagContent;
      }
    });
    return tags;
  }
  function getTagElement(content, name){
    if(name == 'title'){
      // Special provision for the title element
      var title = document.createElement('title');
      title.textContent = content;
      return title;
    } else {
      // Opengraph uses [property], but everything else uses [name]
      var nameAttr = (name.indexOf('og:') === 0) ? 'property' : 'name';
      var meta = document.createElement('meta');
      meta.setAttribute(nameAttr, name);
      meta.setAttribute('content', content);
      return meta;
    }
  }
  function setTags(tags){
    clearTags();
    mergeDefaultTags(tags);
    var headElement = document.head;
    angular.forEach(tags, function(content, name){
      var tagElement = getTagElement(content, name);
      headElement.appendChild(tagElement);
      tagElements.push(tagElement);
    });
  }
  function clearTags(){
    angular.forEach(tagElements, function(tagElement){
      tagElement.remove();
    });
    tagElements.length = 0;
  }
}



appRun.$inject = ['$transitions', 'MetaTagsService'];
function appRun($transitions, MetaTagsService){

  MetaTagsService.setDefaultTags({
    // General SEO
    'title': 'oodavid.com',
    'author': 'David King',
    'description': 'oodavid.com',
    // Indexing / Spiders
    'googlebot': 'all',
    'bingbot': 'all',
    'robots': 'all',
    // OpenGraph
    'og:site_name': 'oodavid',
    // Twitter
    'twitter:site': '@oodavid',
  });

  $transitions.onSuccess({ to: 'home' }, function($transition){
    MetaTagsService.setTags({});
  });

  $transitions.onSuccess({ to: 'article' }, function($transition){
    var state = $transition.to();
    var article = $transition.injector().get('resolvedArticle');
    MetaTagsService.setTags({
      // General SEO
      'title': article.title,
      // OpenGraph
      'og:type': 'article',
      'og:title': article.title,
      'og:description': article.description,
      'og:image': article.image,
      // Twitter
      'twitter:card': 'summary_large_image',
      'twitter:creator': article.twitter_id,
      'twitter:title': article.title,
      'twitter:description': article.description,
      'twitter:image': article.image,
    });

  });

}




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
app.service('MetaTagsService', MetaTagsService);
app.service('ArticleService', ArticleService);
app.config(appConfig);
app.run(appRun);
