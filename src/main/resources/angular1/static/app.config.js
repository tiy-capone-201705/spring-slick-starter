(function () {

angular
  .module('app')
  .config(['$stateProvider', '$urlServiceProvider', ($sp, $usp) => {
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

    $sp.state(login);
    $sp.state(messagingApp);
    $sp.state(messaging)
    $usp.rules.initial('login');
  }]);

}());