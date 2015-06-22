## About

Linux static linking is hard, in most cases `-static` won't suffice, and you'll end installing (or building) a static toolchain to compile and link statically all the dependencies of your target program (and the program itself).

There exist several projects who aim to fix this by providing easy to follow recipes, there is however still the need to compile a lot of code, this repository define meta-recipes for building all available packages and publish them to http://s.minos.io , so the process can be reduced to:

```
$ static-get git
git-version.tar.gz
```

## Recipes

New and non functional recipes should be reported to upstream projects.

- bifrost-autobuild
  - https://github.com/jelaas/bifrost-build
  - https://github.com/minos-org/bifrost-build/ (if upstream don't reply)
- morpheus-autobuild
  - http://git.2f30.org/ports/
  - https://github.com/minos-org/morpheus-ports-delta (if upstream don't reply)
- misc-autosync / misc-autosync-resources (to the described url)

## Mirroring

If you're not interested in building all the recipes in your infraestructure and prefer to mirror frecuently http://s.minos.io, please use one of the following methods:

- `rsync -azvL --delete rsync://s.minos.io/mirror/ /usr/local/linux-static-mirror`

The recipes are run by [minos-sync-bot](https://github.com/minos-sync-bot) and sync once every day.
