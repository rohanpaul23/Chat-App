import React, { useState } from 'react'
import { TextField } from "@mui/material";
import { css } from "@emotion/react";

const SearchBar = ({setSearchUser}) => {
 const inputBox = css`
    height: 35px;
    box-sizing : border-box;
     background : #84b6e7;
     border: none;
     border-radius: 10px;
     margin: 5px;

     :focus {
      outline : none;
     }
     ::-webkit-input-placeholder {
        color: white;
    } 
  `

	return (
       <input 
       css={inputBox}
       type='text-box'
              placeholder='Search User'
              onChange={(e)=>setSearchUser(e.target.value)}
              >
              </input>
	);
}

export default SearchBar
