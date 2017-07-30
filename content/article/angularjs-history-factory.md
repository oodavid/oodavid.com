+++
title = "AngularJS History Factory"
date = 2017-07-29T16:11:45+01:00
draft = true
slug = ""
tags = [ "AngularJS" ]
categories = []
locale = "en-GB"
+++

The History Factory let's you add "Undo" and "Redo" to your AngularJS App. This is the sort of feature that adds a "wow" moment in your user-experience. It's also incredibly easy to implement.

In this article I explain the logic of the Factory, give a demonstration of how we use it at Accredible, and explore some more great use-cases from around the web.

<!--more-->

<figure>
  <img src="/images/article/history-factory.gif">
  <figcaption>A trivial example of the History Factory</figcaption>
</figure>

<p class="text-center">
  <a class="button" href="/demo/angularjs-history-factory/">
    <i class="fa fa-code" aria-hidden="true"></i>
    Demo
  </a>
  <a class="button" href="https://github.com/oodavid/oodavid.com/tree/master/static/demo/angularjs-history-factory/">
    <i class="fa fa-github" aria-hidden="true"></i>
    GitHub
  </a>
</p>

{{< tweet 890891953512075264 >}}

## Todo

* Write Article
    * What is it?
    * How does it work?
    * Where to use?
        * Document Editor
        * Image Editor
* Create video

## Similar Libraries

There are a number of libraries that offer similar functionality:

* [angular-chronicle](http://blitzen.github.io/Angular-Chronicle/)
* [angular-history](https://github.com/decipherinc/angular-history)

They're worth exploring, but I found their implementations rely too much on `$scope`, and follows a `$watch` paradigm. This makes them unsuitable for use within Services, or where the `$scope` is not available.

The approach I present is portable, lightweight and not tightly bound to AngularJS.

## Use-Case - Accredible

Video

## A Note on the MutationObserver

...my approach is brute-force (stores entire objects, not "changes" per-say)
...the MutationObserver is a great alternative when doing DOM manipulation, for example, an SVG editor.
