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
* [ ] Favicon
* [ ] Meta > Prepare for OpenGraph etc. (see `README.md`) - *30m*
* [ ] Page > My Work - *3h*
* [ ] Announce Launch - *15 min*
* [ ] Subscribe Form - *1h 30*
  * [ ] Use Netlify Forms
  * [ ] Pipe data into mailchimp, ittt or zapier
  * [ ] Trigger mailchimp emails with each new article (RSS?)
* [ ] Contact Form - *45 min*
  * [ ] Footer
  * [ ] About Me
  * [ ] My Work
* [ ] Compile a list of Angular and Javascript sites that accept submissions
  * [ ] Submit my articles there
* [ ] Articles > Consider adding github links to frontmatter
* [ ] Articles > Port old blog posts from Jekyll to Hugo
* [ ] Nav > Add Search - *1h 30*
* [ ] Move the Demo / GitHub links to the frontmatter and deal with it on the archetype template
* [ ] Enable Disqus - *15 min*
* [ ] Add sharing meta data & local testing with ngrok
  * [ ] Add ngrok to the build system
  * [ ] Add meta-data for sharing
  * [x] Add "test on opengraph / twitter" link to all pages

## Automatic Rebuilds?

This snippet will output the date that the site next needs to be rebuilt. I need to:

1. Get Hugo to output this to a plain file, like `_rebuild` ([link](https://discourse.gohugo.io/t/how-to-generate-a-file-without-file-extension/7449))
1. Get Netlify to support this feature

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
