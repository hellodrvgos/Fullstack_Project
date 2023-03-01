import {Formik, Form} from "formik";
import * as Yup from "yup";
import { Button, TextField } from '@mui/material'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserInformation from "./UserInformation";

export default function UserLogIn() {

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

  const navigate = useNavigate();

  function getUsersData(values: InitialValues) {
    axios.post(loginUrl, {
      email: values.email,
      password: values.password
    })
    .then((response) => response.data)
    .then((data) => {
      localStorage.setItem("token", data.token)
      localStorage.setItem("id", data.id)
      navigate("/account");
    });
  }

  type InitialValues = {
    email: string,
    password: string
  }

  const token = localStorage.getItem("token")
  if (token) {
    return <UserInformation/>
  }

  return <div>
    <p><strong>LOGIN</strong></p>
    <Formik
        initialValues={initialValues}
        validationSchema = {FormSchema}
        onSubmit = {getUsersData}
        >
           {({errors, touched, handleChange}) => {
            return  <Form>
            <div className="form-field">
                <TextField label="email" name='email' onChange = {handleChange}/>
                {errors.email && touched.email ? (
                  <div className='error-message'> {errors.email}</div>  
                ): null}
            </div>
            <div className="form-field">
                <TextField label="password" name='password' onChange = {handleChange}/>
                {errors.password && touched.password ? (
                  <div className='error-message'> {errors.password}</div>  
                ): null}
            </div>

            <Button type="submit">Submit</Button>
        </Form>
           }} 
        </Formik>
  </div>
}