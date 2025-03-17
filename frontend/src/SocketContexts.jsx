import React, { createContext, useContext, useState,useEffect } from 'react'
import { Socket } from 'socket.io-client';
import { useUserContext } from './UserContexts';
import io from "socket.io-client";


export const SocketConext = createContext();

export const useSocketContext = ()=>{
    return useContext(SocketConext)
}

const SocketContextProvider = ({children}) => {
  const [socket,setSocket] =  useState();
  const [onlineUsers,setOnlineUsers] = useState();

  const { currentUser } = useUserContext();

  useEffect(() => {
      if (currentUser) {
          const socket = io("http://localhost:8000", {
              query: {
                  userId: currentUser._id,
              },
          });

          setSocket(socket);

          // socket.on() is used to listen to the events. can be used both on client and server side
          socket.on("getOnlineUsers", (users) => {
              setOnlineUsers(users);
          });

          return () => socket.close();
      } else {
          if (socket) {
              socket.close();
              setSocket(null);
          }
      }
  }, [currentUser]);
  return (
    <SocketConext.Provider value={{
        socket,
        onlineUsers,
    }}>
        {children}
    </SocketConext.Provider>
  )
}

export default SocketContextProvider
