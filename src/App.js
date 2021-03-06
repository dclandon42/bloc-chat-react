import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/user';
import './App.css';

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyBhtVa59rx03xYh9LuWiaaVpOy5pSz6H1U",
   authDomain: "bloc-chat-react-575f9.firebaseapp.com",
   databaseURL: "https://bloc-chat-react-575f9.firebaseio.com",
   projectId: "bloc-chat-react-575f9",
   storageBucket: "bloc-chat-react-575f9.appspot.com",
   messagingSenderId: "385327052033"
 };
 firebase.initializeApp(config);
  

  class App extends Component {
    constructor(props) {
      super(props);

      this.roomsRef = firebase.database().ref('rooms');

      this.state = {
        active: false,
        rooms: [],
        roomName: '',
        user: 'Guest',
        showForm: "display-none message-form"
      };
    }

    setActive(e) {
      this.setState({ active: e.key, showForm: "display-block message-form"});
      this.roomTitle(e.key);

    }

    roomTitle(key) {
      const activeRoomID = key;
      const activeRoom = this.state.rooms.filter(room => room.key === activeRoomID);
      this.setState({roomName: activeRoom[0].name });
    }

    setUser(e) {
      if (e === null) {
        this.setState({ user: 'Guest' })}
      else {
        this.setState({ user: e.displayName })
      }
    }

    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) });
      });
    };

    render() {
      return (
        <div className="App">
          <User
            firebase = {firebase}
            user = {this.state.user}
            setUser = {(e)=> this.setUser(e)}
            />
          <RoomList
            firebase = {firebase}
            setActive = {(e) => this.setActive(e)}
            active = {this.state.active}
          />
          <MessageList
            firebase = {firebase}
            active = {this.state.active}
            roomName = {this.state.roomName}
            user = {this.state.user}
            showForm = {this.state.showForm}
          />
        </div>
      );
    }
  }

  export default App;
