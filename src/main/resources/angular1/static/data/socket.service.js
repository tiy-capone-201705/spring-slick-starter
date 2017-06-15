(function () {

class SocketService {
  get isConnected() {
      return this.socket && this.socket.readyState === SockJS.OPEN && this.connected;
  }

  connect(server) {
    if (!this.socket) {
      this.socket = new SockJS('/ws');
    }
    if (!this.stomp) {
      this.stomp = { send() {} };
      let stomp = Stomp.over(this.socket);
      stomp.debug = () => {};
      stomp.connect({}, frame => {
    	    this.connected = true;
        this.stomp = stomp;
        stomp.subscribe('/topic/chats', chat => {
          let message = JSON.parse(chat.body);
          for (let listener of this.messageListeners) {
            listener(message);
          }
        });
        stomp.subscribe('/topic/joins', join => {
          let message = JSON.parse(join.body);
          for (let listener of this.joinListeners) {
            listener(message);
          }
        });
        stomp.subscribe('/topic/departures', departure => {
          let message = JSON.parse(departure.body);
          for (let listener of this.departureListeners) {
            listener(message);
          }
        });
      });
    }
  }

  disconnect() {
	this.connected = false;
    if (this.stomp) {
      this.stomp.disconnect(() => {
        this.messageListeners = [];
        this.joinListeners = [];
        this.departureListeners = [];
        if (this.socket) {
          this.socket.close();
          this.socket = null;
          this.stomp = null;
        }
      });
    }
  }

  addJoinListener(callback) {
    if (!this.joinListeners) {
      this.joinListeners = [];
    }
    this.joinListeners.push(callback);
  }

  addDepartureListener(callback) {
    if (!this.departureListeners) {
      this.departureListeners = [];
    }
    this.departureListeners.push(callback);
  }

  addMessageListener(callback) {
    if (!this.messageListeners) {
      this.messageListeners = [];
    }
    this.messageListeners.push(callback);
  }

  send(message) {
    if (this.stomp) {
	  this.stomp.send('/api/chat', {}, message);
    }
  }
}

angular
  .module('app')
  .factory('socketService', () => new SocketService());

}());
