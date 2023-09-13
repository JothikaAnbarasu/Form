
import './App.css';
import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import { BiErrorCircle } from 'react-icons/bi'
import { indianStates } from './constant.js';
import { registerSchema } from './helper';
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdError } from 'react-icons/md'
import {PiWarningFill} from 'react-icons/pi'


function App() {
  const [isSuccessToastOoen, setIsSuccessToastOpen] = useState(false);
  const [isFailureToastOpen, setIsFailureToastOpen] = useState(false);
  const [isWarningToastOpen , setIsWarningToastOpen] = useState(false);

  const initialValuesFromStorage = JSON.parse(localStorage.getItem('formValues')) || {
    firstName: '',
    lastName: '',
    phoneNo: '',
    address: '',
    state: '',
    terms: false,
  };
  console.log(initialValuesFromStorage)

  const formik = useFormik({
    initialValues: initialValuesFromStorage,
    validationSchema: registerSchema,
    onSubmit: () => {
      setIsSuccessToastOpen(true);
      setIsFailureToastOpen(false);
      setTimeout(() => {
        setIsSuccessToastOpen(false);
      }, 3000)
    }

  })

  useEffect(() => {
    localStorage.setItem('formValues', JSON.stringify(formik.values));
   
  }, [formik.values])


  const handleSubmit = ()=>{
 
   const notTouchedAnyField = Object.values(initialValuesFromStorage).every((value)=> value==="" || value === false);
   console.log(initialValuesFromStorage);
   console.log(notTouchedAnyField);
   if(notTouchedAnyField){
    setIsWarningToastOpen(true);
    setTimeout(()=>{
      setIsWarningToastOpen(false);
    },3000)
   }

    if( formik.errors || formik.isSubmitting ){
      setIsFailureToastOpen(true);
      setTimeout(()=>{
       setIsFailureToastOpen(false);
      },3000)
       }

     
  }

  return (
    <div className='App flex flex-row justify-center items-center h-[100vh] w-[100vw] py-14 bg-gradient-to-r from-sky-300 to-sky-100'>

      {isSuccessToastOoen &&
        <div className=' flex items-center justify-center h-fit w-fit bg-white p-8  absolute top-1 rounded  text-green-600  border-green-600 border-b-4'>
          <span className='mr-2 pt-1'><IoIosCheckmarkCircle /> </span> Form Submitted Successfully
        </div>}

      {isFailureToastOpen &&
      <div className=' flex items-center justify-center h-fit w-fit bg-white p-8  absolute top-1 rounded  text-red-600  border-red-600 border-b-4'>
        <span className='mr-2 pt-1'><MdError /> </span> Submission Failed
      </div>}

{isWarningToastOpen && 
  <div className=' flex items-center justify-center h-fit w-fit bg-white p-8  absolute top-1 rounded  text-amber-400 border-amber-400 border-b-4'>
        <span className='mr-2 pt-1'><PiWarningFill /> </span> Kindly fill the Form and Submit
      </div>
}
      <div className='form-img-wrapper w- flex flex-row justify-around items-center bg-slate-100 rounded-lg shadow-md'>

        <div className='form-container w-11/12  h-2/4 flex justify-center items-center  '>

          <form className='h-full w-96 py-4 px-6' onSubmit={(event) => {
            event.preventDefault();
            formik.handleSubmit();

          }}
          >

            <div className='flex flex-row gap-2'>
              <div>
                <label htmlFor='firstName' className='text-slate-600 font-semibold'>First Name : </label>
                <input type='text' id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange }

                  placeholder='First Name' className='mb-3 mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-teal-400 '></input>

                {formik.touched.firstName && formik.errors.firstName && (
                  <>
                    <div className="text-red-500  text-xs -mt-1 mb-3 flex items-center"><span className='text-red-500 mr-1 ml-2'>{<BiErrorCircle />}</span> {formik.errors.firstName}</div>

                  </>
                )}
              </div>

              <div>
                <label htmlFor='lastName' className='text-slate-600 font-semibold'>Last Name : </label>

                <input type='text' id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} placeholder='Last Name' className='mb-3 mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-teal-400' ></input>

                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-red-500  text-xs -mt-1 mb-3 flex items-center"><span className='text-red-500 mr-1 ml-2'>{<BiErrorCircle />}</span> {formik.errors.lastName}</div>
                )}
              </div>
            </div>


            <label htmlFor='address' className='text-slate-600 font-semibold'>Address : </label>

            <textarea placeholder='Address' rows="3" cols="30" id='address' name='address' value={formik.values.address} onChange={formik.handleChange} className=' mb-3 mt-1 px-4 py-2 border border-gray-300 rounded-md  w-full focus:outline-teal-400'></textarea>

            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500  text-xs -mt-1 mb-3 flex items-center"><span className='text-red-500 mr-1 ml-2'>{<BiErrorCircle />}</span> {formik.errors.address}</div>
            )}

            <label htmlFor='state' className='text-slate-600 font-semibold'> State : </label>

            <select id="state"
              name="state"
              onChange={formik.handleChange}
              value={formik.values.state} className="  w-full text-gray-500 py-2 px-3 border border-gray-300 rounded-md focus:outline-teal-400 mb-3">
              {indianStates && indianStates.map((state, index) => {
                return <option key={index} value={state} className='text-gray-600' >{state}</option>
              })}
            </select>

            {formik.touched.state && !formik.values.state && (
              <div className="text-red-500  text-xs -mt-1 mb-3 flex items-center"><span className='text-red-500 mr-1 ml-2'>{<BiErrorCircle />}</span> {formik.errors.state}</div>
            )}

            <label htmlFor='phoneNo' className='text-slate-600 font-semibold'>Phone No. : </label>

            <input type='tel' id='phoneNo' name='phoneNo' value={formik.values.phoneNo} onChange={formik.handleChange}
              placeholder='Phone No.' className='mb-3 mt-1 px-4 py-2 border  border-gray-300 rounded-md w-full focus:outline-teal-400 ' />

            {formik.touched.phoneNo && formik.errors.phoneNo && (
              <div className="text-red-500  text-xs -mt-1 mb-3 flex items-center"><span className='text-red-500 mr-1 ml-2'>{<BiErrorCircle />}</span> {formik.errors.phoneNo}</div>
            )}


            <input type="checkbox"
              id="terms"
              name="terms"
              onChange={formik.handleChange}

              checked={formik.values.terms} className='mr-2 mb-3 text-teal-400' />

            <label htmlFor='termsAndConditions' className='mb-4'>Terms & Conditions</label>


            {formik.touched.terms && formik.errors.terms && (
              <div className="text-red-500  text-xs -mt-1 mb-3 flex items-center"><span className='text-red-500 mr-1 ml-2'>{<BiErrorCircle />}</span> {formik.errors.terms}</div>
            )}
            <div className='button-wrapper flex justify-center items-center px-5 mt-2'>
              <button type='submit' className={`bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-teal-400 text-center ${formik.isSubmitting
                ? 'opacity-50 cursor-not-allowed bg-teal-400'
                : ''
                }`}
                disabled={formik.isSubmitting} onClick={handleSubmit}>Register</button>
            </div>

          </form>

        </div>

        <div className='img-container h-full w-full px-10'>
          <img className='h-72 w-72   rounded-full border-2 border-gray-200' src='https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=740&t=st=1694198011~exp=1694198611~hmac=b2b8f3e44801aee301637f10f83bcb9ee009c24ce1effcdee5e25a11ab5f4dd7' alt='working woman' />


        </div>

      </div>

    </div>
  );
}

export default App;