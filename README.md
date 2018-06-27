In this repository lives patched packages that we use in our projects. The patches made here
are intended to be submitted upstream, so that they hopefully become obsolete. To unblock
us from pending PRs we put the packages here. Each branch contains a installable package,
so we can use them this way:

```js
npm install github:coralproject/patched#babel-plugin-relay --save-dev
```
