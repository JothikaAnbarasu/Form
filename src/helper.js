
import * as yup from "yup";

export const registerSchema = yup.object().shape({
    firstName: yup.string().matches(/^[A-Za-z]+$/, 'First Name must only contains letters').required('First Name is required'),
    lastName: yup.string().matches(/^[A-Za-z]+$/, 'Last Name must only contains letters').required('Last Name is required'),
    phoneNo: yup.string()
      .matches(/^[0-9]+$/, 'Phone number must contain only digits')
      .min(10, '10 digits number required').max(10, "10 digits number required")
      .required('Phone Number is required'),
    address: yup.string().required('Address is required'),
    state: yup.string().required('Please Select Your State').min(1,'Please Select Your State'),
    terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  });