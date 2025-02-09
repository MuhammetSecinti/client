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
import { fetchRegister } from "../../../api";

function Signup() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({email:values.email, password:values.password})
        console.log(registerResponse);
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
        Sign Up
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
        <FormControl id="passwordConfirm" mb="4">
          <FormLabel>Password Confirm</FormLabel>
          <Input
            type="password"
            name="passwordConfirm"
            value={formik.values.passwordConfirm}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.passwordConfirm && formik.errors.passwordConfirm
            }
            onChange={formik.handleChange}
            placeholder="Password confirm"
          />
        </FormControl>

        <Button type="submit" colorScheme="teal" width="full">
          Register
        </Button>
      </form>

      <Text mt="4" textAlign="center" fontSize="sm">
        Already have an account?{" "}
        <a href="/login" style={{ color: "teal" }}>
          Login here
        </a>
        .
      </Text>
    </Box>
  );
}

export default Signup;
