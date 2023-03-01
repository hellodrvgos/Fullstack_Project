import {Formik, Form} from "formik";
import * as Yup from "yup";
import { Button, TextField } from '@mui/material'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserInformation from "./UserInformation";

export default function UserRegister() {

  const FormSchema = Yup.object().shape(
      {
          email: Yup.string().email('Invalid email').required('Please Enter your email'), 
          password: Yup.string().required('Please Enter your password')
          .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
              "Must Contain 6 Characters, One Uppercase, One Lowercase and One Number"
          ),
          fullname: Yup.string().required('Please Enter your Full Name'),
      }
  )

  type InitialValues = {
    email: string,
    password: string,
    fullname: string,
  }

  const initialValues: InitialValues = {
    email: "",
    password: "",
    fullname: "",
  }

  const registerUrl = "http://localhost:8000/users/register";

  const navigate = useNavigate();

  function registerUsersData(values: InitialValues) {
    axios.post(registerUrl, {
      email: values.email,
      password: values.password,
      fullname: values.fullname,
    });
    navigate("/login");
  }

  const token = localStorage.getItem("token")
  if (token) {
    return <UserInformation/>
  }

  return <div>
    <p><strong>REGISTER</strong></p>
    <Formik
        initialValues={initialValues}
        validationSchema = {FormSchema}
        onSubmit = {registerUsersData}
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
}