import React, { useState } from 'react'
import { useUserContext } from "../../UserContexts";
import { css } from "@emotion/react";
import Users from './Users';
import ChatWindow from './ChatWindow';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router";


const Home = () => {
  const {currentUser,setCurrentUser} = useUserContext();
  const [selectedUser,setSelectedUser] = useState()
  let navigate = useNavigate();

  console.log("currentUse home",currentUser)

  const logout = async () => {
		try {
			const res = await fetch("/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.removeItem("current-user");
			setCurrentUser(null);
      navigate("/login");
		}
    catch(e){
      console.log(e)
    }
	};
  return (
    <div css={css({
      display : "flex",
      flexDirection : "column"
    })}>
    <div css={css({
      color : "#1976d2",
      border : "1px solid #1976d2",
      display:"flex",
      justifyContent:"space-between",
      padding : 10
    })}>
      <div css={css({
        fontWeight : 700,
        fontSize : 22
      })}>Chat App</div>
      <LogoutIcon css={css({
            color : "#1976d2 !important"
          })} onClick={(e)=> logout()}/>
    </div>
    <div css={css({
      display : "flex",
      border : "1px solid #1976d2"
    })}>
      <Users selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      <ChatWindow selectedUser={selectedUser} />
    </div>
    </div>
  )
}

export default Home
