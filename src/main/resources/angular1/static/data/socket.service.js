(function () {

class SocketService {
  get isConnected() {
      return this.socket && this.socket.readyState === SockJS.OPEN;
  }

  connect(server) {
    if (!this.socket) {
      this.socket = new SockJS('/ws');
    }
    if (!this.stomp) {
      this.stomp = { send() {} };
      let stomp = Stomp.over(this.socket);
      stomp.connect({}, frame => {
        this.stomp = stomp;
        this.chatSubscription = stomp.subscribe('/topic/chats', chat => {
          console.log(chat);
          let message = chat.body;
          for (let listener of this.messageListeners) {
            listener({ id: null, msg: message });
          }
        });
        this.joinSubscription = stomp.subscribe('/topic/joins', join => {
          let message = chat.body;
          for (let listener of this.joinListeners) {
            listener(message);
          }
        });
        this.departureSubscription = stomp.subscribe('/topic/departures', departure => {
          let message = departure.body;
          for (let listener of this.departureListeners) {
            listener(message);
          }
        });
      });
    }
  }

  disconnect() {
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
