import React , { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from "../layout/MetaData";


const OrderSuccess = () => {
    return (
        <Fragment>
            <MetaData title={'Order Success'} />

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="https://res.cloudinary.com/dwimpn0nk/image/upload/v1612516829/avatars/order_success_jljdok.png" alt="Order Success" width="200" height="200" />
                    <h3>Thank you for your purchase!</h3>

                    <h2>Your Order has been placed successfully.</h2>
                    


                    <Link to="/orders/me">Go to Orders</Link>
                </div>

            </div>
        </Fragment>
    )
}

export default OrderSuccess
