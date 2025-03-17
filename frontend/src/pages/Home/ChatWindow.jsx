import React, { useEffect, useState } from 'react'
import { css } from "@emotion/react";
import { useUserContext } from "../../UserContexts";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import WavingHandIcon from '@mui/icons-material/WavingHand';

const ChatWindow = ({selectedUser}) => {
  const [messages,setMessages] = useState([])
  const [currentInputMessage,setCurrentInputMessage] = useState()
  console.log("selectedUser",selectedUser)

  const {currentUser} = useUserContext();

  console.log("currentUser chatwindow",currentUser)

  useEffect(()=>{
    if(selectedUser){
      fetch(`/getmessage/${selectedUser?._id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res)=>{
            res.json().then((res)=>{
              console.log("messages",res)
              setMessages(res)
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
  margin-bottom: 10px;
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
     background : #1976d2;
     border: none;
     border-radius: 10px;

     :focus {
      outline : none;
     }
     ::-webkit-input-placeholder {
        color: white;
    } 
  `

  return (
    <>
    {selectedUser === undefined ? (
             <div  css={css({
              minWidth: 500,
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
          minWidth: 500,
          display:"flex",
          flexDirection : "column",
          margin: 10,
          color: "#1976d2 !important"
      })}>
        <h3 css={css({
          display: "flex",
          flex : 1,
          borderBottom: "1px solid black",
          padding: "0px 10px"
        })}>{`To ${selectedUser?.fullName}`}</h3>
        <div css={css({
          flex : 10,
          overflowY: "scroll",
          color : "green",
          margin: "0px 10px"
        })}>
          {messages.map((msg)=>{
            return <div css={css({
              display : "flex",
              justifyContent : msg.senderId === currentUser._id ? "flex-end" : "flex-start"
            })}>
            <div css={chatBubble}>
                {msg.message}
                <div css={msg?.senderId === currentUser?._id ? bubbleRight : bubbleLeft}></div>
              </div>  
              </div>          
          })}
        </div>
        <div css={css({
          flex : 1,
          position : "relative"
        })}>
          <input type='text-box' css={inputBox}
          placeholder='Send Message'
          onChange={(e)=>setCurrentInputMessage(e.target.value)}
          >
          </input>
          <SendRoundedIcon css={css({
            position : "absolute",
            right: 5,
            top: 5,
            color : "white !important"
          })}/>
        </div>
      </div>
      )
    }
    </>
  )
}

export default ChatWindow
