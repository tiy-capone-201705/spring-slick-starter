(function () {

  class SideModalController {
    constructor() {}

    $onInit() {
      this.isOpen = false;
    }

    //set property as out or not out..no jQuery...
    //https://developer.mozilla.org/en-US/docs/Web/API/Animation
    //https://developer.mozilla.org/en-US/docs/Web/API/Animation

  }

  angular
    .module('app')
    .component('sideModal', {
      templateUrl: 'side-modal/side-modal.component.html',
      controllerAs: "side",
      controller: () => new SideModalController(),
      bindings: {
        participant: '<',
      }
    })
}());

// myModule.animation('.slide', [function() {
//   return {
//     enter: function(element, doneFn) {
//       jQuery(element).slideIn(1000, doneFn);
//     }
//   }
// }]);
