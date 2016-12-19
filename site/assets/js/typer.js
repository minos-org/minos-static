function Typer (element, options, scenes) {
  // we define some default options to
  // limit the need of adding extra configuration
  var defaultOptions = { erase: 60, type: 80, break: 1000 };

  // "config" is actually going
  // to hold the options after they got merged
  var config = {};

  // if options is an array, it means it's
  // a list of scene and we didn't specify
  // any options so in this case we're just
  // swapping the arguments and setting an empty
  // object for "options"
  // this is great as it allows you to skip
  // the options object if you're already ok
  // with the defaults
  if (Array.isArray(options)) {
    scenes = options;
    options = {};
  }

  // here we loop over the defaultOptions properties
  for (var key in defaultOptions) {
    // that check ensures we're not looping over
    // prototype properties, it's something that's
    // related to how the for loop works but has nothing
    // to do with this particular implementation ;)
    if (!defaultOptions.hasOwnProperty(key)) continue;

    if (options[key] != null) {
      // if there's an option provided for the
      // given key, take it
      config[key] = options[key];
    } else {
      // but otherwise, take it from the defaults
      config[key] = defaultOptions[key];
    }
  }

  // this status is what tells us
  // whether the animation should be playing or not
  var status = 'ready';

  // state holds the currently typed value
  // it's safer to rely on that internal state
  // instead of the element's textContent as
  // it could be changed by something else
  // while this state variable cannot be changed
  var state = '';

  // currentSceneIndex store the index of
  // the current playing scene
  var currentSceneIndex = 0

  function type () {
    if (status !== 'playing') {
      // if the animation is not playing
      // we don't want to do anything so just return
      return;
    }

    // let's get the current scene's value
    var scene = scenes[currentSceneIndex];

    // is the state the same as the scene?
    // if so, it means we're done typing
    if (state === scene) {
      // so make a break and then erase the content
      return setTimeout(erase, config.break);
    }

    // if we made it until there,
    // it means we still have some text to type
    // we want to type the next character
    // to do so we could get the current length
    // and get the relevant character, e.g:
    // scene.charAt(state.length + 1)
    // but once again, the text content of the
    // element could have been changed by
    // something else so instead we're taking
    // the scene's content from the start until
    // the next character
    state = scene.substr(0, state.length + 1);
    element.textContent = state;

    // after some delay, we're calling the same function
    // (the one we are currently in)
    // this way we'll type the next character if allowed/needed
    // or just call the erase function
    setTimeout(type, config.type);
  }

  function erase () {
    if (status !== 'playing') {
      // same as type(), if the animation is not
      // playing, there's nothing to do and we can just return
      return;
    }

    if (state === '') {
      // if the state is empty, it means
      // we have erased everything and we
      // want to play the next scene
      // which is basically the currentScene + 1
      currentSceneIndex++;

      // but the current scene could have been the last
      // if so, we want to loop over the scenario
      // and replay it from scratch, setting the current scene to 0
      if (currentSceneIndex === scenes.length) {
        currentSceneIndex = 0;
      }

      // now that we have updated the current scene
      // just ask to type() to type it
      return type();
    }

    // ok so if we're there, it means there are
    // still some characters to erase
    state = state.substr(0, state.length - 1);
    element.textContent = state;

    // after some delay, erase the next character
    setTimeout(erase, config.erase);
  }

  function stop() {
    // as you've seen through erase and type
    // the animation is stopped if the status
    // is not "playing" so setting it to "ready"
    // has the effect of stopping the animation
    status = 'ready';
  }

  function play() {
    if (status === 'ready') {
      // playing a scenario that is already
      // playing is a non-sense so that's
      // why we're ensuring that it's ready
      // before playing it
      status = 'playing';
      type();
    }
  }

  // to avoid having to call the play
  // the first time, let's just do it there
  play();

  // we're returning some functions that could be
  // useful to users :)
  return { play: play, stop: stop };
}

var typer = document.getElementById('typer');
var player = Typer(typer, ['curl', 'htop', 'tmux', 'ffmpeg', 'vim', 'mutt', 'mplayer', 'strace', 'busybox', 'nginx']);

// to specify some options, you could do:
// var player = Typer(typer, { erase: 40, type: 60, break: 4000 }, ['Hello there!', 'How u doing?']);

// now, run the fiddle and you'll see that it gets stopped
// after 600ms and is resumed after 2 seconds
setTimeout(player.stop, 600)
setTimeout(player.play, 2000)
