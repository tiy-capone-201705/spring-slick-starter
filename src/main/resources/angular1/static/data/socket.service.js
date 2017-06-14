(function () {

class SocketService {
  get isConnected() {
    return this.socket && this.socket.connected;
  }

  connect(server) {
    if (!this.socket) {
    		this.socket = new SockJS('/ws');
    }
    if (!this.stomp) {
    		this.stomp = Stomp.over(this.socket);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.stomp = null;
    }
  }

  addEventListener(name, callback) {
    if (this.socket) {
      this.socket.on(name, callback);
    }
  }

  send(name, message) {
    if (this.stomp) {
    		this.stomp.send('/api/chat', {}, message);
    }
  }
}

angular
  .module('app')
  .factory('socketService', () => new SocketService());

}());