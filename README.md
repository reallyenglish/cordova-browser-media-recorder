# cordova-browser-media

## General use

In your project, just install the plugin directly from github using the Cordova CLI:

```
cordova plugin add https://github.com/reallyenglish/cordova-browser-media.git
```

## Development 

The development cycle will require cloning the repo and then installing plugman globally.
```
npm install plugman -g
```

Then add features/fixes as necessary. To test on an app, ensure you install / uninstall the plugin accordingly.

For example in our project, we uninstall the plugin and then re-install to acquire the latest features. After which we build and then run the browser platform using:
```
grunt --gruntfile=yeoman/Gruntfile.js devBuild && cordova run browser
```

### Gotchas

I've found that the latest version of plugman (0.22.17) doesn't respond correctly to CLI __install__ commands for the
__browser__ platform. I've fixed this for my immediate install.

If you need to do the same, please navigate to main.js and change LINE 44 to include the __browser__ platform:
```
var known_opts = { 'platform' : [ 'browser', 'ios', 'android', 'amazon-fireos', 'blackberry10', 'wp8' , 'windows8', 'firefoxos' ]
```

Find the location of your plugman install using:
```
type plugman
```

This will probably be fixed in upcoming releases.

### Installing plugin during development

Ensure you're outside the plugin's directory. Then issue:

```
plugman -d install --platform 'browser' --project rels-mobile --plugin cordova-browser-media --plugins_dir /path/to/rels-mobile/plugins
```

### Uninstalling plugin during development

```
plugman -d uninstall --platform 'browser' --project rels-mobile --plugin cordova-browser-media --plugins_dir /path/to/rels-mobile/plugins
```
