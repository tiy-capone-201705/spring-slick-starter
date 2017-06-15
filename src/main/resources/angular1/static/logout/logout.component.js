(function () {

class LogoutController {
  constructor(dataService, $document, $state) {
    this.dataService = dataService;
    this.$state = $state;
    this.$document = $document;
  }
  
  $onInit() {
    let body = this.$document.find('body');
    this.csrf = {
      parameterName: body.attr('data-csrf-parameter-name'),
      token: body.attr('data-csrf-token')
    };
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
    controller: ['dataService', '$document', '$state', (ds, d, s) => new LogoutController(ds, d, s)]
  });

}());
