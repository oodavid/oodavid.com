+++
title = "AngularJS Meta Tags Management"
date = 2017-07-18T12:00:00+01:00
draft = false
slug = ""
tags = [ "AngularJS" ]
categories = []
locale = "en-GB"
+++

Meta tags have played a huge role in search-engine history. While they no longer affect SEO rankings in the same way, they are more vital than ever in the "social sharing" ecosystem.

In this article I demonstrate a simple AngularJS Service that allows you to manage the `<meta>` tags in your app. I explain how AngularJS best practices aren't fit-for-purpose and offer a simple solution. I also explore debugging on Twitter, Pinterest and Facebook and the need for pre-rendering using 3rd party SaaS products.

<p class="text-center">
  <a class="button" href="/demo/angularjs-meta-tags-management/" target="_blank">
    <i class="fa fa-code" aria-hidden="true"></i>
    Demo
  </a>
  <a class="button" href="https://github.com/oodavid/oodavid.com/tree/master/static/demo/angularjs-meta-tags-management/" target="_blank">
    <i class="fa fa-github" aria-hidden="true"></i>
    GitHub
  </a>
</p>

## How are meta-tags used?

When sharing a links to a social network such as Facebook, LinkedIn, Pinterest or Twitter, we must provide meta data to create a rich experience. By doing so we can dictate the exact images, text and titles that are displayed when shared.

