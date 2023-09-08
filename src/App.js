import './App.css';
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from 'react';
import { BiErrorCircle } from 'react-icons/bi'
import { TiTick } from 'react-icons/ti'

const registerSchema = yup.object().shape({
  firstName: yup.string().matches(/^[A-Za-z]+$/, 'First Name must not contain numbers').required('First Name is required'),
  lastName: yup.string().matches(/^[A-Za-z]+$/, 'Last Name must not contain numbers').required('Last Name is required'),
  phoneNo: yup.string()
    .matches(/^[0-9]+$/, 'Phone number must contain only digits').min(10, '10 digits number required').max(10, "10 digits number required")
    .required('Phone Number is required'),
  address: yup.string().required('Address is required'),
  state: yup.string().required('Please Select Your State').min(1, 'Please Select Your State'),
  terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

function App() {

  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNo: '',
      address: '',
      state: '',
      terms: false,

    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(values)
      setIsSubmitted(true);

    }
  })

  const indianStates = [
    "Select State",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry"
  ];

  return (
    <div className='App flex flex-row justify-center items-center h-[100vh] w-[100vw] py-14'>

      <div className='form-img-wrapper flex flex-row justify-around items-center bg-slate-100 rounded-lg shadow-md'>

        <div className='form-container w-2/4  h-2/4 flex justify-center items-center  '>

          <form className='h-full w-96 p py-4 px-6' onSubmit={formik.handleSubmit}
          >
            <input type='text' id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange}
              onBlur={formik.handleBlur} placeholder='First Name' className='mb-3 mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-teal-400 '></input>

            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-sm -mt-3 mb-3 flex items-center"><span className='text-red-500 mr-1 ml-2'>{<BiErrorCircle />}</span> {formik.errors.firstName}</div>
            )}

            <input type='text' id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Last Name' className='mb-3 mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-teal-400' ></input>

            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500 text-sm -mt-3 mb-3 flex items-center"><span className='text-red-500 mr-1 ml-2'>{<BiErrorCircle />}</span> {formik.errors.lastName}</div>
            )}


            <textarea placeholder='Address' rows="3" cols="30" id='address' name='address' value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} className=' mb-3 mt-1 px-4 py-2 border border-gray-300 rounded-md  w-full focus:outline-teal-400'></textarea>

            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500 text-sm -mt-3 mb-3 flex items-center"><span className='text-red-500 mr-1 ml-2'>{<BiErrorCircle />}</span> {formik.errors.address}</div>
            )}


            <select id="state"
              name="state"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state} class="  w-full text-gray-500 py-2 px-3 border border-gray-300 rounded-md focus:outline-teal-400 mb-3">
              {indianStates && indianStates.map((state, index) => {
                return <option key={index} value={state} className='text-gray-600' >{state}</option>
              })}
            </select>

            {formik.touched.state && !formik.values.state && (
              <div className="text-red-500 text-sm -mt-3 mb-3 flex items-center"><span className='text-red-500 mr-1 ml-2'>{<BiErrorCircle />}</span> {formik.errors.state}</div>
            )}


            <input type='tel' id='phoneNo' name='phoneNo' value={formik.values.phoneNo} onChange={formik.handleChange}
              onBlur={formik.handleBlur} placeholder='Phone No.' className='mb-3 mt-1 px-4 py-2 border  border-gray-300 rounded-md w-full focus:outline-teal-400 ' />

            {formik.touched.phoneNo && formik.errors.phoneNo && (
              <div className="text-red-500 text-sm -mt-3 mb-3 flex items-center"><span className='text-red-500 mr-1 ml-2'>{<BiErrorCircle />}</span> {formik.errors.phoneNo}</div>
            )}

            
              <input type="checkbox"
                id="terms"
                name="terms"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.terms} className='mr-2 mb-3 text-teal-400' />

              <label htmlFor='termsAndConditions' className='mb-4'>Terms & Conditions</label>
            

            {formik.touched.terms && formik.errors.terms && (
              <div className="text-red-500 text-sm -mt-3 mb-3 flex items-center"><span className='text-red-500 mr-1 ml-2'>{<BiErrorCircle />}</span> {formik.errors.terms}</div>
            )}
            <div className='button-wrapper flex justify-center items-center px-5 mt-3'>
              <button className='bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-teal-400 text-center '>Register</button>
            </div>

          </form>

        </div>

        <div className='img-container h-full w-full px-10'>
          <img className='h-72 w-72   rounded-full border-2 border-gray-200' src='https://img1.pnghut.com/14/7/16/AmmJe64ciE/cartoon-frame-tree-flower-silhouette.jpg' alt='working woman' />

          <div className='text-center'>
            {isSubmitted && <div className='text-green-500 font-bold flex items-center justify-center'> <span>{<TiTick />}</span>Form Submitted Successfully!</div>}
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
