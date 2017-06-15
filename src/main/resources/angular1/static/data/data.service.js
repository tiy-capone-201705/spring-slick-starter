(function () {

const nameSym = Symbol();

class DataService {
  constructor(socketService, $log, $rootScope) {
    this.socketService = socketService;
    this.$log = $log;
    this.$rootScope = $rootScope;
    this.participants = [];
    this.messages = [];
  }

  get isConnected() {
    return this.socketService.isConnected;
  }

  get name() {
    return this[nameSym];
  }

  login(name, server) {
    if (!this.socketService.isConnected) {
      this[nameSym] = name;
      const joined = this.joined.bind(this);
      const messaged = this.messaged.bind(this);
      const left = this.left.bind(this);

      this.socketService.connect(server);
      this.socketService.addMessageListener(messaged);
      this.socketService.addDepartureListener(left);
    }
  }

  sendMessage(message, name) {
    if (this.socketService) {
      this.socketService.send(message);
    }
  }

  logout() {
    if (this.socketService) {
      this.socketService.disconnect();
    }
    this[nameSym] = '';
    this.participants = [];
    this.messages = [];
  }

  joined(id) {
    this.$log.info('user joined:', id);
    const participant = this.participants.find(p => p.id === id);
    if (!participant) {
      this.participants.push({ id });
      this.$rootScope.$apply();
    }
  }

  messaged({id, msg}) {
    this.$log.info('message from', id, msg);
    this.messages.unshift({ participant: '', text: msg, when: new Date() });
    this.$rootScope.$apply();
  }

  left(id) {
    const index = this.participants.findIndex(p => p.id === id);
    this.$log.info('removing user', id, index);
    if (index >= 0) {
      this.participants.splice(index, 1);
      this.$rootScope.$apply();
    }
  }
}

angular
  .module('app')
  .factory('dataService', ['socketService', '$log', '$rootScope', (s, l, rs) => new DataService(s, l, rs)]);

}());
