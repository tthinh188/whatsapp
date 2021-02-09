import React from 'react'
import "./SideBar.css"
import SideBarRoom from "./SideBarRoom"

import { Avatar, IconButton } from "@material-ui/core"

import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import SearchOutLinedIcon from "@material-ui/icons/SearchOutlined"

function SideBar() {
    return <div className="sidebar">
        <div className="sidebar_header">
            <Avatar
                className="avatar"
                src="profile.jpg"
            />
            <p>Thinh Phan</p>
            <div className="sidebar_headerRight">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>

        <div className="sidebar_search">
            <div className="sidebar_searchContainer">
                <SearchOutLinedIcon />
                <input
                    placeholder="Search or start new chat"
                    type="text" />
            </div>
        </div>
        
        <div className="sidebar_rooms">
            <h2 className="addChatRoom"> Add new Chat</h2>
            <SideBarRoom/>
            <SideBarRoom/>
            <SideBarRoom/>

        </div>
    </div>

}

export default SideBar
