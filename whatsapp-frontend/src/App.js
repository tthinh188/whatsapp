import './App.css';
import SideBar from "./components/SideBar"
import Chat from "./components/Chat"
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./axios"

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('messages/sync')
    .then(response => {
      setMessages(response.data);
    });
  }, [])

  useEffect(() =>{
    const pusher = new Pusher('855fdfb3f2c5722bc233', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  return (
    <div className="app">
      <div className="app_body">
        <SideBar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
