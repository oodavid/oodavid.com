---
title: "Todo"
date: 2017-07-04T14:23:53+01:00
draft: false
---

**oodavid.com** is a work-in-progress, these are my outstanding tasks.

I don't need a kanban board... _yet_

* [x] CSS > Make something pretty
* [x] Page > Index (just list articles)
* [x] Page > 404
* [x] Page > About Me
* [x] Article > Style Test
* [x] Netlify > Add prerendering for my demo code
* [x] CSS > Render all markdown
    * [x] Tables
    * [x] Lists
    * [x] Task-Lists
    * [x] Horizontal Rule
    * [x] Headings
    * [x] Blockquotes
    * [x] Code / Pre
* [x] Article > AngularJS Meta Tags
* [x] Launch on oodavid.com
* [x] Articles > Add a [Table of Contents](https://gohugo.io/extras/toc/)
* [x] Enable Disqus
* [x] Subscribe Form
    * [x] Netlify > Zapier > Mailchimp
    * [x] Make the form pretty
    * [x] Add a thank-you page
    * [x] Add partial to all relevent pages
* [x] RSS > Zapier > Twitter / Facebook
* [ ] Add Meta Data (for OpenGraph / Twitter) (see `README.md`) - *30m*
* [ ] Announce Launch - *15 min*

The following are lower priority, and only roughly unsorted

* [ ] Trigger mailchimp emails with each new article
* [ ] Favicon
    * [ ] https://cookicons.co/
* [ ] Pick some measurable goals
  * [ ] Subscribers, Visitors, Followers are simple (but vanity driven)
  * [ ] Quality re-shares etc. are nice (show network strength)
  * [ ] Sales (of what?) are best
* [ ] Pinned Articles (bubble to top on homepage, regardless of date)
* [ ] Style test should include all [Shortcodes](https://gohugo.io/content-management/shortcodes/)
* [ ] Apply Tags to articles
    * [ ] Angular, AngularJS, Firebase
    * [ ] Display on Article
    * [ ] Add Filter to Homepage
* [ ] Any need to A/B test?
* [ ] Review post archive, can anything be updated / rewritten?
* [ ] Change header silhouette to match article tag (Firebase)?
* [ ] Add Contact Form to Footer - *1h*
    * [ ] Netlify > Zapier > Email
    * [ ] Make the form pretty
    * [ ] Add a thank-you page
    * [ ] Add partial to footer
* [ ] Analytics > Add goals (signup)
* [ ] RSS > More Zapier Integrations
    * [ ] Push to Slack
        * [ ] Accredible > Development
        * [ ] UltimateAngular > Angular or AngularJS (title / tag dependent)
        * [ ] Firebase > General (title / tag dependent)
    * [ ] Push to Facebook
        * [x] My own page
        * [ ] Join appropriate communities, send there
    * [ ] Push to LinkedIn
* [ ] Update my Twitter branding
* [ ] Update my Facebook branding
* [ ] New Page > My Work - *3h*
* [ ] Compile a list of Angular and Javascript sites that accept submissions
    * [ ] Submit my articles there
    * [ ] Twitter is an excellent starting point
* [ ] Articles > Consider adding github links to frontmatter
* [ ] Articles > Port old blog posts from Jekyll to Hugo
* [ ] Move the Demo / GitHub links to the frontmatter and deal with it on the archetype template
* [ ] Disqus > Zapier > ?
* [ ] Add sharing meta data & local testing with ngrok
    * [ ] Add ngrok to the build system
    * [ ] Add meta-data for sharing
    * [x] Add "test on opengraph / twitter" link to all pages
* [ ] Nav > Add Search - *1h 30*

## Aggregators

Get some articles on the radar of these chaps:

* [ ] https://twitter.com/AngularJS_News
* [ ] https://twitter.com/ngnewsletter

(skim who _they_ follow, and build up my list)

## Automatic Rebuilds?

This snippet will output the date that the site next needs to be rebuilt. I need to:

1. Get Hugo to output this to a plain file, like `_rebuild` ([link](https://discourse.gohugo.io/t/how-to-generate-a-file-without-file-extension/7449))
1. Get Netlify to support this feature

See:

* https://gohugo.io/content-management/front-matter/
* https://gohugo.io/templates/output-formats/

```
{{ range first 1 (where .Data.Pages.ByDate ".Date.Unix" ">" .Now.Unix ) }}
  {{ .Date }}
{{ end }}
```

## Modules

When publishing modules, I must be careful to encourage further exploration of my work. A checklist for any new modules would be useful, something like:

* [ ] Link to all of my other modules
* [ ] Link to the blog article that spawned it
* [ ] Link to appangular (in due course)
* [ ] Make sure **oodavid** is prominent

## Moonshot

To be followed by:

* [ ] [@angular](https://twitter.com/angular/following)
* [ ] [@firebase](https://twitter.com/angular/following)
