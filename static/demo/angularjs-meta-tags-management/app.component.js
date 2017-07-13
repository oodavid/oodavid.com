



/*
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
*/
