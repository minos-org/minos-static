## About

[![Build Status](https://travis-ci.org/minos-org/minos-static.png?branch=master)](https://travis-ci.org/minos-org/minos-static)

Static linking is a technique where all the dependencies of a program are copied into the executable image, this requires extra disk space and memory (multiple copies of the same dependency could be located in several programs) but helps with portability and ease of usage, just download the binary and run it. Dynamic linking on the other hand is accomplished by placing only a reference of a sharable library in the executable. Actual linking with the library routines does not occur until the image is run, when both the executable and the library are placed in memory. An advantage of dynamic linking is that multiple programs can share a single copy of the library which saves space and allows to provide security updates efficiently.

On Linux, most distributions use dynamic linking because of the above advantages, however at the same time that is also the cause of being binary incompatible with others, or even with themselves in different releases. Since dynamic linking requires a strict management of global libraries most Linux package systems require administration privileges to install new software and don't allow to install several versions of the same application. With static linking there is no need for special privileges unless it's desired to place the static binary in a global context and it's possible to have several versions of the same program without conflicts.

Unfortunately, currently static linking on Linux is hard, in most cases `-static` isn't enough, and the usage of special functions (such as gethostbyname, getpwnam_r, etc) and other referenced content (such as terminfo files) doesn't help, even glibc size can discourage the creation of such files. If you want to compile your own static binaries chances are that you'll require to patch your desired software and its dependencies and link them against an alternative libc implementation, such dietlibc, uclibc or musl. This repository aim to fix that. By compiling meta-recipes and publish them to http://s.minos.io, the process can be reduced to:

```
$ static-get tmux
tmux-1.9a.tar.xz
```

There are more than 1000 packages and the list is growing constantly, a verbose list of all of them can be retrieved with:

```
$ static-get --search
```

## Recipes

[static-get](https://github.com/minos-org/minos-static) builds on top of several amazing projects, as such, it's desirable to report to them when appropiated or to its minos deltas when in doubt.

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

[static-get](https://github.com/minos-org/minos-static) hasn't been designed to syncronizate data between servers, if you're intested in mirroring all the archive, please use one of the following methods:

- `rsync -azvL --delete rsync://s.minos.io/mirror/ /usr/local/linux-static-mirror`

The recipes are run by [minos-sync-bot](https://github.com/minos-sync-bot) and sync once every day.
