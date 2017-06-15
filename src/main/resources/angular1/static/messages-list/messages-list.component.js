(function () {

class MessagesListController {
  constructor(dataService, $log) {
    this.dataService = dataService;
    this.$log = $log;
	this.messages = [];
  }

  $onInit() {
	this.messages = this.dataService.messages;
    this.dataService.getInitialLoadOfMessages();
  }
}

angular
  .module('app')
  .component('messagesList', {
    templateUrl: 'messages-list/messages-list.component.html',
    controllerAs: 'list',
    controller: ['dataService', '$log', (ds, l) => new MessagesListController(ds, l)]
  });

}());