For example, if we share a link to [The Tick](http://www.imdb.com/title/tt5540054/) on IMDb to Facebook and Twitter, we see these objects:

<figure>
  <img src="/images/article/meta-facebook.png">
  <figcaption>Shared to Facebook - uses the "OpenGraph" meta tags</figcaption>
</figure>

<figure>
  <img src="/images/article/meta-twitter.png">
  <figcaption>Shared to Twitter - uses the "Twitter" meta tags</figcaption>
</figure>

## Example Markup

The following `<head>` element contains a number of `<meta>` tags. They describe the page in general terms and have additional properties for the OpenGraph (denoted by `og:`) and Twitter (denoted by `twitter:`). When shared, this page would create a rich experience as I demonstrated above.

```html
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="style.css" />
  <!-- General SEO -->
  <title>AngularJS Meta Tags Management - oodavid.com</title>
  <meta name="author" content="David King">
  <meta name="description" content="How to manage and update meta tags in your AngularJS app">
  <!-- Indexing / Spiders -->
  <meta name="googlebot" content="all">
  <meta name="bingbot" content="all">
  <meta name="robots" content="all">
  <!-- OpenGraph -->
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="oodavid.com" />
  <meta property="og:title" content="AngularJS Meta Tags Management" />
  <meta property="og:description" content="How to manage and update meta tags in your AngularJS app" />
  <meta property="og:url" content="https://oodavid.com/demo/angularjs-metadata-directive/" />
  <meta property="og:image" content="https://oodavid.com/demo/angularjs-meta-tags-management/meta-tags.png" />
  <meta property="og:image:width" content="680" ng-if="meta.image_width" />
  <meta property="og:image:height" content="340" ng-if="meta.image_height" />
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@oodavid">
  <meta name="twitter:title" content="AngularJS Meta Tags Management">
  <meta name="twitter:description" content="How to manage and update meta tags in your AngularJS app">
  <meta name="twitter:image" content="https://oodavid.com/demo/angularjs-meta-tags-management/meta-tags.png">
</head>
```

There are more meta tags than demonstrated here. With the emergence of new social networks, more will be available to use.

Since AngularJS creates single-page-apps, we need a way to manage these `<meta>` tags.

## The MetaTags Service

Our `MetaTagsService` manages these tags so that your <abbr title="Single Page Application">SPA</abbr> can make changes based on state. You will notice that there are special provisions for the `<title>` tag, and the nuances of the OpenGraph markup.

This approach does not use a Component or Directive, instead modifying the `<head>` tag directly from within the Service. This is unusual within AngularJS, but I will explain the rationale at the end of the article.

```js
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
  function setTags(tags){
    clearTags();
    mergeDefaultTags(tags);
    angular.forEach(tags, function(content, name){
      var tagElement = getTagElement(content, name);
      document.head.appendChild(tagElement);
      tagElements.push(tagElement);
    });
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
  function clearTags(){
    angular.forEach(tagElements, function(tagElement){
      document.head.removeChild(tagElement);
    });
    tagElements.length = 0;
  }
}
app.service('MetaTagsService', MetaTagsService);
```

With the service in place, our HTML can be drastically simplified:

```html
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="style.css" />
</head>
```

The service exposes two methods: `setDefaultTags` and `setTags`.

Use `setDefaultTags` to set fallback values for any meta tag. This can be as comprehensive as you like.

Then, use `setTags` to show the state of your UI. The values here are *merged* with any default tags that have been set.

```js
// Set the default "site" tags
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

// Set the route tags
MetaTagsService.setTags({
  'title': 'AngularJS Meta Tags Management',
  // OpenGraph
  'og:type': 'article',
  'og:title': 'AngularJS Meta Tags Management',
  'og:description': 'How to manage and update meta tags in your AngularJS app. This AngularJS service lets you manage the <meta> tags used by various social networks and search engines. From Google to Facebook and Twitter to Pinterest.',
  'og:image': 'https://oodavid.com/demo/angularjs-meta-tags-management/meta-tags.png',
  'og:image:width': '680',
  'og:image:height': '340',
  // Twitter
  'twitter:card': 'summary_large_image',
  'twitter:site': '@oodavid',
  'twitter:creator': '@oodavid',
  'twitter:title': 'AngularJS Meta Tags Management',
  'twitter:description': 'How to manage and update meta tags in your AngularJS app. This AngularJS service lets you manage the <meta> tags used by various social networks and search engines. From Google to Facebook and Twitter to Pinterest.',
  'twitter:image': 'https://oodavid.com/demo/angularjs-meta-tags-management/meta-tags.png',
});
```

Typically you would set your default tags during `run`, and set your state tags at an appropriate point in your app lifecycle for this; routing is a great starting point.

You can handle routing changes with a `$transition` lifecycle hook, or within a route Controller.

```js
appRun.$inject = ['MetaTagsService'];
function appRun(MetaTagsService){

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

  $transitions.onFinish({ to: 'article.*' }, ['$transition', function($transition){
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
  }]);

}
app.run(appRun);
```

## Testing and Debugging

Most social platforms have debuggers and validators that let you to test your URLs against their parsers. It is worth doing this occasionally as the platforms sometimes make  breaking changes to their requirements.

* [Facebook Open Graph Debugger](https://developers.facebook.com/tools/debug/og/object/)
* [Twitter Card Validator](https://cards-dev.twitter.com/validator)
* [Pinterest Rich Pins Validator](https://developers.pinterest.com/tools/url-debugger/)
* [LinkedIn Share Documentation](https://developer.linkedin.com/docs/share-on-linkedin)

### Special notes for Pinterest and LinkedIn

Before your page can be properly pinned to [Pinterest](https://pinterest.com), you must validate at least one URL on your domain. Do that here:

* https://developers.pinterest.com/docs/rich-pins/overview/

[LinkedIn](https://linkedin.com) has a few issues that are worth iterating:

1. LinkedIn does not have an online validator
  * You must share your URLs directly to their platform to test
1. LinkedIn caches your URLs for around 1 week
  * Use a "cache buster" to get around this by apending `?v=1`, `?v=2`, `?v=3` etc.
1. LinkedIn requires images have a valid suffix
  * Your images must end with `.jpg` or `.png`

## Pre-Rendering

The purpose of this service is to make your app more discoverable and shareable. However, many search engines and social networks only see the raw javascript, and never actually execute the code. Because of this limitation, you must **pre-render** your app.

There are many pre-rendering services that will run your javascript code and return static HTML to the crawlers. I use [netlify](https://netlify.com) to host this domain, which has built-in pre-rendering, however the following are all great services:

* [Prerender.io](https://prerender.io/)
* [Brombone](http://www.brombone.com/)
* [SEO.js](http://getseojs.com/)
* [SEO4Ajax](http://www.seo4ajax.com/)
* [Prerender.cloud](https://prerender.cloud/)

There is an open-source version of [Prerender.io](https://prerender.io/) that you can self-host, if you so wish.

Finally, you can quickly check the results of prerender.io by creating a URL like so:

```text
http://service.prerender.io/http://example.com/angular/app
```

## Why not use a Controller, Directive or Component?

AngularJS aficionados might be appalled at the _Service_ performing _DOM_ manipulations (the horror!). Surely *HTML compilation* is for Markup, Directives and Components? Well, the `<head>` element is a special-case and comes with limitations, namely:

* There can only be one `<head>` element.
* The `<head>` element can only contain:
  * `<title>`
  * `<base>`
  * `<link>`
  * `<meta>`
  * `<style>`
  * `<script>`
  * `<noscript>`

With this in mind, let's review our options.

### Using a Directive

```html
<head meta-tags>
  <meta charset="utf-8">
  <link rel="stylesheet" href="style.css" />
  <!-- The Directive can compile and append <meta> tags here -->
</head>
```

This was my initial approach. I had a `metaTags` Directive and `MetaTagsService`, the two would communicate, variables would be in scope and HTML would be compiled. The Directive part nagged at me, here's my train of thought:

1. The purpose of a Directive is to add logic to *any* element
1. I'm only insterested in the `<head>` element
1. A single `<head>` element is guaranteed to exist
1. What is the purpose of the Directive?

Further to this, I wasn't happy with the overhead of keeping these variables in scope and having them reviewed during the `$digest` phase. It seemed like overkill.

### Using a Controller with static markup

```html
<head ng-controller="MetaTagsController as ctrl">
  <meta charset="utf-8">
  <link rel="stylesheet" href="style.css" />
  <title>{{ ctrl.tags.title }}</title>
  <meta property="og:type" content="{{ ctrl.tags.ogType }}" ng-if="ctrl.tags.ogType" />
  <meta property="og:site_name" content="{{ ctrl.tags.ogSiteDomain }}" ng-if="ctrl.tags.ogType" />
  <!-- ...and repeat for every tag -->
</head>
```

The [ngMeta](https://github.com/vinaygopinath/ngMeta) module uses a similar approach. The problems here should be obvious:

1. Lots of markup
1. Adding new tags means modifying markup

### Using a Controller with ngRepeat

```html
<head ng-controller="MetaTagsController as ctrl">
  <meta charset="utf-8">
  <link rel="stylesheet" href="style.css" />
  <title>{{ ctrl.tags.title }}</title>
  <meta
    ng-repeat="tag in ctrl.tags"
    name="{{ tag.name }}"
    property="{{ tag.property }}"
    content="{{ tag.content }}">
</head>
```

This is somewhat better. However I'm still not keen on the fact that careful markup has to be added. Note that the `name` and `property` attributes exist for _all_ `<meta>` tags, even though they are only used in some situations.

### Using a Component

```html
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="style.css" />
  <meta-tags>
    <!-- The Component template can add <meta> tags here -->
  </meta-tags>
</head>
```

This one's simple to rule out, it's invalid markup. The allowed children of `<head>` are restricted. While this _may_ work on some social validators, the fact it's invalid makes me wary. Avoid.

### Conclusion

> The exception proves the rule.
