import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Alert, AlertColor, CardActionArea, Stack } from '@mui/material';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import PaymentIcon from '@mui/icons-material/Payment';

import { RootState, AppDispatch } from "../../redux/store"
import { cartActions } from "../../redux/slices/cart";
import { getUserInformation } from "../../redux/thunks/user";
import visalogo from "../../assets/Visa_Logo.png";
import mastercardlogo from "../../assets/MasterCard_Logo.png";

type CheckOut = {
    setStateCartDrawer: Function
    setCartSideWidth: Function
    setCheckoutInfo: Function
    setPayementInfo: Function
}

export default function CheckoutPayment({setStateCartDrawer, setCartSideWidth, setCheckoutInfo, setPayementInfo}: CheckOut) {

const [stepcolor, setStepColor] = useState("#bdbdbd");

const [visaColor, setVisaColor] = useState("");
const [mastercardColor, setMasterCardColor] = useState("");
const [cardSelected, setCardSelected] = useState(false)

function visaHandler() {
    setStepColor("#01e019");
    setVisaColor("#eee")
    setMasterCardColor("#")
    setCardSelected(true)
}

function mastercardHandler() {
    setStepColor("#01e019");
    setMasterCardColor("#eee")
    setVisaColor("")
    setCardSelected(true)
}

const userId = localStorage.getItem("id") || "{}";

const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
    dispatch(getUserInformation(userId));
}, [dispatch, userId]);

const userInfoDetails = useSelector((state: RootState) => state.userinformation.userInfo);

const cartList = useSelector((state: RootState) => state.cartlist.cartList);

const token = localStorage.getItem("token");

const navigate = useNavigate();

type Order = {
  productId: string;
  userQuantity: Number;
}

const productIdAndQuantity: Order[] = [];

cartList.map((item) => {
  return productIdAndQuantity.push({productId: item._id, userQuantity: item.userQuantity});
})

const [isShown, setIsShown] = useState(false);
const [alertMessage, setAlertMessage] = useState("");
const [alertSeverity, setAlertSeverity] = useState<AlertColor>("info");

const showAlert = (message: string) => {
  setIsShown(true);
  setAlertMessage(message);
};

function createOrderData() {

    const placeOrderUrl = `http://localhost:8000/orders/${userId}`;

    axios.post(placeOrderUrl, {
        cart: productIdAndQuantity
    }, {headers: {Authorization: `Bearer ${token}`}})
    .then((response) => response.data)
    .then((data) => {
        setAlertSeverity("success")
        showAlert(data.message);
        setTimeout(() => {setIsShown(false);}, 1000)

    cartList.map((product) => {
        const updateQuantityUrl = `http://localhost:8000/products/${product._id}`;
        axios.put(updateQuantityUrl, {
            quantity: product.quantity - product.userQuantity
        }, {headers: {Authorization: `Bearer ${token}`}});
        return;
    })
    });

    setPayementInfo(false);
    setCheckoutInfo(false);
    setStateCartDrawer(false);
    dispatch(cartActions.emptyCart());
    setCartSideWidth("400px");
    setTimeout(() => {navigate("/orders");}, 1000);
}

const fullName = `${userInfoDetails.firstName}  ${userInfoDetails.lastName}`;

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
                      <PaymentIcon />
                  </Avatar>
              </Box>
        <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: "82vh",
              justifyContent: "space-between",
            }}
            >
            <Stack direction={"column"} gap={4}>
            <Card sx={{ maxWidth: 345, borderRadius: "10px", border: "1px solid #ccc", boxShadow: "none", bgcolor: visaColor }}>
                <CardActionArea onClick={() => {visaHandler()}}>
                    <CardMedia
                    component="img"
                    sx={{width: "20%", pl: 2, pt: 3}}
                    image={visalogo}
                    alt="visa"
                    />
                    <CardContent >
                    <Typography gutterBottom variant="h6" color="gray">
                        {fullName}
                    </Typography>
                    <Stack direction={"row"} gap={7}>
                    <Typography gutterBottom variant="h6" color="gray" sx={{fontWeight: "normal"}}>
                        **** **** **** 4325
                    </Typography>
                    <Typography gutterBottom variant="h6" color="gray" sx={{fontWeight: "normal"}}>
                        11/24
                    </Typography>
                    </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 345, borderRadius: "10px", border: "1px solid #ccc", boxShadow: "none", bgcolor: mastercardColor }}>
                <CardActionArea onClick={() => {mastercardHandler()}}>
                    <CardMedia
                    component="img"
                    sx={{width: "20%", pl: 2, pt: 3}}
                    image={mastercardlogo}
                    alt="mastercard"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" color="gray">
                        {fullName}
                    </Typography>
                    <Stack direction={"row"} gap={7}>
                    <Typography gutterBottom variant="h6" color="gray" sx={{fontWeight: "normal"}}>
                        **** **** **** 1627
                    </Typography>
                    <Typography gutterBottom variant="h6" color="gray" sx={{fontWeight: "normal"}}>
                        03/25
                    </Typography>
                    </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
            </Stack>
            {isShown && <Alert severity={alertSeverity} sx={{mt: 1}}>
              {alertMessage}
              </Alert>}
            {
            cardSelected ?
            <Button
                onClick={createOrderData}
                fullWidth
                variant="contained"
                endIcon={<CreditScoreIcon/>}
                >
                Pay now
            </Button> :
            <Button
                disabled
                fullWidth
                variant="contained"
                endIcon={<CreditScoreIcon/>}
                >
                Pay now
            </Button>
            }
        </Box>
    </Box>
  );
}