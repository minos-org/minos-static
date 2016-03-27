## About

[![Build Status](https://travis-ci.org/minos-org/minos-static.png?branch=master)](https://travis-ci.org/minos-org/minos-static)

Linux static linking is hard, in most cases `-static` won't suffice, and you'll end building a static toolchain to compile and link all the dependencies of your target program and the program itself.

There exist several projects who aim to fix this by providing easy to follow recipes, that's great, however there is still the need to compile a lot of code, this repository define meta-recipes for building packages and publish them to http://s.minos.io , so the process can be reduced to:

```
$ static-get git
git-1.9.2.tar.xz
```

A verbose list of available packages can be retrieved with:

```
$ static-get --search
```

## Recipes

New and non functional recipes should be reported to upstream projects.

- bifrost-autobuild
  - https://github.com/jelaas/bifrost-build
  - https://github.com/minos-org/bifrost-build/ (if upstream doesn't reply)
- morpheus-autobuild
  - http://git.2f30.org/ports/
  - https://github.com/minos-org/morpheus-ports-delta (if upstream doesn't reply)
- rlsd2-autobuild
  - https://github.com/dimkr/rlsd2
  - https://github.com/minos-org/rlsd2-delta (if upstream doesn't reply)
- misc-autosync / misc-autosync-resources (to the described url)

## Mirroring

If you're intested in mirroring the provided binaries, please use one of the following methods, otherwise your IP may be banned:

- `rsync -azvL --delete rsync://s.minos.io/mirror/ /usr/local/linux-static-mirror`

The recipes are run by [minos-sync-bot](https://github.com/minos-sync-bot) and sync once every day.
