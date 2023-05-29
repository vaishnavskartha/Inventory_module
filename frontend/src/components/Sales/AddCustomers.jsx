import axios from 'axios';
import React, { useState } from 'react'
import ViewCustomer from './ViewCustomer';
import Navbar from '../Navbar/Navbar';

const AddCustomers = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [billing_address, setBillingAddress] = useState('');
    const [reload, setReload] = useState(false);

    const addCustomer = async (e) => {
        try {
            e.preventDefault();
            setReload(false);
            const response = await axios.post('http://localhost:5000/customer', { name, email, phone_number, billing_address });
            if (response && response.data.success) {
                alert('Customer Created !!!');
                setReload(true);
                setName('');
                setEmail('');
                setPhoneNumber('');
                setBillingAddress('');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Navbar />
            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Add Customer</p>
            <form className='row col-sm-12 col-md-6 mx-auto'>
                <label>Name</label>
                <input type="text" onChange={(e) => { setName(e.target.value) }} value={name} />
                <p></p>

                <label>Email</label>
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                <p></p>

                <label>Phone Number</label>
                <input type="number" onChange={(e) => { setPhoneNumber(e.target.value) }} value={phone_number} />
                <p></p>

                <label>Billing Address</label>
                <input type="text" onChange={(e) => { setBillingAddress(e.target.value) }} value={billing_address} />
                <p></p>

                <button className="btn btn-primary" onClick={(e) => { addCustomer(e) }}>Submit</button>
            </form>
            <p className='text-center text-primary mt-4' style={{ fontSize: '21px' }}>Avaliable Customers</p>
            <ViewCustomer reload={reload} />
            <br /><br />
        </>
    )
}

export default AddCustomers