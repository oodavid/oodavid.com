
function MetaTagsService(){
  var service = this;
  service.setDefaultTags = setDefaultTags;
  service.setTags = setTags;
  var defaultTags = {};
  var tagElements = [];
  function setDefaultTags(tags){
    angular.copy(tags, defaultTags);
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
  function getHeadElement(){
    return document.getElementsByTagName('head')[0];
  }
  function getTagElement(content, name){
    if(name == 'title'){
      // Special provision for the title element
      return angular
        .element('<title>')
        .text(content);
    } else {
      // Opengraph uses [property], but everything else uses [name]
      var nameAttr = (name.indexOf('og:') === 0) ? 'property' : 'name';
      return angular
        .element('<meta>')
        .attr(nameAttr, name)
        .attr('content', content);
    }
  }
  function setTags(tags){
    clearTags();
    mergeDefaultTags(tags);
    var headElement = getHeadElement();
    angular.forEach(tags, function(content, name){
      var tagElement = getTagElement(content, name);
      headElement.append(tagElement);
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

appRun.$inject = ['MetaTagsService'];
function appRun(MetaTagsService){
  MetaTagsService.setDefaultTags({
    'title': 'oodavid.com',
    // General SEO
    'author': 'David King',
    'description': 'oodavid.com',
    // Indexing / Spiders
    'googlebot': 'all',
    'bingbot': 'all',
    'robots': 'all',
  });
  MetaTagsService.setTags({
    'title': 'AngularJS Meta Tags Management',
    // OpenGraph
    'og:type': 'article',
    'og:site_name': 'oodavid',
    'og:title': 'AngularJS Meta Tags Management',
    'og:description': 'How to manage and update meta tags in your AngularJS app. This AngularJS service lets you manage the <meta> tags used by various social networks and search engines. From Google to Facebook and Twitter to Pinterest.',
    // 'og:url': 'https://singer-duncan-17012.netlify.com/demo/angularjs-meta-tags-management/',
    'og:image': 'https://singer-duncan-17012.netlify.com/demo/angularjs-meta-tags-management/meta-tags.png',
    'og:image:width': '680',
    'og:image:height': '340',
    // Twitter
    'twitter:card': 'summary_large_image',
    'twitter:site': '@oodavid',
    'twitter:creator': '@oodavid',
    'twitter:title': 'AngularJS Meta Tags Management',
    'twitter:description': 'How to manage and update meta tags in your AngularJS app. This AngularJS service lets you manage the <meta> tags used by various social networks and search engines. From Google to Facebook and Twitter to Pinterest.',
    'twitter:image': 'https://singer-duncan-17012.netlify.com/demo/angularjs-meta-tags-management/meta-tags.png',
  });
}

appConfig.$inject = ['$locationProvider', '$stateProvider'];
function appConfig($locationProvider, $stateProvider){
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('one', {
      template: '<h1>One</h1>'
    })
    .state('two', {
      template: '<h1>Two</h1>'
    });
}

var app = angular.module('app',['ui.router']);
app.service('MetaTagsService', MetaTagsService);
app.config(appConfig);
app.run(appRun);
