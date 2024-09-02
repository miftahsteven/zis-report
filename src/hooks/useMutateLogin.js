import { useQuery, useMutation, mutate, useQueryClient } from '@tanstack/react-query';
import React, { useState } from "react";
import { Toast } from 'reactstrap';

import axios from '../lib/axios';


type Response = {
  success: boolean;
  message: string;
  session_id: string;
  token?: string;
  data?: User;
};

type Input = {
  username: string;
  password: string;
};

//const queryClient = useQueryClient();

const login = async ( payload) => {
  let datalogin = JSON.stringify({
    "username": payload.username,
    "password": payload.password
  });
  const { data } = await axios.request({
    method: 'POST',
    //url: '/auth/login',
    url: `${process.env.REACT_APP_BASEURL}/erpauth/login`,
    data: datalogin,
    headers: { 
      'Content-Type': 'application/json'
    }    
  });
    
  return data;
};

const useMutateLogin = () => {
  const queryClient = useQueryClient();
  return useMutation(login, { 
    mutationKey: 'loginizer',    
    onSuccess: (data) => {         
      localStorage.setItem('tokenizer', data.token);
      queryClient.setQueryData(['loginizer', { data: data }], data)
      
      return data;      
    },
    onError: (error) => {
      //console.log("---->>>>>",error);      
      return queryClient.setQueryData(['loginizer', { data: error?.response.data.message }], error?.response.data.message)
      //const err = error            
      const errorMessage = error?.response?.data?.message                  
      //return error;
     
    },
  });


};

export default useMutateLogin;
