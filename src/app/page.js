'use client'

import { useForm } from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { Eye, EyeOff } from 'lucide-react';
import { useState } from "react";


const schema = yup.object().shape({ // Defines the validation schema.
  firstName : yup
                .string()
                .required('firstName is required'),

  lastName : yup
                .string()
                .required('lastName is required'),

  age : yup
          .number()
          .typeError('Only enter the number') 
          .integer('please enter integer value')
          .positive('please enter positive value')
          .required('age is required'),

  email : yup
            .string()
            .email('invalid email')
            .required('email is required'),

  password : yup
              .string()
              .trim() // Ensure no extra spaces are counted
              .min(5,'password must be alteast 5 char')
              .max(15)
              .required('password is required'),

  confirmPassword : yup
                      .string()
                      .trim() // Ensure no extra spaces are counted
                      .oneOf([yup.ref("password")], 'incorrect password!')
                      .required('confirmPassword is required'), //// Ensures it matches the "password" field.
})



export default function Home() {

  const {register, handleSubmit,formState : {errors, isValid}, watch} = useForm({
    resolver : yupResolver(schema), // Connects the schema to react-hook-form.
    mode : 'onChange'
  });

  // console.log(errors)
  console.log(isValid)


  //password show and hide
  const [showPasswrd,setShowPassword] = useState(false)
  const [showConfirmPasswrd,setShowConfirmPassword] = useState(false)

  //only show icons when i type in input field
      //watch() function is used to track the current value of specific fields in real time
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");


  const onSubmitForm =(data) =>{
    
    alert(JSON.stringify(data,null,2)) //data,null,2 -> null,2 is  used for alert message show like list of key:value
    console.log("Form Data:", data);
  }


  return (
    <main className="w-full min-h-screen bg-violet-50 pt-10 font-serif">
      <div className=" flex flex-col justify-center items-center">
        <h1 className="font-extrabold text-4xl mb-2 text-violet-800">Form</h1>
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="w-[310px] flex flex-col justify-center items-center border-1 border-gray-500 p-3 rounded-lg"
        >
          <div className="flex flex-col w-full mb-1">
            <label htmlFor="">F-Name :</label>
            <input
              {...register("firstName")}
              className="w-full border border-gray-400  rounded p-1 h-10"
              type="text"
            />
            {errors?.firstName && <p className='text-red-500 text-sm'>{errors.firstName.message}</p>}
          </div>

          <div className="flex flex-col w-full mb-1">
            <label htmlFor="">L-Name :</label>
            <input
              {...register("lastName")}
              className="w-full border border-gray-400  rounded p-1 h-10"
              type="text"
            />
            {errors?.lastName && <p className='text-red-500 text-sm'>{errors.lastName.message}</p>}
          </div>

          <div className="flex flex-col w-full mb-1">
            <label htmlFor="">Age :</label>
            <input
              {...register("age")}
              className="w-full border border-gray-400 rounded p-1 h-10"
              type="text"
            />
            {errors?.age && <p className='text-red-500 text-sm'>{errors.age.message}</p>}
          </div>

          <div className="flex flex-col w-full mb-1 ">
            <label htmlFor="">Email :</label>
            <input
              {...register("email")}
              className="w-full border border-gray-400  rounded p-1 h-10"
              type="text"
            />
            {errors?.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
          </div>

          <div className="flex flex-col w-full mb-1 relative">
            <label htmlFor="">Password :</label>
            <div className="relative">
              <input
                {...register("password")}
                className="w-full border border-gray-400  rounded p-1 h-10"
                type={showPasswrd ? "text" : "password"}
              />
              {password &&
                <span type="button" 
                      onClick={()=>setShowPassword((pre)=> !pre)} 
                      className="absolute bottom-2.5 right-1.5"
                      >
                        {showPasswrd ? <EyeOff size={18} /> : <Eye size={18} />}
                </span> 
              }
            </div>
           
            {errors?.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
          </div>

          <div className="flex flex-col w-full mb-1 ">
            <label htmlFor="">Confirm Password :</label>
            <div className="relative"> 
              <input
                {...register("confirmPassword")}
                className="w-full border border-gray-400  rounded p-1 h-10"
                type={showConfirmPasswrd ? "text" : "password"}
              />
              {confirmPassword && 
                <span type="button" 
                      onClick={()=> setShowConfirmPassword((pre)=>!pre)} 
                      className="absolute bottom-2.5 right-1.5"
                      >
                        {showConfirmPasswrd ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              }
            </div>
            {errors?.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
          </div>

          <button
            disabled={!isValid}
            type="submit"
            className={`border rounded flex justify-center items-center bg-violet-600 text-white font-extrabold m-3 text-center px-15 py-2 ${!isValid ? "disabled:bg-violet-300" : ""}`}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
