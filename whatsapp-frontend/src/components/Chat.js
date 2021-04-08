import React from 'react'
import "./Chat.css"
import { Avatar, IconButton } from "@material-ui/core"
import SearchOutLinedIcon from "@material-ui/icons/SearchOutlined"
import AttachFileIcon from "@material-ui/icons/AttachFile"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import axios from "../axios"
import {useState} from "react"

function Chat({messages}) {
    const [input, setInput] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();

        axios.post('/messages/new', {
            message: input,
            name: "Demo",
            timestamp: new Date().toUTCString(),
            sender: true
        })

        setInput("");
    }

    return <div className="chat">
        <div className="chat_header">
            <Avatar/>
            <div className="chat_headerInfo">
                <h3>Room name</h3>
                <p>Last seen at...</p>
            </div>

            <div className="chat_headerRight">
                <IconButton>
                    <SearchOutLinedIcon/>
                </IconButton>
                <IconButton>
                    <AttachFileIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>

        <div className="chat_body">
            <p className="chat_message">
                <span className="userName">Cristiano Ronaldo</span>
                Hello Thinh !!!
                <span className="chat_timestamp">
                    {new Date().toUTCString()}
                </span>
            </p>

            <p className="chat_message">
                <span className="userName">Thinh Phan</span>
                Hello idol !!!
                <span className="chat_timestamp">
                    {new Date().toUTCString()}
                </span>
            </p>

            {messages.map(message => (
                <p className={`chat_message ${message.name === "Demo" && "sender"}`}>
                <span className="userName">{message.name}</span>
                {message.message}
                <span className="chat_timestamp">
                    {message.timestamp}
                </span>
            </p>
            ))}
            
           {/* <video 
                className="video"
                controls
                type="video/webm"
                src="highlight.webm"/> */}

        </div>

        <div className="chat_footer">
            <IconButton>
                <InsertEmoticonIcon/>
            </IconButton>
            <form>
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a Message" type="text"></input>
                <button onClick={sendMessage} type="submit">Send a Message</button>
            </form>
            <IconButton>
                <MicIcon/>
            </IconButton>
        </div>
    </div>
}

export default Chat
