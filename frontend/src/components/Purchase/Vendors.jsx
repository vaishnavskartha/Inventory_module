import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import ViewVendors from './ViewVendors';

const Vendors = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [payment_terms, setPaymentTerms] = useState('');
    const [reload, setReload] = useState(false);

    const addVendors = async (e) => {
        try {
            e.preventDefault();
            setReload(false);
            const response = await axios.post('http://localhost:5000/vendors', { name, email, phone_number, address, payment_terms });
            if (response && response.data.success) {
                alert('Vendors Created !!!');
                setReload(true);
                setName('');
                setEmail('');
                setPhoneNumber('');
                setAddress('');
                setPaymentTerms('');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Navbar />

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Vendors</p>

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

                <label>Address</label>
                <input type="text" onChange={(e) => { setAddress(e.target.value) }} value={address} />
                <p></p>

                <label>Payment Terms</label>
                <input type="number" onChange={(e) => { setPaymentTerms(e.target.value) }} value={payment_terms} placeholder='No of Days'/>
                <p></p>

                <button className="btn btn-primary" onClick={(e) => { addVendors(e) }}>Submit</button>
                <p></p>
            </form>

            <ViewVendors reload={reload} />
            <br /><br />
        </>
    )
}

export default Vendors