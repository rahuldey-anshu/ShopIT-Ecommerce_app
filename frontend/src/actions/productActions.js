import axios from 'axios'

import { 
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS

   }  from '../constants/productConstants'
   //get products
   export const getProducts = (currentPage = 1) => async (dispatch) => {
       try {
           dispatch({
               type: ALL_PRODUCTS_REQUEST
           })

           const { data } = await axios.get(`/api/v1/products?page=${currentPage}`)

           dispatch({
               type:ALL_PRODUCTS_SUCCESS,
               payload: data
           })

       } catch (error) {
           dispatch({
               type: ALL_PRODUCTS_FAIL,
               payload: error.response.data.message
           })
       }
   }
 
   //get product details by product id
   export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type:  PRODUCT_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

  //get product details by product id
  export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({
            type:  ADMIN_PRODUCTS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/admin/products`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.products
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
   //clear Errors
   export const clearErrors = () => async (dispatch) => {
       dispatch({
           type: CLEAR_ERRORS
       })
   }
