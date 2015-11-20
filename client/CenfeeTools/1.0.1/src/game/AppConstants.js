/**
 * @author Mike Britton
 *
 * @class AppConstants
 * @link https://github.com/PureMVC/puremvc-js-demo-todomvc.git
 *
 * Define the core and notification constants.
 * 
 * PureMVC JS is multi-core, meaning you may have multiple,
 * named and isolated PureMVC cores. This app only has one.
 */
puremvc.define({ name: 'game.AppConstants' },{}, {
        // The multiton key for this app's single core
        CORE_NAME:                'MyGame',
        
        // Notifications 
        STARTUP:                  'startup'

    }
);
