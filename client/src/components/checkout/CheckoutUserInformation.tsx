import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {Formik, Form, validateYupSchema} from "formik";
import * as Yup from "yup";
import axios from "axios";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { RootState, AppDispatch } from "../../redux/store"
import { getUserInformation } from "../../redux/thunks/user";


export default function CheckoutUserInformation() {

const userId = localStorage.getItem("id") || "{}";

const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
    dispatch(getUserInformation(userId));
}, [dispatch, userId]);

const userInfoDetails = useSelector((state: RootState) => state.userinformation.userInfo);

const cartList = useSelector((state: RootState) => state.cartlist.cartList);

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

const updateUrl = `http://localhost:8000/users/${userId}`;

function updateUsersData(values: InitialValues) {
    axios.put(updateUrl, {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      country: values.country,
      city: values.city,
      address: values.address
    }, {headers: {Authorization: `Bearer ${token}`}});
  }

const navigate = useNavigate();

type Order = {
  productId: string;
  userQuantity: Number;
}

const productIdAndQuantity: Order[] = [];

cartList.map((item) => {
  return productIdAndQuantity.push({productId: item._id, userQuantity: item.userQuantity});
})

    function createOrderData() {

    const placeOrderUrl = `http://localhost:8000/orders/${userId}`;

    axios.post(placeOrderUrl, {
        cart: productIdAndQuantity
    }, {headers: {Authorization: `Bearer ${token}`}})
    .then((response) => response.data)
    .then((data) => {
    console.log(data, "OrderContactInfo.tsx");

    cartList.map((product) => {
        const updateQuantityUrl = `http://localhost:8000/products/${product._id}`;
        axios.put(updateQuantityUrl, {
            quantity: product.quantity - product.userQuantity
        }, {headers: {Authorization: `Bearer ${token}`}});
        return;
    })

    navigate("/orders");

    });
  }

  return (<div>
    <Box
        sx={{

            mx: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
        {/* <Box sx={{ width: '100%', mt: 2 }}> */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar sx={{ my: 4}}>
                      <ShoppingCartCheckoutIcon />
                  </Avatar>
              </Box>
        {/* </Box> */}
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
              <Grid item xs={12}>
                  <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Delivery & billing addresses are the same."
                  />
              </Grid>
            </Grid>
            <Button
            onClick={createOrderData}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Place Order
            </Button>
          </Form>
          }}
        </Formik>
    </Box>
  </div>
  );
}