import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { css } from "@emotion/react";
import { Alert, Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import { shouldDisableSubmit } from "../utils";
import { useNavigate } from "react-router";
import { useUserContext } from "../UserContexts";

const SignUp = () => {
  let navigate = useNavigate();
  const {setCurrentUser} = useUserContext();

  const validationSchema = yup.object({
    fullName: yup
      .string()
      .max(15, "Full name must be less than 20 characters")
      .required("Enter your full name"),
    username: yup
      .string()
      .max(15, "Full name must be less than 20 characters")
      .required("Enter username"),
    password: yup
      .string()
      .max(20, "Password must be less than 15 characters ")
      .required("Enter password"),
    confirmPassword: yup
      .string()
      .max(20, "Password must be less than 15 characters")
      .required("Enter your password to confirm "),
    gender: yup.string().required("Select gender"),
  });

  const signUpUser = async (values) => {
    try {
     const result = await fetch('/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         fullName: values.fullName,
         username: values.username,
         password: values.password,
         confirmPassword: values.confirmPassword,
         gender: values.gender
        }),
      });
      const user = await result.json();
      localStorage.setItem("current-user", JSON.stringify(user));
      setCurrentUser(user)
      navigate("/home");
    }
    catch(e){
      console.log("e",e)
    }  
   };
 

  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "column",
        width: 400,
        background: "white",
        border: "1px solid #1976d2",
        borderRadius: 10
      })}
    >
      <h2 css={css({
        color: "#1976d2",
        fontWeight: "bold"
      })}>Sign Up</h2>
      <Formik
        initialValues={{
          fullName: "",
          username: "",
          password: "",
          confirmPassword: "",
          gender: "",
        }}
        validateOnMount={true}
        validationSchema={validationSchema}
        onSubmit={signUpUser}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          handleSubmit,
          setFieldTouched,
          setFieldValue,
          touched,
        }) => (
          <Form
            css={css({
              display: "flex",
              flexDirection: "column",
              gap: 10,
              height: "100%",
            })}
          >
            <Alert
              css={css({
                margin: "0px 10px",
              })}
              severity="info"
            >
              Please enter all the fields to sign up
            </Alert>
            <TextField
              css={css({
                margin: "0px 10px",
              })}
              label="Full Name"
              value={values.fullName}
              error={touched.fullName && errors.fullName}
              helperText={touched.fullName && errors.fullName}
              onChange={(e) => {
                setFieldValue("fullName", e.target.value);
                setFieldTouched("fullName", true, false);
              }}
            />
            <TextField
              css={css({
                margin: "0px 10px",
              })}
              label="User Name"
              value={values.username}
              error={touched.username && errors.username}
              helperText={touched.username && errors.username}
              onChange={(e) => {
                setFieldValue("username", e.target.value);
                setFieldTouched("username", true, false);
              }}
            />
            <TextField
              css={css({
                margin: "0px 10px",
              })}
              placeholder="Password"
              label="Password"
              value={values.password}
              error={touched.password && errors.password}
              helperText={touched.password && errors.password}
              onChange={(e) => {
                setFieldValue("password", e.target.value);
                setFieldTouched("password", true, false);
              }}
            />
            <TextField
              css={css({
                margin: "0px 10px",
              })}
              placeholder="Password"
              label="Confirm Password"
              error={touched.confirmPassword && errors.confirmPassword}
              helperText={touched.confirmPassword && errors.confirmPassword}
              onChange={(e) => {
                setFieldValue("confirmPassword", e.target.value);
                setFieldTouched("confirmPassword", true, false);
              }}
            />
            <FormControl
              css={css({
                margin: "0px 10px",
              })}
              error={touched.gender && errors.gender}
            >
              <InputLabel id="select-gender">Gender</InputLabel>
              <Select
                labelId="select-gender"
                id="simple-gender"
                value={values.gender}
                label="Gender"
                onChange={(e) => {
                  setFieldValue("gender", e.target.value);
                  setFieldTouched("gender", true, false);
                }}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
              {touched.gender && errors.gender && (
                <FormHelperText>{errors.gender}</FormHelperText>
              )}
            </FormControl>
            <Button
              css={css({
                margin: "10px 10px",
              })}
              variant="contained"
              disabled={shouldDisableSubmit(errors, touched)}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>

            <Link to='/login' css={css({
              display: "flex",
              justifyContent: "end",
              margin : 10,
              color: "#1976d2",
            })}>
						{"Already have an account ? Log In"}
					</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
