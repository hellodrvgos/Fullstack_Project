import {Formik, Form} from "formik";
import * as Yup from "yup";
import { Button, TextField } from '@mui/material'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserInformationUpdate() {

    const FormSchema = Yup.object().shape(
        {
            fullname: Yup.string().required('Please Enter your Full Name'),
        }
    )
  
    type InitialValues = {
      fullname: string,
    }
  
    const initialValues: InitialValues = {
      fullname: "",
    }

    const userId = localStorage.getItem("id") || "{}";

    const token = localStorage.getItem("token");

    const updateUrl = `http://localhost:8000/users/${userId}`;

    const navigate = useNavigate();

    function uodateUsersData(values: InitialValues) {
        axios.put(updateUrl, {
          fullname: values.fullname,
        }, {headers: {Authorization: `Bearer ${token}`}});
        navigate("/account");
      }

    return (
        <div>
            <p>UserInformationUpdate</p>
            <Formik
        initialValues={initialValues}
        validationSchema = {FormSchema}
        onSubmit = {uodateUsersData}
        >
           {({errors, touched, handleChange}) => {
            return  <Form>
            <div className="form-field">
                <TextField label="fullname" name='fullname' onChange = {handleChange}/>
                {errors.fullname && touched.fullname ? (
                  <div className='error-message'> {errors.fullname}</div>  
                ): null}
            </div>
            <Button type="submit">Submit</Button>
        </Form>
           }} 
        </Formik>
        </div>
    )
}