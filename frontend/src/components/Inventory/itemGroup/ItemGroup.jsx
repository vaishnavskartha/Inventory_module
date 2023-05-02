import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';

const ItemGroup = () => {

    const [item_group_label, setItemGroupLabel] = useState('');
    const [groupData, setGroupData] = useState([]);
    const navigate = useNavigate();

    const addGroup = async (e) => {
        try {
            e.preventDefault();
        const response = await axios.post('http://localhost:5000/items-group', { item_group_label });
        if (response && response.data.success) {
            alert('Item Group Added Successfull !!!');
            await getGroup();
        };
        } catch (error) {
            console.error(error.message);
        }
    }

    const getGroup = async () => {
        try {
            const response = await axios.get('http://localhost:5000/items-group');
        if (response && response.data.success) {
            setGroupData(response.data.success);
        }
        } catch (error) {
            console.error(error.message);
        }
    }

    const home = (e) => {
        e.preventDefault();
        navigate('/',{replace:true})
    }

    useEffect(() => {
        getGroup();
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
            <form>
                <label>Item group</label>
                <input type="text" onChange={(e) => { setItemGroupLabel(e.target.value) }} />
                <button onClick={(e) => { addGroup(e) }} type='submit'>Add item group</button>
            </form>

            {groupData.map((value, index) => {
                return (
                    <p key={index}>{value.item_group_label}</p>
                )
            })}
        </>
    )
}

export default ItemGroup