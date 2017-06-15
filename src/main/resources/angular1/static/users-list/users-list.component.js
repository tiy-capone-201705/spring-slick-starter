(function () {

class UserListController {
  constructor(dataService) {
    this.dataService = dataService;
  }

  $onInit() {
    this.participants = this.dataService.participants;
    this.dataService.getInitialLoadOfParticipants();
  }
}

angular
  .module('app')
  .component('usersList', {
    templateUrl: 'users-list/users-list.component.html',
    controllerAs: 'list',
    controller: ['dataService', ds => new UserListController(ds)],
    bindings: {
      participants: '<',
      santaClaus: '<'
    }
  });

}());
