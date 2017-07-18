+++
title = "Style Rendering Test"
date = 2017-07-16T20:46:41+01:00
draft = false
slug = ""
tags = []
categories = []
locale = "en-GB"
+++

This post marks a new chapter for **oodavid.com**; alongside a more article-centric design, I've migrated away from [Jekyll](https://jekyllrb.com) running on [GitHub pages](https://pages.github.com/) to [Hugo](https://gohugo.io/) running on [Netlify](https://netlify.com).

The migration has encouraged me to add a simple taskrunner (`npm` scripts that run `Hugo` and `SASS`) and to play with a more modern style. The design is heavily based on the [Stellar theme by HTML5Up](https://html5up.net/stellar), although my source code has been written from the ground-up. What can I say, I like to learn by doing!

This short article demonstrates various [Markdown](https://en.wikipedia.org/wiki/Markdown) elements and syntax. The purpose is to give me somewhere to test my CSS.

## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

## Horizontal Rules

___

---

***


## Typographic replacements

(c) (C) (r) (R) (tm) (TM)

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...

> > ...by using additional greater-than signs right next to each other...

> > > ...or with spaces between arrows.


## Lists

### Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

### Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

### Tasks

* [ ] incomplete
* [x] completed
    * [ ] a task list item
    * [ ] list syntax required

## Code

Inline `code`

Syntax highlighting

``` js
var foo = function (bar) {
  return bar++;
};
console.log(foo(5));
```

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](https://github.com/oodavid/oodavid.com)

[link with title](https://github.com/oodavid/oodavid.com "title text!")

Autoconverted link https://github.com/oodavid/oodavid.com


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Footnotes

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


## Definition lists

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.
