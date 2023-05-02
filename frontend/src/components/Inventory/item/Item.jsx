import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

const Item = () => {

    const [item_group_id, setItemGroupId] = useState('');
    const [itemGroupData, setItemGroupData] = useState([]);
    const [item_name, setItemName] = useState('');
    const [unit, setUnit] = useState('');
    const [dimensions, setDimensions] = useState({
        length: '',
        width: '',
        height: ''
    });
    const [weight, setWeight] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [brand, setBrand] = useState('');
    const [selling_price, setSellingPrice] = useState('');
    const [cost_price, setCostPrice] = useState('');
    const [description, setDescription] = useState('');
    const [opening_stock, setopening_stock] = useState('');
    const [reorder_point, setReorderPoint] = useState('');
    const [preferred_vendor, setPreferredVendor] = useState('');
    const [image_of_item, setImageOfItem] = useState('');
    const navigate = useNavigate();

    const addItems = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/items', {
                item_group_id,
                item_name,
                unit,
                dimensions,
                weight,
                manufacturer,
                brand,
                selling_price,
                cost_price,
                description,
                opening_stock,
                reorder_point,
                preferred_vendor,
                image_of_item
            });
            if (response && response.data.success) {
                alert('Item added successfull !!!');
                navigate('/viewitems', { replace: true });
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const home = (e) => {
        e.preventDefault();
        navigate('/', { replace: true })
    };

    useEffect(() => {
        const getItemsGroup = async () => {
            const response = await axios.get('http://localhost:5000/items-group');
            if (response && response.data.success) {
                setItemGroupData(response.data.success);
            }
        }
        getItemsGroup();
    }, []);


    return (
        <>  
            <nav class="navbar navbar-expand-lg bg-primary">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                        
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link onClick={home} to={'/'} aria-current="page">
                                    <button className='btn btn-primary'>Home</button>
                                </Link>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
            <form onSubmit={addItems}>
                <select className="form-select w-100" value={item_group_id} onChange={(e) => { setItemGroupId(e.target.value) }}>
                    <option value="" disabled={true}>Item Group</option>
                    {itemGroupData.map((item, index) => {
                        return (
                            <option key={index} value={item._id}>{item.item_group_label}</option>
                        )
                    })}
                </select>

                <label>item name</label>
                <input type='text' onChange={(e) => { setItemName(e.target.value) }}></input>

                <label>unit</label>
                <input type='text' onChange={(e) => { setUnit(e.target.value) }}></input>

                <label>Dimensions</label>
                <input type='text' onChange={(e) => { setDimensions({ length: e.target.value, width: dimensions.width, height: dimensions.height }) }}></input>
                <input type='text' onChange={(e) => { setDimensions({ length: dimensions.length, width: e.target.value, height: dimensions.height }) }}></input>
                <input type='text' onChange={(e) => { setDimensions({ length: dimensions.length, width: dimensions.width, height: e.target.value }) }}></input>

                <label>weight</label>
                <input type='number' onChange={(e) => { setWeight(e.target.value) }}></input>

                <label>manufacturer</label>
                <input type='text' onChange={(e) => { setManufacturer(e.target.value) }}></input>

                <label>brand</label>
                <input type='text' onChange={(e) => { setBrand(e.target.value) }}></input>

                <label>selling price</label>
                <input type='number' onChange={(e) => { setSellingPrice(e.target.value) }}></input>

                <label>cost price</label>
                <input type='number' onChange={(e) => { setCostPrice(e.target.value) }}></input>

                <label>description</label>
                <input type='text' onChange={(e) => { setDescription(e.target.value) }}></input>

                <label>opening stock</label>
                <input type='number' onChange={(e) => { setopening_stock(e.target.value) }}></input>

                <label>reorder_point</label>
                <input type='number' onChange={(e) => { setReorderPoint(e.target.value) }}></input>

                <label>preferred vendor</label>
                <input type='text' onChange={(e) => { setPreferredVendor(e.target.value) }}></input>

                <label>image of item</label>
                <input type="file" onChange={(e) => { setImageOfItem(e.target.value) }} />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default Item