(function () {

angular
  .module('app')
  .config(['$stateProvider', '$urlServiceProvider', '$locationProvider', ($sp, $usp, $lp) => {
    const login = {
      name: 'login',
      url: '/login',
      views: {
        '': 'login',
        header: 'slickHeader'
      }
    };

    const messagingApp = {
      name: 'messaging',
      url: '/messaging',
      views: {
        '': 'messaging',
        header: 'slickHeader'
      }
    };

    const messaging = {
      name: 'messaging.name',
      url: '/{userName}/{host}',
      resolve: {
        userName: ['$stateParams', $sp => $sp.userName],
        host: ['$stateParams', $sp => $sp.host ]
      },
      views: {
        'top-left': 'usersList',
        'top-right': 'messagesList',
        'bottom-left': 'logout',
        'bottom-right': 'chatInput'
      }
    };

    const messaging2 = {
      name: 'messaging.justname',
      url: '/{userName}',
      resolve: {
        userName: ['$stateParams', $sp => $sp.userName]
      },
      views: {
        'top-left': 'usersList',
        'top-right': 'messagesList',
        'bottom-left': 'logout',
        'bottom-right': 'chatInput'
      }
    };

    $sp.state(login);
    $sp.state(messagingApp);
    $sp.state(messaging)
    $sp.state(messaging2)
    $usp.rules.initial('login');
    $lp.html5Mode(true) //turns URL into #!...# means url fragment (not sent to a server)...supposed to point to state within application 
  }]);

}());