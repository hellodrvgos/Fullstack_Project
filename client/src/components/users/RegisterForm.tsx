import { useState } from "react";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import axios from "axios";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert, { AlertColor } from '@mui/material/Alert';

type TabValue = {
  setValue: Function;
}

export default function RegisterForm({setValue}: TabValue) {

  const FormSchema = Yup.object().shape(
    {
      email: Yup.string().email('Invalid email').required('Please Enter your email'), 
      password: Yup.string().required('Please Enter your password')
      .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
          "Must Contain 6 Characters, One Uppercase, One Lowercase and One Number"
      ),
      firstName: Yup.string().required('Please Enter your First Name'),
      lastName: Yup.string().required('Please Enter your Last Name'),
    }
)

  type InitialValues = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  }

  const initialValues: InitialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  }

  const registerUrl = "http://localhost:8000/users/register";

  const [isShown, setIsShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("info");

  const showAlert = (message: string) => {
    setIsShown(true);
    setAlertMessage(message);
  };

  function register(values: InitialValues) {
    axios.post(registerUrl, {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName
    })
    .then((response) => response.data)
    .then((data) => {
      if (data.status !== "success") {
        setAlertSeverity("warning")
        showAlert(data.message);
        setTimeout(() => {setIsShown(false);}, 2000)
        return;
      }
      setAlertSeverity("success")
      showAlert(data.message);
      setTimeout(() => {setValue(0)}, 1000)
    })
  }

  return (<div>
    <Box
        sx={{
            my: 1,
            mx: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
      <Box sx={{ mt: 3, display: "flex", flexDirection: "column", rowGap: 3 }}>
        <Formik
        initialValues={initialValues}
        validationSchema = {FormSchema}
        onSubmit = {register}
        >
          {({errors, touched, handleChange}) => {
          return  <Form>
            <Grid container spacing={2} sx={{mb: 3}}>
              <Grid item xs={12} sm={6}>
                  <TextField
                  variant="standard"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange = {handleChange}
                  />
                  {errors.firstName && touched.firstName ? (
                    <div className='error-message'> {errors.firstName}</div>  
                  ): null}
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange = {handleChange}
                  />
                  {errors.lastName && touched.lastName ? (
                    <div className='error-message'> {errors.lastName}</div>  
                  ): null}
              </Grid>
              <Grid item xs={12}>
                  <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange = {handleChange}
                  />
                  {errors.email && touched.email ? (
                    <div className='error-message'> {errors.email}</div>  
                  ): null}
              </Grid>
              <Grid item xs={12}>
                  <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange = {handleChange}
                  />
                  {errors.password && touched.password ? (
                    <div className='error-message'> {errors.password}</div>  
                  ): null}
              </Grid>
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "black" }}
            >
            Sign Up
            </Button>
          </Form>
          }}
        </Formik>
        {isShown && <Alert severity={alertSeverity}>
        {alertMessage}
        </Alert>}
      </Box>
    </Box>
  </div>
  );
}