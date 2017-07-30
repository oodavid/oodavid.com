+++
title = "Jekyll is dead, long live Hugo!"
date = 2017-07-25T20:24:55+01:00
draft = false
slug = ""
tags = [ "Hugo" ]
categories = []
locale = "en-GB"
+++

Over the past few days I've been revamping **oodavid.com** in terms of direction and style. While considering my work I took the opportunity to also review my choice of static-site-generator (SSG).

Jekyll was such a no-brainer at the time; SSGs were in their infancy and GitHub offers free generating and hosting of Jekyll sites. The _development_ cost to me was negligable. Fast-forward a number of years and the SSG space has exploded, in fact, it feels like the choice of programming languages grows with a power-law!

<!--more-->

## Direction

The rationale behind the blog revamp is simple; I'm focussing on a few core technologies that I'm using more regularly; namely Angular and Firebase.

While I won't restrict myself to these technologies _(I'm digging into nativescript at the moment)_, the resolve is useful in helping me decide what to write about.

If I was naive to give myself a moonshot goal, it would be to become a Google Developer Expert for Firebase. The limiting factor here is really on of time; I'm employed full-time, have a newborn and dedicate a lot of time to exercise and reading.

## Style

Purple-pink gradients? That's _so_ 2017.

It may seem like a radical departure from the previous style, but that's largely aesthetics. In terms of layout the site is nigh-on identical, we have a single-column with:

* Header
* Navbar
* Content
* Footer

UX is hard, until it isn't - for **oodavid.com** I couldn't justify the effort of departing from the perfectly functional structure.

<figure>
  <img src="/images/article/facebook-gradient.png">
  <figcaption>Even Facebook is getting in on the purple-pink action.</figcaption>
</figure>

## NPM Task Runner

I use Grunt, Gulp and npm as day-to-day task-runners, but never found the urge to add this to my blog - the purity of a vanilla setup is really appealing! Well, that time has gone; I've taken the opportunity to add a simple NPM task runner for this site. At the time of writing I've only got two tasks running:

* Build or Serve Hugo
* Compile SASS

On my roadmap I've earmarked the need for running ngrok so that I can test how any given article renders when shared to different platforms. I could use my IP address, but that doesn't exactly scale.

## Hosting with Netlify

The last peice of this extremely simple puzzle is hosting. I first started using [Netlify](https://netlify.com) at [Accredible](https://accredible.com) a number of months ago. In the time we've worked with the system I've seen it go from strength to strength.

This is a product that presents itself very simply (static site deployment), but in reality they have an amazing set of features with such good defaults you don't need to change anything.

* Git Integration
* CDN Hosting
* Runs `npm` and `python`
* Automatic `SSL` provisioning with `Let's Encrypt`
* Prerendering
* Split Testing
* Form Submission Hooks - these allow you to pipe data to Zapier for further processing

## In Memory of Jekyll

<figure>
  <img src="/images/article/oodavid-jekyll.png">
  <figcaption>oodavid on Jekyll - R.I.P.</figcaption>
</figure>
