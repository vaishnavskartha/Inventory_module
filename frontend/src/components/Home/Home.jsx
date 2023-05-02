import React from 'react'
import {Link, useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate();

    const Home = (e) => {
        e.preventDefault();
        navigate('/', { replace: true });
    }

    const itemsGroup = (e) => {
        e.preventDefault();
        navigate('/item-groups', { replace: true });
    }

    const items = (e) => {
        e.preventDefault();
        navigate('/viewitems', { replace: true });
    }

    const inventoryAdjustment = (e) => {
        e.preventDefault();
        navigate('/inventoryadjustments', { replace: true })
    };

    const addItems = (e) => {
        e.preventDefault();
        navigate('/items', { replace: true })
    };

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
                                <Link onClick={Home} to={'/'} aria-current="page">
                                    <button className='btn btn-primary'>Home</button>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link onClick={items} to={'/viewitems'} aria-current="page">
                                    <button className='btn btn-primary'>Items</button>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link onClick={itemsGroup} to={'/item-groups'} aria-current="page">
                                    <button className='btn btn-primary'>Items Group </button>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link onClick={addItems} to={'/items'} aria-current="page">
                                    <button className='btn btn-primary'>Add Items</button>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link onClick={inventoryAdjustment} to={'/inventoryadjustments'} aria-current="page">
                                    <button className='btn btn-primary'>Inventory Adjustments</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* <button onClick={(e) => { Home(e) }}>Home</button>
            <button onClick={(e) => { itemsGroup(e) }}>Items Group</button>
            <button onClick={(e) => { items(e) }}>View Items</button>
            <button onClick={(e) => { addItems(e) }}>Add Items</button>
            <button onClick={(e) => { inventoryAdjustment(e) }}>Inventory Adjustment</button> */}
        </>
    )
}

export default Home