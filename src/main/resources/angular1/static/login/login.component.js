(function () {

class LoginController {
  constructor($state, $timeout, dataService) {
    this.$state = $state;
    this.dataService = dataService;
    this.$timeout = $timeout;
    this.server = 'http://slick.curtissimo.com:9000'
  }

  do() {
    this.dataService.login(this.name, this.server);
    this.error = 'Connecting...';
    this.$timeout(() => {
      if (this.dataService.isConnected) {
        this.$state.go('messaging.name', { userName: this.name, host: this.server });
      } else {
        this.dataService.logout();
        this.error = 'Cannot connect to that server.';
      }
    }, 1000);
  }
}

angular
  .module('app')
  .component('login', {
    controller: ['$state', '$timeout', 'dataService', (s, t, ds) => new LoginController(s, t, ds)],
    controllerAs: 'login',
    templateUrl: 'login/login.component.html'
  });

}());
