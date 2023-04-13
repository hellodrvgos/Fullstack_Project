import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from '@mui/material/Box';
import { Button, Grid, TextField, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import PaymentIcon from '@mui/icons-material/Payment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { RootState, AppDispatch } from "../../redux/store";
import { getOrderListInfo } from "../../redux/thunks/orders";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Form, Formik } from "formik";
import visa from "../../assets/visa.png"
import mastercard from "../../assets/mastercard.png"

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2, mt: -4, bgcolor: "#eee", borderRadius: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: "none"
  }));

export default function PaymentMethods() {

    type InitialValues = {
        nameoncard: string,
        cardnumber: string,
        expirationdate: string,
        cvv: string,
      }
      
      const initialValues: InitialValues = {
        // nameoncard: `${cardDetails.nameoncard}`,
        // cardnumber: `${cardDetails.cardnumber}`,
        // expirationdate: `${cardDetails.expirationdate}`,
        // cvv: `${cardDetails.cvv}`,
        nameoncard: "Dragos Tudor",
        cardnumber: "4322 5543 3213 4325",
        expirationdate: "11/24",
        cvv: "533",
      }

      function updateCardData(values: InitialValues) {
        // axios.put(updateUserUrl, {
        //   nameoncard: values.nameoncard === "" ? `${cardDetails.nameoncard}` : values.nameoncard,
        //   cardnumber: values.cardnumber === "" ? `${cardDetails.cardnumber}` : values.cardnumber,
        //   expirationdate: values.expirationdate === "" ? `${cardDetails.expirationdate}` : values.expirationdate,
        //   cvv: values.cvv === "" ? `${cardDetails.cvv}` : values.cvv
        console.log("Card Saved")
      }

    const token = localStorage.getItem("token");

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const userId = localStorage.getItem("id") || "{}";

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getOrderListInfo(userId));
    }, [dispatch, userId]);

    const orderList = useSelector((state: RootState) => state.orderlist.orderList);

    const orderListReverse = [...orderList];
    orderListReverse.reverse();

    const userInfoDetails = useSelector((state: RootState) => state.userinformation.userInfo);
    const fullName = `${userInfoDetails.firstName} ${userInfoDetails.lastName}`

        return (
        <Box 
            sx={{
                mx: 2,
                pt: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: "900px",
                margin: "0 auto"
            }}
        >
            <Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 2, mb: 5 }}>
                    <Avatar sx={{ my: 4, bgcolor: "black"}}>
                        <PaymentIcon />
                    </Avatar>
                    <Typography variant="h6">My Credit Cards</Typography>
                </Box>

                {
                    token === null ?
                    <Box sx={{ flexGrow: 1, display: "flex", height: "30vh"}}>
                        <Typography>Please SIGN IN.</Typography>
                    </Box> :
                            <Box sx={{ flexGrow: 1, display: 'flex', mb: 5}}>
                                <Tabs
                                    orientation="vertical"
                                    variant="scrollable"
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="Vertical tabs example"
                                    sx={{
                                        minWidth: "80px",
                                        height: "300px",
                                        '& .MuiTabs-indicator': {
                                        bgcolor: '#eee',
                                        },
                                        '& .MuiTab-root.Mui-selected': {
                                        bgcolor: '#eee',
                                        borderRadius: "5px"
                                        },
                                    }}
                                >
                                        <Tab {...a11yProps(0)} sx={{
                                            // backgroundImage: `url(https://cdn.icon-icons.com/icons2/1186/PNG/512/1490135017-visa_82256.png)`,
                                            backgroundImage: `url(${visa})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "contain",
                                            backgroundPosition: "center",
                                        }}/>
                                        <Tab {...a11yProps(1)} 
                                        sx={{
                                            backgroundImage: `url(${mastercard})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "contain",
                                            backgroundPosition: "center"
                                        }}/>
                                </Tabs>
                                        <TabPanel value={value} index={0}>
                                            <Box sx={{ flexGrow: 1, width: "800px"}}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} >
                                                    <Item sx={{p: 5}}>
                                                        <Formik
                                                            initialValues={initialValues}
                                                            onSubmit = {updateCardData}
                                                            >
                                                            {({errors, touched, handleChange}) => {
                                                            return  <Form>
                                                                <Grid container spacing={2} >
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                    variant="standard"
                                                                    defaultValue={fullName}
                                                                    name="nameOnCard"
                                                                    fullWidth
                                                                    id="outlined-helperText"
                                                                    label="Name on Card"
                                                                    onChange = {handleChange}
                                                                    />
                                                                    {/* {errors.nameoncard && touched.nameoncard ? (
                                                                    <div className='error-message'> {errors.nameoncard}</div>  
                                                                    ): null} */}
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                    variant="standard"
                                                                    defaultValue="4322 5543 3213 4325"
                                                                    fullWidth
                                                                    id="cardnumber"
                                                                    label="Card Number"
                                                                    name="cardNumber"
                                                                    autoComplete="family-name"
                                                                    onChange = {handleChange}
                                                                    />
                                                                    {/* {errors.cardnumber && touched.cardnumber ? (
                                                                    <div className='error-message'> {errors.cardnumber}</div>  
                                                                    ): null} */}
                                                                </Grid>
                                                                <Grid item xs={12} sm={6}>
                                                                    <TextField
                                                                    variant="standard"
                                                                    defaultValue="11/24"
                                                                    fullWidth
                                                                    id="expirationdate"
                                                                    label="Expiration Data"
                                                                    name="expirationDate"
                                                                    autoComplete="email"
                                                                    onChange = {handleChange}
                                                                    />
                                                                    {/* {errors.expirationdate && touched.expirationdate ? (
                                                                    <div className='error-message'> {errors.expirationdate}</div>  
                                                                    ): null} */}
                                                                </Grid>
                                                                <Grid item xs={12} sm={6}>
                                                                    <TextField
                                                                    variant="standard"
                                                                    defaultValue="533"
                                                                    fullWidth
                                                                    id="cvv"
                                                                    label="CVV"
                                                                    name="cvv"
                                                                    autoComplete="phone"
                                                                    onChange = {handleChange}
                                                                    />
                                                                    {/* {errors.cvv && touched.cvv ? (
                                                                    <div className='error-message'> {errors.cvv}</div>  
                                                                    ): null} */}
                                                                </Grid>
                                                                </Grid>
                                                                <Box sx={{textAlign: "left"}}>
                                                                <Button
                                                                disabled
                                                                type="submit"
                                                                variant="contained"
                                                                sx={{ mt: 5, mb: 2, bgcolor: "black" }}
                                                                >
                                                                Save card
                                                                </Button>
                                                                </Box>
                                                            </Form>
                                                            }}
                                                        </Formik>
                                                    </Item>
                                                    </Grid>
                                                </Grid>
                                            </Box>

                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                        <Box sx={{ flexGrow: 1, width: "800px"}}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} >
                                                    <Item sx={{p: 5}}>
                                                        <Formik
                                                            initialValues={initialValues}
                                                            onSubmit = {updateCardData}
                                                            >
                                                            {({errors, touched, handleChange}) => {
                                                            return  <Form>
                                                                <Grid container spacing={2} >
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                    variant="standard"
                                                                    defaultValue={fullName}
                                                                    name="nameOnCard"
                                                                    fullWidth
                                                                    id="outlined-helperText"
                                                                    label="Name on Card"
                                                                    onChange = {handleChange}
                                                                    />
                                                                    {/* {errors.nameoncard && touched.nameoncard ? (
                                                                    <div className='error-message'> {errors.nameoncard}</div>  
                                                                    ): null} */}
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                    variant="standard"
                                                                    defaultValue="5433 8293 3233 1627"
                                                                    fullWidth
                                                                    id="cardnumber"
                                                                    label="Card Number"
                                                                    name="cardNumber"
                                                                    autoComplete="family-name"
                                                                    onChange = {handleChange}
                                                                    />
                                                                    {/* {errors.cardnumber && touched.cardnumber ? (
                                                                    <div className='error-message'> {errors.cardnumber}</div>  
                                                                    ): null} */}
                                                                </Grid>
                                                                <Grid item xs={12} sm={6}>
                                                                    <TextField
                                                                    variant="standard"
                                                                    defaultValue="03/25"
                                                                    fullWidth
                                                                    id="expirationdate"
                                                                    label="Expiration Data"
                                                                    name="expirationDate"
                                                                    autoComplete="email"
                                                                    onChange = {handleChange}
                                                                    />
                                                                    {/* {errors.expirationdate && touched.expirationdate ? (
                                                                    <div className='error-message'> {errors.expirationdate}</div>  
                                                                    ): null} */}
                                                                </Grid>
                                                                <Grid item xs={12} sm={6}>
                                                                    <TextField
                                                                    variant="standard"
                                                                    defaultValue="402"
                                                                    fullWidth
                                                                    id="cvv"
                                                                    label="CVV"
                                                                    name="cvv"
                                                                    autoComplete="phone"
                                                                    onChange = {handleChange}
                                                                    />
                                                                    {/* {errors.cvv && touched.cvv ? (
                                                                    <div className='error-message'> {errors.cvv}</div>  
                                                                    ): null} */}
                                                                </Grid>
                                                                </Grid>
                                                                <Box sx={{textAlign: "left"}}>
                                                                <Button
                                                                disabled
                                                                type="submit"
                                                                variant="contained"
                                                                sx={{ mt: 5, mb: 2, bgcolor: "black" }}
                                                                >
                                                                Save card
                                                                </Button>
                                                                </Box>
                                                            </Form>
                                                            }}
                                                        </Formik>
                                                    </Item>
                                                    </Grid>
                                                </Grid>
                                            </Box>

                                        </TabPanel>
                            </Box> 
                }
            </Box>
        </Box>
        )
}