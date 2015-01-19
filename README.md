# cordova-browser-media

To install this plugin ensure plugman is installed globally
```
npm install plugman -g
```

and then clone the repo.

## Things to note

I've found that the recent version of plugman doesn't respond correctly to CLI __install__ commands for the
__browser__ platform. I've fixed this for my immediate install.

If you need to do the same, please navigate to main.js and change LINE 44 to include the __browser__ platform:
```
var known_opts = { 'platform' : [ 'browser', 'ios', 'android', 'amazon-fireos', 'blackberry10', 'wp8' , 'windows8', 'firefoxos' ]
```

Find the location of your plugman install using:
```
type plugman
```

I'm hoping this will just work now that plugin is hosted on github. Still investigating.

## Development

Add functionality to plugin and then install / uninstall (to mirror latest updates) accordingly.

To get the latest functionality after installing the plugin to the project:
```
grunt --gruntfile=yeoman/Gruntfile.js devBuild && cordova run browser
```

This will ensure the latest files are copied correctly.

### Installing plugin during development

Ensure you're outside the plugin's directory. Then issue:

```
plugman -d install --platform 'browser' --project rels-mobile --plugin cordova-browser-media --plugins_dir /path/to/rels-mobile/plugins
```

### Uninstalling plugin during development

```
plugman -d uninstall --platform 'browser' --project rels-mobile --plugin cordova-browser-media --plugins_dir /path/to/rels-mobile/plugins
```