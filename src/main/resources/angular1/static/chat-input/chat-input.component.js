(function () {

class ChatInputController {
  constructor(dataService, $log) {
    this.dataService = dataService;
    this.$log = $log;
  }

  $onInit() {
    this.dataService.login(this.userName, this.host);
  }

  sendMessage() {
    this.dataService.sendMessage(this.message, this.userName);
    this.message = '';
  }
}

angular
  .module('app')
  .component('chatInput', {
    templateUrl: 'chat-input/chat-input.component.html',
    controllerAs: 'input',
    controller: ['dataService', '$log', (ds, l) => new ChatInputController(ds, l)],
    bindings: {
      userName: '@',
      host: '@'
    }
  });

}());
