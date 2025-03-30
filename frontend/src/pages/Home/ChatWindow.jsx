import React, { useEffect, useState } from 'react'
import { css } from "@emotion/react";
import { useUserContext } from "../../UserContexts";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import {produce} from "immer"
import { useSocketContext } from '../../SocketContexts';
import { formatTime } from '../../utils';
import CircularProgress from '@mui/material/CircularProgress';
import notificationSound from "../../assets/notification.mp3"



const ChatWindow = ({selectedUser}) => {
  const [messages,setMessages] = useState([])
  const [currentInputMessage,setCurrentInputMessage] = useState("")

  const [loadingMessages,setLoadingMessages] = useState(false)

  const {socket} = useSocketContext();

  const {currentUser} = useUserContext();


  useEffect(()=>{
    if(selectedUser){
      setLoadingMessages(true)
      fetch(`/getmessage/${selectedUser?._id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res)=>{
            res.json().then((res)=>{
              setMessages(res)
              setLoadingMessages(false)
            })
      })
      .catch(e=>{
        console.log(e)
      })
    }
     
    },[selectedUser])

  const chatBubble = css`
  position: relative;
    font-family: sans-serif;
  font-size: 14px;
  line-height: 24px;
  width: 100px;
  background: #1976d2;
  color: white !important; 
  border-radius: 40px;
  padding: 5px;
  color: #000;
  margin-bottom: 20px;
  `
  
  const bubbleLeft = css`
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-right: 14px solid transparent;
    border-top: 8px solid #1976d2;
    border-bottom: 11px solid transparent;
    left: 12px;
    bottom: -18px;
  `

  const bubbleRight = css`
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 14px solid transparent;
    border-right: 0px solid transparent;
    border-top: 8px solid #1976d2;
    border-bottom: 11px solid transparent;
    bottom: -18px;
    right: 12px;
  `
  const inputBox = css`
     height: 100%;
     width: 100%;
     box-sizing : border-box; 
     background : #84b6e7;
     border: none;
     border-radius: 10px;

     :focus {
      outline : none;
     }
     ::-webkit-input-placeholder {
        color: white;
    } 
  `

  const timeLeft = css `
     position: absolute;
     left : 25px;
     color: #84b6e7 !important;
  `


  const timeRight = css `
     position: absolute;
     right : 25px;
     color: #84b6e7 !important;
  `

  const sendMessage = async () => {
		try {
			const res = await fetch(`/send/${selectedUser?._id}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInputMessage,
        }),
			});
			const data = await res.json();
      setMessages([...messages, data]);
			if (data.error) {
				throw new Error(data.error);
			}
      setCurrentInputMessage("")
		}
    catch(e){
      console.log(e)
    }
	};

  const onEnter = (e)=>{
    if(e.keyCode === 13){
      sendMessage()
    }
  }


  socket?.on("newMessage", (newMessage) => {
    const sound = new Audio(notificationSound);
    sound.play();
    setMessages([...messages, newMessage]);
  });

  return (
    <>
    {selectedUser === undefined ? (
             <div  css={css({
              minWidth: 530,
              display: 'flex',
              justifyContent: "center",
              alignItems: "center",
              color: '#1976d2 !important',
              flexDirection : "column"
            })}>
              <div css={css({
                display : "flex",
                flexDirection : "row",
                gap:10,
                alignItems : "center",
                fontSize: 30
              })}>
              {`Welcome ${currentUser.fullName}`}<WavingHandIcon
                  css={css({
                    color: '#1976d2 !important',
                  })}
                />
              </div>
              <div>Please select any user to start chatting</div>
            </div>
    ) :
      (
        <div css={css({
          minWidth: 530,
          display:"flex",
          flexDirection : "column",
          color: "#1976d2 !important"
      })}>
        <h3 css={css({
          display: "flex",
          flex : 1,
          borderBottom: "1px solid #1976d2  ",
          padding: "0px 10px"
        })}>{`To ${selectedUser?.fullName}`}</h3>
        <div css={css({
          flex : 10,
          overflowY: "scroll",
          color : "green",
          margin: "0px 10px",
          maxHeight: 500
        })}>
          {loadingMessages && <CircularProgress/>}
          {messages.map((msg)=>{
            return <div css={css({
              display : "flex",
              justifyContent : msg.senderId === currentUser?._id ? "flex-end" : "flex-start"
            })}
            key={msg._id}
            >
            <div css={chatBubble}>
                {msg.message}
                <div css={msg?.senderId === currentUser?._id ? bubbleRight : bubbleLeft}></div>
                <div css={msg?.senderId === currentUser?._id ? timeRight : timeLeft}>{formatTime(msg.createdAt)}</div> 
              </div> 
            </div>          
          })}
        </div>
        <div css={css({
          flex : 1,
          position : "relative",
          margin: 5
        })}>
          <input type='text-box' css={inputBox}
          placeholder='Send Message'
          value={currentInputMessage}
          onChange={(e)=>setCurrentInputMessage(e.target.value)}
          onKeyDown={(e)=>onEnter(e)}
          >
          </input>
          <SendRoundedIcon css={css({
            position : "absolute",
            right: 5,
            top: 10,
            color : "white !important"
          })} onClick={()=>sendMessage()}/>
        </div>
      </div>
      )
    }
    </>
  )
}

export default ChatWindow
