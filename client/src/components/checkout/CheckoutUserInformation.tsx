import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {Formik, Form, validateYupSchema} from "formik";
import axios from "axios";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PaymentIcon from '@mui/icons-material/Payment';
import Typography from '@mui/material/Typography';

import { RootState, AppDispatch } from "../../redux/store"
import { getUserInformation } from "../../redux/thunks/user";

type PaymentInfo = {
  paymentSide: Function
}

export default function CheckoutUserInformation({paymentSide}: PaymentInfo) {

const [buttonDisabled, setButtonDisabled] = useState(false);

const [stepcolor, setStepColor] = useState("#bdbdbd");

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
    paymentHandler();
}

function paymentHandler() {
    paymentSide("1200px");
    setButtonDisabled(true);
    setStepColor("#01e019");
}

type Order = {
  productId: string;
  userQuantity: Number;
}

const productIdAndQuantity: Order[] = [];

cartList.map((item) => {
  return productIdAndQuantity.push({productId: item._id, userQuantity: item.userQuantity});
})

  const [show, setShow] = useState(false);

  return (
    <Box
        sx={{
          width: "400px",
          boxSizing: "content-box",
            mx: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ my: 4, bgcolor: stepcolor}}>
                  <ShoppingCartCheckoutIcon />
              </Avatar>
          </Box>
        {
          userInfoDetails.email !== "" ?
          <Formik
          initialValues={initialValues}
          onSubmit = {updateUsersData}
          >
            {({errors, touched, handleChange}) => {
            return  <Form>
            <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: "82vh",
              justifyContent: "space-between",
            }}
            >
              <Box sx={{overflow: "hidden", overflowY: "scroll"}}>
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
                      disabled
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
                      control={<Checkbox value="billing-address" color="primary" />}
                      label="Deliver to different address"
                      onClick={() => setShow(prev => !prev)}
                      />
                  </Grid>
                </Grid>

                {
                  show && <Grid container spacing={2} >
                  <Grid item xs={12} sm={6}>
                      <TextField
                      variant="standard"
                      fullWidth
                      // id="country"
                      label="Country"
                      // name="country"
                      // autoComplete="country"
                      // onChange = {handleChange}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                      variant="standard"
                      fullWidth
                      label="City"
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                      variant="standard"
                      fullWidth
                      label="Street Address"
                      />
                  </Grid>
                </Grid>
                }
              </Box>
              {
                !buttonDisabled ?
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  endIcon={<PaymentIcon/>}
                  >
                  Proceed to Payment
                </Button> :
                <Button
                  disabled
                  fullWidth
                  variant="contained"
                  endIcon={<PaymentIcon/>}
                  >
                  Proceed to Payment
                </Button>
              }
            </Box>
            </Form>
          }}
          </Formik> :
          <Typography>Loading...</Typography>
        }
    </Box>
  );
}