# Develop

```
npm install
npm run server
npm run build
```

## Create a new article

```
hugo new article/article-title.md
```

## Create a new page

```
hugo new about-me.md
```

## Shortcodes & Internal Templates

Shortcodes are well documented:

https://gohugo.io/extras/shortcodes/

However internal templates appear to be in alpha, they're still usable though :)

https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/template_embedded.go

# Running Static Demo Files

The normal develop flow is for blogging and static-site generation (Hugo and SASS),
however my `/static/demo/` directory contains AngularJS examples that may need HTML5 mode active.
For this, use `superstatic`, like so:

```
npm install -g superstatic
superstatic
```
