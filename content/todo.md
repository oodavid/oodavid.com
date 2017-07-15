---
title: "Todo"
date: 2017-07-04T14:23:53+01:00
draft: false
---

1. Page > About Me - *45 min*
1. Page > My Work - *1h 30*
1. Announce Launch - *15 min*
1. Contact Form > Simple, netlify, add to: - *30 min*
  * Footer
  * About Me
  * My Work
1. Setup automatic broadcasting with ifthisthenthat or zapier
  * Where else should I submit my articles?
1. Articles > Port archive - *1 hour*
1. Nav > Search - *1h*
1. Meta > Prepare Site for OpenGraph etc. (see README) - *20m*
1. Move the Demo / GitHub links to the frontmatter and deal with it on the archetype template
1. Might as well make the CSS test page an article, I can talk about Hugo / Netlify there too


---

This snippet will output the date that the site next needs to be rebuilt. I need to:

1. Get Hugo to output this to a plain file, like `_rebuild` ([link](https://discourse.gohugo.io/t/how-to-generate-a-file-without-file-extension/7449))
1. Get Netlify to support this feature

```
{{ range first 1 (where .Data.Pages.ByDate ".Date.Unix" ">" .Now.Unix ) }}
  {{ .Date }}
{{ end }}
```
