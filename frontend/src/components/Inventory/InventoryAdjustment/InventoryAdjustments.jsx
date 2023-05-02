import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';

const InventoryAdjustments = () => {

    const [itemsGroupData, setItemsGroupData] = useState([]);
    const navigate = useNavigate();

    const getItemsGroup = async () => {
        try {
            const response = await axios.get('http://localhost:5000/items-group');
            if (response && response.data.success) {
                setItemsGroupData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const manage = (e, value) => {
        e.preventDefault();
        sessionStorage.setItem('ManageID', value._id);
        navigate('/inventory-items', { replace: true });
    };

    const getReports = (e) => {
        e.preventDefault();
        navigate('/adjustment-reports');
    }

    const home = (e) => {
        e.preventDefault();
        navigate('/', { replace: true })
    }

    useEffect(() => {
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
                        <li class="nav-item">
                            <Link onClick={getReports} to={'/adjustment-reports'} aria-current="page">
                                <button className='btn btn-primary'>Reports</button>
                            </Link>
                        </li>


                    </ul>
                </div>
            </div>
        </nav>
            {/* <button onClick={(e) => { home(e) }}>Home</button>
            <button onClick={(e) => { getReports(e) }}>Reports</button> */}
            <div className="table table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Group Name</th>
                            <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsGroupData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <th>{value.item_group_label}</th>
                                    <th>
                                        <button onClick={(e) => { manage(e, value) }}>Manage</button>
                                    </th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default InventoryAdjustments