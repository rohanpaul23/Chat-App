import React, { useState } from 'react'
import { useUserContext } from "../../UserContexts";
import { css } from "@emotion/react";
import Users from './Users';
import ChatWindow from './ChatWindow';


const Home = () => {
  const {currentUser} = useUserContext();
  const [selectedUser,setSelectedUser] = useState()

  console.log("currentUse home",currentUser)

  return (
    <div css={css({
      display : "flex",
      border : "1px solid #1976d2"
    })}>
      <Users selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      <ChatWindow selectedUser={selectedUser} />
    </div>
  )
}

export default Home
