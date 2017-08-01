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

angular
  .module('app')
  .run(appRun);
