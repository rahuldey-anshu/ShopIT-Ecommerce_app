import axios from 'axios'

import {
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAIL,

 } from '../constants/categoryConstants'

 //get categories
 export const getAllCategory = () => async (dispatch)=> {
    
        dispatch({
            type: GET_ALL_CATEGORIES_REQUEST
        })

        const  res  = await axios.get(`/api/v1/category/getcategories`) ;
        console.log(res);

        if(res.status === 200) {
            const { categoryList } = res.data
        

        dispatch({
            type: GET_ALL_CATEGORIES_SUCCESS,
            payload: { categories: categoryList }
        })
    } 

 
 else{
    dispatch({
        type: GET_ALL_CATEGORIES_FAIL,
        payload: {error: res.data.error}
    })
}
 }
