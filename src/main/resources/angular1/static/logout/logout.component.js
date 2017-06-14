(function () {

class LogoutController {
  constructor(dataService, $state) {
    this.dataService = dataService;
    this.$state = $state;
  }

  do() {
    this.dataService.logout();
    this.$state.go('login');
  }
}

angular
  .module('app')
  .component('logout', {
    templateUrl: 'logout/logout.component.html',
    controllerAs: 'logout',
    controller: ['dataService', '$state', (ds, s) => new LogoutController(ds, s)]
  });

}());
