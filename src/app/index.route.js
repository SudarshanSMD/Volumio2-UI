function routerConfig ($stateProvider, $urlRouterProvider, $locationProvider, themeManagerProvider) {
  'ngInject';
  console.info('[TEME]: ' + themeManagerProvider.theme, '[VARIANT]: ' + themeManagerProvider.variant);

  $locationProvider.html5Mode(true);
  $stateProvider
    .state('volumio', {
      url: '/',
      abstract: true,
      views: {
        'layout': {
          templateUrl: themeManagerProvider.getHtmlPath('layout'),
          controller: 'LayoutController',
          controllerAs: 'layout'
        },
        'header@volumio': {
          templateUrl: themeManagerProvider.getHtmlPath('header'),
          controller: 'HeaderController',
          controllerAs: 'header'
        },
        'footer@volumio': {
          templateUrl: themeManagerProvider.getHtmlPath('footer'),
          controller: 'FooterController',
          controllerAs: 'footer'
        }
      },
      resolve: {
        //NOTE this resolver init also global services like toast
        socketResolver: (socketService, ripperService, modalListenerService, myVolumioService,
            toastMessageService, uiSettingsService, updaterService, isUiInCloud, $state) => {

          if (isUiInCloud) {
            // Check if the user is logged
            if (myVolumioService.isLogged) {
              return socketService.initMyVolumio();
            } else {
              // Redirect to My volumio custom plugin page
              uiSettingsService.setLanguage();
              if (!~window.location.href.indexOf('plugin/my-volumio-welcome')) {
                window.location.href = 'plugin/my-volumio-welcome';
              }
            }
          } else {
            return socketService.initVolumio();
          }
        }
      }
    })

    .state('volumio.browse', {
      url: 'browse',
      views: {
        'content@volumio': {
          templateUrl: themeManagerProvider.getHtmlPath('browse'),
          controller: 'BrowseController',
          controllerAs: 'browse'
        }
      }
    })

    .state('volumio.play-queue', {
      url: 'queue',
      views: {
        'content@volumio': {
          templateUrl: themeManagerProvider.getHtmlPath('play-queue'),
          controller: 'PlayQueueController',
          controllerAs: 'playQueue'
        }
      }
    })

    .state('volumio.playback', {
      url: 'playback',
      views: {
        'content@volumio': {
          templateUrl: themeManagerProvider.getHtmlPath('playback'),
          controller: 'PlaybackController',
          controllerAs: 'playback'
        }
      }
    })

    .state('volumio.debug', {
      url: 'debug',
      views: {
        'content@volumio': {
          templateUrl: 'app/components/debug/volumio-debug.html',
          controller: 'DebugController',
          controllerAs: 'debug'
        }
      }
    })

    .state('volumio.multi-room', {
      url: 'multi-room',
      views: {
        'content@volumio': {
          templateUrl: 'app/themes/axiom/multi-room-manager/axiom-multi-room-manager.html',
          controller: 'MultiRoomManagerController',
          controllerAs: 'multiRoomManager'
        }
      }
    })

    .state('volumio.my-volumio-welcome', {
      url: 'plugin/my-volumio-welcome',
      params: {
        isPluginSettings: null,
        myVolumioPlugin: true
      },
      views: {
        'content@volumio': {
          templateUrl: 'app/plugin/plugin.html',
          controller: 'PluginController',
          controllerAs: 'plugin'
        }
      }
    })

    .state('volumio.plugin', {
      url: 'plugin/:pluginName',
      params: {isPluginSettings: null},
      views: {
        'content@volumio': {
          templateUrl: 'app/plugin/plugin.html',
          controller: 'PluginController',
          controllerAs: 'plugin'
        }
      }
    })

    .state('volumio.plugin-manager', {
      url: 'plugin-manager',
      views: {
        'content@volumio': {
          templateUrl: 'app/plugin-manager/plugin-manager.html',
          controller: 'PluginManagerController',
          controllerAs: 'pluginManager'
        }
      }
    })

    .state('volumio.static-page', {
      url: 'static-page/:pageName',
      views: {
        'content@volumio': {
          templateUrl: 'app/static-pages/static-page.html',
          controller: 'StaticPageController',
          controllerAs: 'staticPage'
        }
      }
    });

  $urlRouterProvider.otherwise('/playback');
}

export default routerConfig;
