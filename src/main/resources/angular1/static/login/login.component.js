(function () {

class LoginController {
  constructor($document, $state, $timeout, dataService) {
    this.$state = $state;
    this.dataService = dataService;
    this.$timeout = $timeout;
    this.server = 'http://localhost:5000';
    this.$document = $document;
  }
  
  $onInit() {
    let body = this.$document.find('body');
	if (body) {
	  this.name = body.attr('data-name') || null;
      this.csrf = {
        parameterName: body.attr('data-csrf-parameter-name'),
        token: body.attr('data-csrf-token')
      };
	  if (this.name) {
        this.dataService.login(this.name, this.server);
        this.$state.go('messaging.name', { userName: this.name, host: this.server });
	  }
	}	
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
    controller: ['$document', '$state', '$timeout', 'dataService', (d, s, t, ds) => new LoginController(d, s, t, ds)],
    controllerAs: 'login',
    templateUrl: 'login/login.component.html'
  });

}());
