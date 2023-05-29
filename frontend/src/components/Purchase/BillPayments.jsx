import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import moment from 'moment';

const BillPayments = () => {

    const [item_group, setItemGroup] = useState(sessionStorage.getItem('ItemGroup'));
    const [item, setitem] = useState(sessionStorage.getItem('Item'));
    const [order_quantity, setOrderQuantity] = useState(sessionStorage.getItem('OrderQuantity'));
    const [date, setDate] = useState(sessionStorage.getItem('Date'));
    const order_Date = moment(date).format('DD-MM-YYYY');
    const [vendors_name, setVendorsName] = useState(sessionStorage.getItem('VendorsName'));
    const [vendors_email, setVendorsEmail] = useState(sessionStorage.getItem('VendorsEmail'));
    const [vendors_phone_number, setVendorsPhoneNumber] = useState(sessionStorage.getItem('VendorsPhoneNumber'));
    const [payment_terms, setPaymentTerms] = useState(sessionStorage.getItem('PaymentTerms'))
    const [amount, setAmount] = useState(sessionStorage.getItem('Amount'));
    const [bill_reference, setBillReference] = useState('');
    const purchaseId = sessionStorage.getItem('PurchaseIdNew');
    const item_id = sessionStorage.getItem('ItemId');

    const addToBill = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/billpayments', {
            billing_date: new Date(),
            item_group,
            item,
            order_quantity,
            order_date: date,
            vendors_name,
            vendors_email,
            vendors_phone_number,
            payment_terms,
            amount,
            bill_reference,
            purchaseId: purchaseId,
            status: "Bills Received",
            item_id
        });
        if (response && response.data.success) {
            alert('Bill Added Successfully!!!');
        }
    }

    return (
        <>
            <Navbar />

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Bill Payments</p>

            <form className='row col-sm-12 col-md-6 mx-auto'>
                <label>Item Group</label>
                <input defaultValue={item_group} disabled={true} />
                <p></p>

                <label>Item</label>
                <input defaultValue={item} disabled={true} />
                <p></p>

                <label>Order Quantity</label>
                <input defaultValue={order_quantity} disabled={true} />
                <p></p>

                <label>Purchase Date</label>
                <input defaultValue={order_Date} disabled={true} />
                <p></p>

                <label>Vendors Name</label>
                <input defaultValue={vendors_name} disabled={true} />
                <p></p>

                <label>Vendors Email</label>
                <input defaultValue={vendors_email} disabled={true} />
                <p></p>

                <label>Vendors Phone Number</label>
                <input defaultValue={vendors_phone_number} disabled={true} />
                <p></p>

                <label>Vendors Payment Terms</label>
                <input defaultValue={payment_terms} disabled={true} />
                <p></p>

                <label>Amount</label>
                <input defaultValue={amount} disabled={true} />
                <p></p>

                <label>Vendor Bill Reference</label>
                <input type='number' onChange={(e) => { setBillReference(e.target.value) }} />
                <p></p>

                <button className="btn btn-primary" onClick={(e) => { addToBill(e) }}>Submit</button>
                <p></p>
                
            </form>
        </>
    )
}

export default BillPayments