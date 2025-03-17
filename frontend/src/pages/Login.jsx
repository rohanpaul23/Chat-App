import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import { css } from '@emotion/react'
import { shouldDisableSubmit } from "../utils";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserContext } from "../UserContexts";


const Login = () => {
  let navigate = useNavigate();
  const {setCurrentUser} = useUserContext();

  const validationSchema = yup.object({
    username: yup
      .string()
      .max(15, "Must be 15 characters or less")
      .required("Enter your user name"),
    password: yup
      .string()
      .max(20, "Must be 20 characters or less")
      .required("Enter your password"),
  });

  const loginUser = async (values) => {
    try {
      const result = await fetch('/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });
      const user = await result.json()
      localStorage.setItem("current-user", JSON.stringify(user));
      setCurrentUser(user)
      navigate("/home");

    }
    catch(e){
      console.log(e)
    }
  };

  return (
    <div css={css({
      display: "flex",
      flexDirection: "column",
      width: 400,
      background: "white",
      border: "1px solid #1976d2",
      borderRadius: 10
    })}>
      <h2 css={css({
              color: "#1976d2",
              fontWeight: "bold"
            })}>Log In</h2>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validateOnMount={true}
        validationSchema={validationSchema}
        onSubmit={loginUser}
        enableReinitialize={true}
      >
     {({ values,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        touched,
        errors
      }) => (
         <Form css={css({
          display : "flex",
          flexDirection: "column",
          gap:30,
          height: "100%",
         })}>
         <TextField
           css={css({
            margin: "0px 10px",
           })}
           id="outlined-controlled"
           label="User Name"
           value={values.username}
           error={touched.username && errors.username}
           helperText={touched.username && errors.username}
           onChange={(e) => {
             setFieldValue("username", e.target.value);
             setFieldTouched("username", true, false);
             // Third parameter of setFieldTouched is to skip validation of fields again
           }}
         />
          <TextField
           css={css({
            margin: "0px 10px",
           })}
           placeholder="Password"
           id="outlined-controlled"
           label="Password"
           value={values.password}
           error={touched.password && errors.password}
           helperText={touched.password && errors.password}
           onChange={(e) => {
             setFieldValue("password", e.target.value);
             setFieldTouched("password", true, false);
           }}
         />

            <Button
              css={css({
                margin: "10px 10px",
              })}
              variant="contained"
              disabled={shouldDisableSubmit(errors, touched)}
              onClick={handleSubmit}
            >
              Log In
            </Button>

            <Link to='/signup' css={css({
              display: "flex",
              justifyContent: "end",
              margin : 10,
              color: "#1976d2",
            })}>
						{"Don't have an account? Sign Up"}
					</Link>

            {/* <Link
              css={css({
                display: "flex",
                justifyContent: "end",
                margin: "10px 15px"
              })}
              component="button"
              variant="body2"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Don't have an account ? Sign Up
            </Link> */}
       </Form>
      )}
      </Formik>
      </div>
  );
};

export default Login;
