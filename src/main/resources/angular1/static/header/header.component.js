(function () {

class HeaderController {
  constructor(dataService, $timeout) {
    this.$timeout = $timeout;
    this.dataService = dataService;
    this.getName();
  }

  getName() {
    this.userName = this.dataService.name;
    if (!this.userName) {
      this.$timeout(this.getName.bind(this), 100);
    }
  }
}

angular
  .module('app')
  .component('slickHeader', {
    templateUrl: 'header/header.component.html',
    controllerAs: 'header',
    controller: ['dataService', '$timeout', (ds, t) => new HeaderController(ds, t)]
  });

}());