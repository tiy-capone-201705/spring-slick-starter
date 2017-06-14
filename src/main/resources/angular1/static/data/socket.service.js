(function () {

class SocketService {
  get isConnected() {
    return this.socket && this.socket.connected;
  }

  connect(server) {
    if (!this.socket && server) {
      this.socket = io.connect(server);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  addEventListener(name, callback) {
    if (this.socket) {
      this.socket.on(name, callback);
    }
  }

  send(name, message) {
    if (this.socket) {
      this.socket.emit(name, message);
    }
  }
}

angular
  .module('app')
  .factory('socketService', () => new SocketService());

}());