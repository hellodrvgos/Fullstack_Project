import {Formik, Form} from "formik";
import * as Yup from "yup";
import { Button, TextField } from '@mui/material'
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../redux/store";
import { useSelector} from "react-redux";

export default function OrderContactInfo() {

    const FormSchema = Yup.object().shape(
        {
            country: Yup.string().required('Please Enter your Country'),
            city: Yup.string().required('Please Enter your City'),
            address: Yup.string().required('Please Enter your Address')
        }
    )

    type InitialValues = {
        country: string,
        city: string,
        address: string
    }

    const initialValues: InitialValues = {
        country: "",
        city: "",
        address: ""
    }

    const userId = localStorage.getItem("id") || "{}";
    const token = localStorage.getItem("token");

    console.log(userId)

    const navigate = useNavigate();

    const cartList = useSelector((state: RootState) => state.cartlist.cartList);
    console.log(cartList);

    function createOrderData(values: InitialValues) {
        const placeOrderUrl = `http://localhost:8000/orders/${userId}`;
        axios.post(placeOrderUrl, {
            products: cartList,
            contactInfo: {
                country: values.country,
                city: values.city,
                address: values.address
            },
        }, {headers: {Authorization: `Bearer ${token}`}})
        .then((response) => response.data)
        .then((data) => {
        console.log(data, "OrderContactInfo.tsx");
        navigate("/");
        });
    }

    return <div>
        <p><strong>This is OrderContactInfo</strong></p>
        <Formik
        initialValues={initialValues}
        validationSchema = {FormSchema}
        onSubmit = {createOrderData}
        >
           {({errors, touched, handleChange}) => {
            return  <Form>
            <div className="form-field">
                <TextField label="country" name='country' onChange = {handleChange}/>
                {errors.country && touched.country ? (
                  <div className='error-message'> {errors.country}</div>  
                ): null}
            </div>
            <div className="form-field">
                <TextField label="city" name='city' onChange = {handleChange}/>
                {errors.city && touched.city ? (
                  <div className='error-message'> {errors.city}</div>  
                ): null}
            </div>
            <div className="form-field">
                <TextField label="address" name='address' onChange = {handleChange}/>
                {errors.address && touched.address ? (
                  <div className='error-message'> {errors.address}</div>  
                ): null}
            </div>

            <Button type="submit">Submit</Button>
        </Form>
           }} 
        </Formik>
    </div>
}