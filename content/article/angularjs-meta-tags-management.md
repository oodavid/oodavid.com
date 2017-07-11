+++
title = "AngularJS Meta Tags Management"
date = 2017-07-09T13:26:49+01:00
draft = true
slug = ""
tags = []
categories = []
locale = "en-GB"
+++


<p class="text-center">
  <a class="button">test</a>
</p>

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
  <meta property="og:url" content="http://oodavid.com/article/angularjs-metadata-directive/" />
  <meta property="og:image" content="{{ meta.image }}" />
  <meta property="og:image:width" content="{{ meta.image_width }}" ng-if="meta.image_width" />
  <meta property="og:image:height" content="{{ meta.image_height }}" ng-if="meta.image_height" />
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@oodavid">
  <meta name="twitter:title" content="AngularJS Meta Tags Management">
  <meta name="twitter:description" content="How to manage and update meta tags in your AngularJS app">
  <meta name="twitter:image" content="{{ meta.image }}">
</head>
```

```html
<head meta-tags>
  <meta charset="utf-8">
  <title>Default Title</title>
  <link rel="stylesheet" href="style.css" />
</head>
```

## Pre-Rendering



## Debugging

Most social platforms have debuggers and validators that let you to test your URLs against their parsers. It is worth doing this occasionally as the platforms sometimes make  breaking changes to their requirements.

* [Facebook Open Graph Debugger](https://developers.facebook.com/tools/debug/og/object/)
* [Twitter Card Validator](https://cards-dev.twitter.com/validator)
* [Pinterest Rich Pins Validator](https://developers.pinterest.com/tools/url-debugger/)
* [LinkedIn Share Documentation](https://developer.linkedin.com/docs/share-on-linkedin)

## Pinterest Notes

Before your page can be properly pinned to pinterest, you must validate at least one URL on your domain.

https://developers.pinterest.com/docs/rich-pins/overview/

## LinkedIn Notes

LinkedIn has a few issues that are worth iterating:

1. LinkedIn does not have an online validator
  * You must share your URLs directly to their platform to test
1. LinkedIn caches your URLs for around 1 week
  * Use a "cache buster" to get around this by apending `?v=1`, `?v=2`, `?v=3` etc.
1. LinkedIn requires images have a valid suffix
  * Your images must end with `.jpg` or `.png`

