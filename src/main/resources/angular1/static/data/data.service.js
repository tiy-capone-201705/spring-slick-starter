(function () {

const nameSym = Symbol();

class DataService {
  constructor(socketService, $timeout, $log, $rootScope, $http) {
    this.socketService = socketService;
    this.$timeout = $timeout;
    this.$log = $log;
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.participants = [];
    this.messages = [];
  }

  get isConnected() {
    return this.socketService.isConnected;
  }

  get name() {
    return this[nameSym];
  }
  
  getInitialLoadOfParticipants() {
	if (!this.isConnected) {
      return this.$timeout(() => this.getInitialLoadOfParticipants(), 100);
	}
    return this.$http
      .get('/api/active-users')
      .then(response => response.data)
      .then(participants => {
        for (let participant of participants) {
          this.participants.unshift({
        	  	id: participant.id,
        	  	name: participant.nickName
          });
        }
      });
  }
  
  getInitialLoadOfMessages() {
    return this.$http
      .get('/api/messages')
      .then(response => response.data)
      .then(messages => {
        for (let message of messages) {
          this.messages.unshift({
            participant: { name: message.author.nickName, id: message.author.id },
            text: message.content,
            when: new Date(message.sentOn),
            id: message.id
          });
        }
      });
  }

  login(name, server) {
    if (!this.socketService.isConnected) {
      this[nameSym] = name;
      const joined = this.joined.bind(this);
      const messaged = this.messaged.bind(this);
      const left = this.left.bind(this);

      this.socketService.connect(server);
      this.socketService.addMessageListener(messaged);
      this.socketService.addJoinListener(joined);
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

  joined(person) {
    this.$log.info('user joined:', person);
    person.name = person.nickName;
    const participant = this.participants.find(p => p.id === person.id);
    if (!participant) {
      this.participants.push(person);
      this.$rootScope.$apply();
    }
  }

  messaged(message) {
    this.$log.info('message:',message);
    this.messages.unshift({
      participant: { name: message.author.nickName, id: message.author.id },
      text: message.content,
      when: new Date(message.sentOn),
      id: message.id
    });
    this.$rootScope.$apply();
  }

  left(participant) {
    const index = this.participants.findIndex(p => p.id === participant.id);
    this.$log.info('removing user', participant, index);
    if (index >= 0) {
      this.participants.splice(index, 1);
      this.$rootScope.$apply();
    }
  }
}

angular
  .module('app')
  .factory('dataService', ['socketService', '$timeout', '$log', '$rootScope', '$http', (s, t, l, rs, h) => new DataService(s, t, l, rs, h)]);

}());
