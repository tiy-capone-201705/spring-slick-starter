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
    console.log('inside login')
	if (body) {
	  this.name = body.attr('data-name') || null;
	  this.error = body.attr('data-error') || null;
      this.csrf = {
        parameterName: body.attr('data-csrf-parameter-name'),
        token: body.attr('data-csrf-token')
      };
	  if (this.name) {
        this.dataService.login(this.name, this.server);
        this.$state.go('messaging.justname', { userName: this.name });
	  }
	}	
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
