import axios from 'axios';
import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const ReturnForm = () => {

    const order_id = sessionStorage.getItem('OrderId');
    const item_id = sessionStorage.getItem('ItemId');
    const customer_name = sessionStorage.getItem('CustomerName');
    const item_name = sessionStorage.getItem('ItemName');
    const quantity = sessionStorage.getItem('Quantity');
    const selling_price = sessionStorage.getItem('SellingPrice');
    const [returned_quantity, setReturnedQuantity] = useState('');
    const [returned_date, setReturnedDate] = useState('');
    const [reason, setReason] = useState('');
    const navigate = useNavigate();

    const returnItems = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/salesreturn', {
            order_id,
            customer_name,
            item_id,
            item_name,
            ordered_quantity: quantity,
            returned_quantity,
            returned_date,
            reason,
            selling_price,
            status: 'Checking',
            sales_order_status: 'Return in Process'
        });
        if (response && response.data.success) {
            alert('Items added for Checking')
            navigate('/viewreturn', { replace: true })
        }
    };

    return (
        <>
            <Navbar />

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Create Returns</p>

            <form className='row col-sm-12 col-md-6 mx-auto'>
                <label>Order Id</label>
                <input disabled defaultValue={order_id} />
                <p></p>

                <label>Customer Name</label>
                <input disabled defaultValue={customer_name} />
                <p></p>

                <label>Item Name</label>
                <input disabled defaultValue={item_name} />
                <p></p>

                <label>Quantity</label>
                <input disabled defaultValue={quantity} />
                <p></p>

                <label>Returned Quantity</label>
                <input type="number" value={returned_quantity} onChange={(e) => { setReturnedQuantity(e.target.value) }} />
                <p></p>

                <label>Reason</label>
                <input type="text" value={reason} onChange={(e) => { setReason(e.target.value) }} />
                <p></p>

                <label>Returned Date</label>
                <input type="date" value={returned_date} onChange={(e) => { setReturnedDate(e.target.value) }} />
                <p></p>
                
                <button  className="btn btn-primary" onClick={(e) => { returnItems(e) }}>Submit</button>
            </form>
            <br /><br />
        </>
    )
}

export default ReturnForm