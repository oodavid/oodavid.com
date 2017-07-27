+++
title = "AngularJS History Factory"
date = 2017-07-29T16:11:45+01:00
draft = true
slug = ""
tags = [ "AngularJS" ]
categories = []
locale = "en-GB"
+++



<!--more-->

<p class="text-center">
  <a class="button" href="/demo/angularjs-history-factory/" target="_blank">
    <i class="fa fa-code" aria-hidden="true"></i>
    Demo
  </a>
  <a class="button" href="https://github.com/oodavid/oodavid.com/tree/master/static/demo/angularjs-history-factory/" target="_blank">
    <i class="fa fa-github" aria-hidden="true"></i>
    GitHub
  </a>
</p>

## Todo

* Create a demo
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
