import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Formik, Form, validateYupSchema} from "formik";
import axios from "axios";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { RootState, AppDispatch } from "../../redux/store"
import { getUserInformation } from "../../redux/thunks/user";
import { Typography } from "@mui/material";

export default function UserInformation() {

const userId = localStorage.getItem("id") || "{}";

const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
    dispatch(getUserInformation(userId));
}, [dispatch, userId]);

const userInfoDetails = useSelector((state: RootState) => state.userinformation.userInfo);

type InitialValues = {
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  city: string,
  country: string,
  address: string
}

const initialValues: InitialValues = {
  email: `${userInfoDetails.email}`,
  firstName: `${userInfoDetails.firstName}`,
  lastName: `${userInfoDetails.lastName}`,
  phone: `${userInfoDetails.phone}`,
  city: `${userInfoDetails.city}`,
  country: `${userInfoDetails.country}`,
  address: `${userInfoDetails.address}`
}

const token = localStorage.getItem("token");

const updateUserUrl = `http://localhost:8000/users/${userId}`;

function updateUsersData(values: InitialValues) {
    axios.put(updateUserUrl, {
      firstName: values.firstName === "" ? `${userInfoDetails.firstName}` : values.firstName,
      lastName: values.lastName === "" ? `${userInfoDetails.lastName}` : values.lastName,
      email: values.email === "" ? `${userInfoDetails.email}` : values.email,
      phone: values.phone === "" ? `${userInfoDetails.phone}` : values.phone,
      country: values.country === "" ? `${userInfoDetails.country}` : values.country,
      city: values.city === "" ? `${userInfoDetails.city}` : values.city,
      address: values.address === "" ? `${userInfoDetails.address}` : values.address,
    }, {headers: {Authorization: `Bearer ${token}`}});
  }

  return (
    <Box
        sx={{
            mx: 2,
            pt: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "900px",
            margin: "0 auto",
            }}
        >
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 2 }}>
              <Avatar sx={{ my: 4, bgcolor: "black"}}>
                  <AccountCircleIcon />
              </Avatar>
              <Typography variant="h6">My Info</Typography>
          </Box>
          <Box sx={{bgcolor: "#eee", p: 2, borderRadius: 1, minWidth: "900px"}}>
            <Box sx={{bgcolor: "white", p: 5, borderRadius: 1}}>
            {
              token ?
              <Formik
              initialValues={initialValues}
              onSubmit = {updateUsersData}
              >
                {({errors, touched, handleChange}) => {
                return  <Form>
                  <Grid container spacing={2} >
                    <Grid item xs={12} sm={6}>
                      <TextField
                      variant="standard"
                      defaultValue={userInfoDetails.firstName}
                      name="firstName"
                      fullWidth
                      id="outlined-helperText"
                      label="First Name"
                      onChange = {handleChange}
                      />
                      {errors.firstName && touched.firstName ? (
                        <div className='error-message'> {errors.firstName}</div>  
                      ): null}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                      variant="standard"
                      defaultValue={userInfoDetails.lastName}
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                      variant="standard"
                      defaultValue={userInfoDetails.email}
                      fullWidth
                      disabled
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                      variant="standard"
                      defaultValue={userInfoDetails.phone}
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      autoComplete="phone"
                      onChange = {handleChange}
                      />
                      {errors.phone && touched.phone ? (
                        <div className='error-message'> {errors.phone}</div>  
                      ): null}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                      variant="standard"
                      defaultValue={userInfoDetails.country}
                      fullWidth
                      id="country"
                      label="Country"
                      name="country"
                      autoComplete="country"
                      onChange = {handleChange}
                      />
                      {errors.country && touched.country ? (
                        <div className='error-message'> {errors.country}</div>  
                      ): null}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                      variant="standard"
                      defaultValue={userInfoDetails.city}
                      fullWidth
                      id="city"
                      label="City"
                      name="city"
                      autoComplete="city"
                      onChange = {handleChange}
                      />
                      {errors.city && touched.city ? (
                        <div className='error-message'> {errors.city}</div>  
                      ): null}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                      variant="standard"
                      defaultValue={userInfoDetails.address}
                      fullWidth
                      name="address"
                      label="Street Address"
                      id="address"
                      autoComplete="address"
                      onChange = {handleChange}
                      />
                      {errors.address && touched.address ? (
                        <div className='error-message'> {errors.address}</div>  
                      ): null}
                    </Grid>
                  </Grid>
                  <Box sx={{textAlign: "left"}}>
                  <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 5, mb: 2, bgcolor: "black" }}
                  >
                  Save changes
                  </Button>
                  </Box>
                </Form>
                }}
              </Formik> :
              <Box sx={{ flexGrow: 1, display: "flex", minHeight: "50vh", justifyContent: "center"}}>
              <Typography sx={{mt: 5}}>Please SIGN IN.</Typography>
              </Box>
            } 
            </Box>
          </Box>
        </Box>
    </Box>
  );
}