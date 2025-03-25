# Cave Shuffle Clock

A simple clock that sounds an alert whenever the current time approaches a minute multiple of five, for use with [Dragon Cave.](https://dragcave.net)

### Local development

This is a plain React app, and doesn't need any setup to get running. You'll just need Node.js installed, of course.

```sh
git clone https://github.com/endulum/dc-shuffle-clock
cd dc-shuffle-clock
npm install
npm run dev
```

### Features

- Runs perpetually in the background once started, until paused or closed
- Alert volume, sound choice, and timing are customizable
- Uses your local time and omits the hour
- Sends notifications (if supported) with an optional direct link to biome of choice
- Alert preferences are locally stored and remembered by the browser
- PWA-compatible and can be installed to your home screen

_This tool was coded with ToC compliance in mind. The page makes no requests to Dragon Cave and does not interact with the site in any way._

### "I have a new feature idea..."

The Shuffle Clock should ideally remain simple with as few features as possible, though I'm happy to [hear you out](https://forums.dragcave.net/messenger/compose/?to=237359) if it's a critical feature.

### Asset credits

- **Background**: Tim Ward, [Subtle Patterns](https://www.toptal.com/designers/subtlepatterns/brushed-alum-dark/)

- **Default Sounds**: Daniel Simion, [SoundBible](https://soundbible.com/)
