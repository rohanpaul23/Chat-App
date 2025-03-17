import React, { useState } from 'react'
import { TextField } from "@mui/material";
import { css } from "@emotion/react";

const SearchBar = ({setSearchUser}) => {
 const inputBox = css`
   width : 100%;
    height: 40px;
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
