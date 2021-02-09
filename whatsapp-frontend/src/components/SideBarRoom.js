import React from 'react'
import "./SideBarRoom.css"
import { Avatar } from "@material-ui/core"

function SideBarRoom() {
    return <div className="sidebarRoom">
        <Avatar/>

        <div className="sidebarRoom_info">
            <h2> Room Name</h2>
            <p> last messages...</p>

        </div>
    </div>
}

export default SideBarRoom
