# Cave Shuffle Clock

A simple clock that sounds an alert whenever the current time approaches a minute multiple of five, for use with [Dragon Cave.](https://dragcave.net)

### About the tool

In Dragon Cave, eggs in each of the six biomes rotate out every five minutes on the dot. Being attentive of such rotations, or "shuffles" as they are referred to here, is key to effective cave hunting. The purpose of this tool is to keep the forgetful or multitasking user aware of such shuffles by way of a distinct auditory and visual cue, and to make looking for that one egg you want just a little less of a hassle.

### Features

- Runs perpetually in the background once started, until paused or closed
- Alert volume, sound choice, and timing are customizable
- Uses your local time and omits the hour
- Sends notifications (if supported) with an optional direct link to biome of choice
- Alert preferences are locally stored and remembered by the browser
- PWA-compatible and can be installed to your home screen

_This tool was coded with ToC compliance in mind. The page makes no requests to Dragon Cave and does not interact with the site in any way._

### Troubleshooting

**Mobile users:** The Shuffle Clock is prone to be put to sleep by your mobile browser or device if not in focus, resulting in dropped alerts. The mobile environment is more aggressive about putting processes to sleep, and "forcing" the page to bypass mobile sleep is out of my control. If you're experiencing dropped alerts, ensure that you:

- Keep your device on.
- Keep your device focused on this page, or have it regain focus every shuffle. If you have notifications enabled for the Clock, tapping the notification can quickly restore focus to the Clock's page for you.
- Depending on your device, prevent your device from enacting battery saving optimization or background activity suppression on the browser app you're using.

#### Other issues

- **Time is inaccurate:** The tool uses your local time. Be sure that your device clocked is accurately synced.

- **Link to biome in notification is enabled, but takes me nowhere:** The notification opens your biome of choice in a new tab or window, which may be interpreted as a pop-up and promptly blocked by the browser. Allow pop-ups for this tool if this is the case.

- **Notifications are automatically denied upon requesting access:** Be sure you are not on Incognito or Private Browsing. Notification capability is automatically disabled for these browsing modes.

- **Accidentally denied notifications:** Reset site permissions for this tool (look up specific instructions for your browser on how to do this), and you should be able to answer the request prompt again.

- **Notifications do not work:** See [here](https://frizbit.com/blog/troubleshooting-web-push-notifications-why-im-i-not-getting-notifications/) for several common issues pertaining to browser notifications to check and fix.

### "I have a new feature idea..."

The Shuffle Clock should ideally remain simple with as few features as possible. I'm happy to hear you out if it's a critical feature.

### Asset Credits

- **Background**: Tim Ward, [Subtle Patterns](https://www.toptal.com/designers/subtlepatterns/brushed-alum-dark/)

- **Default Sounds**: Daniel Simion, [SoundBible](https://soundbible.com/)
