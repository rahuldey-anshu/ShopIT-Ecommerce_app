import { 
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAIL,
    CLEAR_ERRORS

   }  from '../constants/categoryConstants'

   const initState = {
       categories: [], 
       loading: false,
       error: null
   };

//    export default (state = initState , action) => {
//        switch(action.type){
//        case GET_ALL_CATEGORIES_SUCCESS: 
//        state = { 
//            ...state,
//         categories : action.payload.categories
//     }
//     break ;
//    }
//    return state ;
// }



   export const categoryReducer = (state =  initState , action ) => {
    switch(action.type) {
        case GET_ALL_CATEGORIES_REQUEST: 
            return {
                loading: true,
                categories: []
            }
        case GET_ALL_CATEGORIES_SUCCESS: 
            return {
                ...state ,
                loading: false,
                categories: action.payload.categories,
                
         }   
         case GET_ALL_CATEGORIES_FAIL:
             return {
                 loading:false,
                 error : action.payload
             }

             case CLEAR_ERRORS: 
             return {
                 ...state,
                 error: null
             }


        default:
            return state;
    }

}

