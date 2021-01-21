# Patched packages

In this repository lives patched packages that we use in our projects. The patches made here
are intended to be submitted upstream, so that they hopefully become obsolete. To unblock
us from pending PRs we put the packages here. Each branch contains an installable package,
so we can use them this way:

## react-relay-10.0.1

- Patch to address https://github.com/facebook/relay/issues/3331

```js
npm install github:coralproject/patched#react-relay-10.0.1 --save-dev
```
