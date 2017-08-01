+++
title = "AngularJS Memento Factory"
date = 2017-08-01T16:11:45+01:00
draft = false
slug = ""
tags = [ "AngularJS" ]
categories = []
locale = "en-GB"
+++

The Memento Factory let's you add "Undo" and "Redo" functionality to your AngularJS App. This is an easily overlooked feature that adds a "wow" moment to your user-experience. It's also incredibly easy to implement.

In this article I explain the logic of the Factory, give a demonstration of how we use it at Accredible, and explore some more great use-cases from around the web.

<!--more-->

## A Simple Demo

Before getting into the details, I've created a simple demo that uses the Memento Factory to track a number of non-primite variables, ie: `arrays` and `objects`.

<p class="text-cente
  ">
  <a href
  "/demo/angularjs-memento-factor
  /">
  <i class="fa fa-code" aria-hidden="true"></i>
  Demo
  </a>
  <a class="button" href="https://github.com/oodavid/oodavid.com/tree/master/static/demo/angularjs-memento-factory/">
    <i class="fa fa-github" aria-hidden="true"></i>
    GitHub
  </a>
</p>

<figure>
  <img src="/images/article/memento-factory.gif">
  <figcaption>A trivial example of the Memento Factory</figcaption>
</figure>

By playing with the demo, and viewing the source, you can see the Memento Factory is incredibly simple to use and effective at tracking these variables.

## How Does It Work?

There are typically two design patterns for handling Undo and Redo:

The [The Command Pattern](https://coderwall.com/p/rdzera/command-pattern-in-javascript-undo-redo) requires that every `action` has an `inverse action`. This puts huge demands on your code; creating an inverse for every action is no trivial feat!

The [The Memento Pattern](http://www.dofactory.com/net/memento-design-pattern) deals only with storing and restoring **state**. This concept fits very well with the core idea of `state` in AngularJS, and so is a great fit for our factory.

{{% code file="/static/demo/angularjs-memento-factory/MementoFactory.js" language="js" %}}

The `MementoFactory` exposes a few methods and properties:

* `save()` - which saves a snapshot of the target objects
* `undo()` and `redo()` - restores a snapshot
* `canUndo()` and `canRedo()` - returns boolean if there are snapshots to be restored
* `timestamp` - the timestamp of the _current_ snapshot (useful for testing if the active state has been saved to the server, or not)

## Implementation

It's very strightforward. Assuming the factory is available to your Controller or Service...

### Create a Memento object

Create a `new Memento(...)` object, passing the non-primitive variables you want to track

```js
ctrl.user = { name: 'David King', location: 'England' };
ctrl.tags = [ 'AngularJS', 'Angular', 'Firebase' ];
// Create a new Memento object
var memento = new Memento(ctrl.user, ctrl.tags);
// Expose the undo and redo methods
ctrl.canUndo = memento.canUndo;
ctrl.redo    = memento.redo;
ctrl.canRedo = memento.canRedo;
ctrl.undo    = memento.undo;
```

### Add undo and redo buttons to your View

```html
<button
  type="button"
  ng-click="ctrl.undo()"
  ng-disabled="!ctrl.canUndo">Undo</button>
<button
  type="button"
  ng-click="ctrl.redo()"
  ng-disabled="!ctrl.canRedo">Redo</button>
```

### Save your Memento object, when appropriate

```html
<input
  type="text"
  ng-model="ctrl.user.name"
  ng-change="ctrl.save()">
<input
  type="text"
  ng-model="ctrl.user.location"
  ng-change="ctrl.save()">
```

... and that's it!

## Where should I use it?

I think **every single** design interface should have Undo and Redo functionality. The apparent complexity of this feature is often enough to dissuade people from adding it. As I've demonstrated here, with AngularJS and a good Memento Factory, it's actually trivial.

{{< tweet 890891953512075264 >}}

We use it at Accredible on our Certificate Design editor:

{{< youtube 3nHsJSRmnNM >}}

## Similar Libraries

There are a number of libraries that offer similar functionality:

* [angular-chronicle](http://blitzen.github.io/Angular-Chronicle/)
* [angular-history](https://github.com/decipherinc/angular-history)

They're worth exploring, they both follow the `$watch` paradigm, which comes at a price.
