import React, { useCallback, useEffect, useMemo, useState } from "react";
import { css } from "@emotion/react";
import SearchBar from "./SearchBar";
import { useSocketContext } from "../../SocketContexts";

const Users = ({ selectedUser, setSelectedUser }) => {
  const [searchUser, setSearchUser] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { onlineUsers } = useSocketContext();

  const isUserOnline = useCallback(
    (userId) => {
      return onlineUsers?.includes(userId);
    },
    [onlineUsers]
  );

  useEffect(() => {
    fetch("/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json().then((res) => {
          console.log("users", res);
          setAllUsers(res);
          setFilteredUsers(res);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (searchUser !== "") {
      let searchedUsers = allUsers.filter((c) =>
        c.fullName.toLowerCase().includes(searchUser.toLowerCase())
      );
      setFilteredUsers(searchedUsers);
    } else {
      setFilteredUsers(allUsers);
    }
  }, [searchUser]);

  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "column",
        gap: 20,
        minWidth: 300,
        borderRight: "1px solid #1976d2",
      })}
    >
      <SearchBar setSearchUser={setSearchUser} />
      <div>
        {filteredUsers?.map((user,index) => {
          return ( 
            <div
              css={css({
                display: "flex",
                alignItems: "center",
                padding: 10,
                gap: 10,
                color: selectedUser?._id === user?._id ? "white" : "#1976d2",
                borderTop: index === 0 ? "1px solid  #1976d2" : "none",
                borderBottom: "1px solid #1976d2",
                background:
                  selectedUser?._id === user?._id ? "#1976d2" : "white",
                ":hover": {
                  background: "#68a5e1",
                  color: "white",
                },
              })}
              key={user._id}
              onClick={() => setSelectedUser(user)}
            >
              <div
                css={css({
                  position: "relative",
                })}
              >
                <img
                  css={css({
                    height: 50,
                    width: 50,
                  })}
                  src={user.profilePic}
                />
                {isUserOnline(user._id) && (
                  <div
                    css={css({
                      position: "absolute",
                      color: "green",
                      top: -5,
                      right: 0,
                    })}
                  >
                    ●
                  </div>
                )}
              </div>

              <div>{user.fullName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
