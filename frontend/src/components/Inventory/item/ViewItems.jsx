import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

const ViewItems = () => {

    const [itemsData, setItemsData] = useState([]);
    const navigate = useNavigate();

    const getItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/items');
            if (response && response.data.success) {
                setItemsData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const home = (e) => {
        e.preventDefault();
        navigate('/', { replace: true })
    }

    useEffect(() => {
        getItems()
    }, [])


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
            <div className="table table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th scope="col">Group</th> */}
                            <th scope="col">Item Name</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Dimensions</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Manufacturer</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Selling Price</th>
                            <th scope="col">cost price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Opening Stock</th>
                            <th scope="col">Reorder point</th>
                            <th scope="col">Preferred Vendor</th>
                            <th scope="col">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    {/* <th>{value.item_group}</th> */}
                                    <th>{value.item_name}</th>
                                    <th>{value.unit}</th>
                                    <th>{`${value.dimensions.length} L ${value.dimensions.width} W ${value.dimensions.height} H`}</th>
                                    <th>{value.weight}</th>
                                    <th>{value.manufacturer}</th>
                                    <th>{value.brand}</th>
                                    <th>{value.selling_price}</th>
                                    <th>{value.cost_price}</th>
                                    <th>{value.description}</th>
                                    <th>{value.opening_stock}</th>
                                    <th>{value.reorder_point}</th>
                                    <th>{value.preferred_vendor}</th>
                                    <th>{value.image_of_item}</th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ViewItems;