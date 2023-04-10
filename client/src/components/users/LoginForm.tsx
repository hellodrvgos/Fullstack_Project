import {Formik, Form} from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Alert, { AlertColor } from '@mui/material/Alert';

type AccountState = {
  setStateAccountDrawer: Function;
  setLoginState: Function;
}

export default function LoginForm({setStateAccountDrawer, setLoginState}: AccountState) {

  const FormSchema = Yup.object().shape(
    {
      email: Yup.string().email('Invalid email').required('Please Enter your email'), 
      password: Yup.string().required('Please Enter your password')
    }
  )

  const initialValues: InitialValues = {
    email: "",
    password: ""
  }

  const loginUrl = "http://localhost:8000/users/login";

  const [isShown, setIsShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("info");

  const showAlert = (message: string) => {
    setIsShown(true);
    setAlertMessage(message);
  };

  function login(values: InitialValues) {
    axios.post(loginUrl, {
      email: values.email,
      password: values.password
    })
    .then((response) => response.data)  
    .then((data) => {
      if (data.status !== "success") {
        setAlertSeverity("warning")
        showAlert(data.message);
        setTimeout(() => {setIsShown(false);}, 2000)
        return;
      }
      localStorage.setItem("token", data.token)
      localStorage.setItem("id", data.id)
      setLoginState(true);
      setAlertSeverity("success")
      showAlert(data.message);
      setStateAccountDrawer(false);
    });
  }

  type InitialValues = {
    email: string,
    password: string
  }

  return (
    <div>
      <Box
        sx={{
        my: 1,
        mx: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
      >
        <Box sx={{ mt: 1, display: "flex", flexDirection: "column", rowGap: 3 }}>
          <Formik
            initialValues={initialValues}
            validationSchema = {FormSchema}
            onSubmit = {login}
            >
            {({errors, touched, handleChange}) => {
            return  <Form>
            <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange = {handleChange}
            />
            {errors.email && touched.email ? (
              <div className='error-message'> {errors.email}</div>  
            ): null}
            <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {handleChange}
                sx={{mb: 2}}
            />
            {errors.password && touched.password ? (
              <div className='error-message'> {errors.password}</div>  
            ): null}
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "black" }}
            >
                Sign In
            </Button>
            </Form>
            }}
          </Formik>
          {isShown && <Alert severity={alertSeverity}>
          {alertMessage}
          </Alert>}
        </Box> 
      </Box>
    </div>);
}