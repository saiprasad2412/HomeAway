import { useContext, useState } from "react";
import "./Chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import {format}from "timeago.js"

function Chat({chats}) {
  const [chat, setChat] = useState(null);
  const {currentUser} = useContext(AuthContext);

  const handleOpenChat = async(id, receiver) => {
    try {
      const res= await apiRequest("/chats/"+id);
      console.log(res.data);
      setChat({...res.data, receiver});
    } catch (error) {
      console.log(error);

    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text= formData.get("text");
    if(!text) return;
    try { 
      const res = await apiRequest.post("/messages/"+ chat.chat.id, { text});
      console.log(res.data);
      setChat((prev) => ({ ...prev, messages: [{...prev.messages}, res.data] }));
      e.target.reset();
    }
    catch(error) {
      console.log(error);
    }
  }

  
  return (
    <div className="chat">
      <div className="messages">
        {console.log(chats)}
        <h1>Messages</h1>
        {chats.map((c) => (
          <div className="message" key={c.id} style={{
            backgroundColor:c.seenBy.includes(currentUser.id)
            ?"white"
            :"#fecd514e"
          }}
          onClick={()=>handleOpenChat(c.id, c.receiver)}
          >
          <img
            src={c.receiver.avatar || "/noavatar.jpg"}
            alt=""
          />
          <span>{c.receiver.username}</span>
          <p>{c.lastMessage}</p>
        </div>
        ))}
        
      </div>


      {chat && (

        <div className="chatBox">
          {console.log(chat)}
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver.avatar || "/noavatar.jpg"}
                alt=""
              />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={()=>setChat(null)}>X</span>
          </div>
          <div className="center">
            {chat.chat.messages.map((message) => (
              <div className="chatMessage" style={{
                alignSelf:message.userId==currentUser.id?"flex-end":"flex-start",
                textAlign:message.userId==currentUser.id?"right":"left"
              }} key={message.id}>
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>

            ))}
            
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;