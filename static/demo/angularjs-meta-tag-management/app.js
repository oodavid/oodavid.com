metaTagsDirective.$inject = ['MetaTagsService'];
function metaTagsDirective(MetaTagsService){
  return {
    restrict: 'A',
    link: metaTagsDirectiveLink,
  };
  function metaTagsDirectiveLink(scope, element, attrs){
    var tagElements = [];
    MetaTagsService.onChange(updateMetaTags);
    function updateMetaTags(tags){
      // Remove old tags
      angular.forEach(tagElements, function(tagElement){
        tagElement.remove();
      });
      // Add new tags
      angular.forEach(tags, function(content, name){
        var tagElement;
        if(name == 'title'){
          tagElement = angular
            .element('<title>')
            .text(content);
        } else {
          var nameAttr = (name.indexOf('og:') === 0) ? 'property' : 'name'; // Opengraph uses `property`, assume `name` for everything else
          tagElement = angular
            .element('<meta>')
            .attr(nameAttr, name)
            .attr('content', content);
        }
        element.append(tagElement);
        tagElements.push(tagElement);
      });
    }
  };
}

function MetaTagsService(){
  var service = this;
  service.setTags = setTags;
  service.onChange = onChange;
  var tags = {};
  var listeners = [];
  function setTags(myTags){
    angular.copy(myTags, tags);
    listeners.forEach(function(callback) {
      callback(tags);
    });
  }
  function onChange(callback){
    listeners.push(callback);
    callback(tags);
  }
}

appRun.$inject = ['MetaTagsService'];
function appRun(MetaTagsService){
  MetaTagsService.setTags({
    'title': 'oodavid.com',
    // General SEO
    'author': 'David King',
    'description': 'oodavid.com',
    // Indexing / Spiders
    'googlebot': 'all',
    'bingbot': 'all',
    'robots': 'all',
    // OpenGraph
    'og:type': 'article',
    'og:site_name': 'oodavid',
    'og:title': 'AngularJS Meta Tags Management',
    'og:description': 'This AngularJS service lets you manage the <meta> tags used by various sharing platforms. From Opengraph to Twitter and Pinterest.',
    'og:url': 'http://oodavid.com/article/angularjs-meta-tags-management/',
    'og:image': 'http://oodavid.com/article/angularjs-meta-tags-management/meta-tags.png',
    'og:image:width': '680',
    'og:image:height': '340',
    // Twitter
    'twitter:card': 'summary_large_image',
    'twitter:site': '@oodavid',
    'twitter:creator': '@oodavid',
    'twitter:title': 'AngularJS Meta Tags Management',
    'twitter:description': 'This AngularJS service lets you manage the <meta> tags used by various sharing platforms. From Opengraph to Twitter and Pinterest.',
    'twitter:image': 'http://oodavid.com/article/angularjs-meta-tags-management/meta-tags.png',
  });
}

var app = angular.module('app',[]);
app.directive('metaTags', metaTagsDirective);
app.service('MetaTagsService', MetaTagsService);
app.run(appRun);
