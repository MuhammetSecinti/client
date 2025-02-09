import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from 'react-router-dom';



function Signin() {
  const history = useHistory();
  const {login} = useAuth()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({email:values.email, password:values.password})
        login(loginResponse)
        console.log(loginResponse);
        history.push('/');
      } catch (error) {
        bag.setErrors({general : error.response.data.message})
      }
    },
  });

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="10"
      p="5"
      boxShadow="lg"
      borderRadius="md"
      bg="white"
    >
      <Heading as="h2" size="lg" textAlign="center" mb="6">
        Sign In
      </Heading>

     <Box>
      {
        formik.errors.general && (
          <Alert status="error">
            {formik.errors.general}
          </Alert>
        )
      }
     </Box>

      <form onSubmit={formik.handleSubmit}>
        <FormControl id="email" mb="4">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Enter your email"
            isInvalid={formik.touched.email && formik.errors.email}
          />
        </FormControl>

        <FormControl id="password" mb="6">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isInvalid={formik.touched.password && formik.errors.password}
            placeholder="Enter your password"
          />
        </FormControl>
        

        <Button type="submit" colorScheme="teal" width="full">
          Login
        </Button>
      </form>

      <Text mt="4" textAlign="center" fontSize="sm">
      Don't have a registered account?
        <a href="/register" style={{ color: "teal" }}>
          Login here
        </a>
        
      </Text>
    </Box>
  );
}

export default Signin;
