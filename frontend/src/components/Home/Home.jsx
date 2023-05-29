import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Home = () => {

    const [totalStock, setTotalStock] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [totalQuantitySales, setTotalQuantitySales] = useState('');
    const [totalPriceSales, setTotalPriceSales] = useState('');
    const [salesOrderData, setSalesOrderData] = useState([]);
    const [filter, setFilter] = useState('');//xx
    const [customerOrItemsData, setCustomerOrItemsData] = useState([]);
    const [filterId, setFilterId] = useState('');

    const getItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/items');
            if (response && response.data.success) {
                const totalStock = response.data.success.reduce((total, item) => total + item.opening_stock, 0);
                setTotalStock(totalStock);
                const totalPrice = response.data.success.reduce((total, price) => total + price.selling_price * price.opening_stock, 0);
                setTotalPrice(totalPrice)
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const getSalesOrders = async () => {
        const response = await axios.get('http://localhost:5000/salesorder');
        if (response && response.data.success) {
            setSalesOrderData(response.data.success)
            const totalItemSales = response.data.success.reduce((total, item) => total + item.quantity, 0);
            setTotalQuantitySales(totalItemSales);
            const totalPriceSales = response.data.success.reduce((total, price) => total + price.total_price, 0);
            setTotalPriceSales(totalPriceSales);
        }
    }

    const filterSales = async (e) => {
        e.preventDefault();
        if (filter === "Customer") {
            await getSpecSalesByCustomers(filterId);
        }
        else if (filter === "Items") {
            await getSpecSalesByItems(filterId);
        }
    }

    const getSpecSalesByCustomers = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/salesorderbycustomers/${id}`);
            if (response && response.data.success) {
                setSalesOrderData(response.data.success);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getSpecSalesByItems = async (filterId) => {
        try {
            const response = await axios.get(`http://localhost:5000/salesorderbyitems/${filterId}`);
            if (response && response.data.success) {
                setSalesOrderData(response.data.success);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getCustomer = async () => {
        const response = await axios.get('http://localhost:5000/customer');
        if (response && response.data.success) {
            setCustomerOrItemsData(response.data.success);
        }
    };

    const getItemsList = async () => {
        const response = await axios.get('http://localhost:5000/items');
        if (response && response.data.success) {
            setCustomerOrItemsData(response.data.success)
        }
    }

    const handleFilter = async (e) => {
        setFilter(e.target.value)
        if (e.target.value === "Customer") {
            await getCustomer();
        } else if (e.target.value === "Items") {
            await getItemsList();
        }
    }

    const resetSales = async (e) => {
        e.preventDefault();
        await getSalesOrders();
        setFilter('');
        setFilterId('');
        setCustomerOrItemsData([]);
    }

    useEffect(() => {
        getItems();
        getSalesOrders();
        getCustomer();
    }, [])

    return (
        <>
            <Navbar />

            <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <div className="card text-bg-primary mb-3" style={{ maxWidth: '100%' }}>
                            <div className="card-header">Reports</div>
                            <div className="card-body">
                                <h5 className="card-title">Inventory Summary</h5>
                                <p className="card-text">Total Stock : {totalStock.toLocaleString('en-IN')}</p>
                                <p className="card-text">Total Price : {totalPrice.toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <div className="card text-bg-primary mb-3" style={{ maxWidth: '100%' }}>
                            <div className="card-header">Reports</div>
                            <div className="card-body">
                                <h5 className="card-title">Inventory Aging Summary </h5>
                                <br />
                                <p></p>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                <Link to={'/inventoryaging'} replace={true} className="card-link text-white h6">View Report</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <div className="card text-bg-primary mb-3" style={{ maxWidth: '100%' }}>
                            <div className="card-header">Reports</div>
                            <div className="card-body">
                                <h5 className="card-title">Product Sales</h5>
                                <p className="card-text">Total Units Sold : {totalQuantitySales.toLocaleString('en-IN')}</p>
                                <p className="card-text">Total Sales : {totalPriceSales.toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="card text-bg-primary mb-3" style={{ maxWidth: '100%' }}>
                            <div className="card-header">
                                Reports
                                {/* xx */}
                                <div className="row">
                                    <div className="d-flex justify-content-end">
                                        <div className="form-group d-flex">
                                            <label htmlFor="range" className="me-4 mt-auto">Filter</label>
                                            <select id="range" className="form-control me-2 mt-4" value={filter} onChange={handleFilter}>
                                                <option value="">--Select--</option>
                                                <option value="Customer">Customer</option>
                                                <option value="Items">Items</option>
                                            </select>

                                            <label htmlFor="range" className="mr-2 mt-auto me-4 text-nowrap">Customer / Items Name</label>
                                            <select id="range" className="form-control mt-4" value={filterId} onChange={(e) => { setFilterId(e.target.value) }}>
                                                <option value="">--Select--</option>
                                                {customerOrItemsData.map((value, index) => {
                                                    return filter === "Customer" ? (
                                                        <option key={index} value={value.customer_name}>{value.name}</option>
                                                    ) : filter === "Items" && (
                                                        <option key={index} value={value._id}>{value.item_name}</option>
                                                    );
                                                })}

                                            </select>
                                        </div>
                                        <button className="btn btn-success mt-4 ms-3" onClick={(e) => { filterSales(e) }}>Submit</button>
                                        <button className="btn btn-danger mt-4 ms-3" onClick={(e) => { resetSales(e) }}>Reset</button>
                                    </div>
                                </div>
                                {/* xx */}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Sales by Items / Customer</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <Link className="card-link text-white h6">View Report</Link> */}

                                <div className="table table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ color: 'white' }}>Sales Date</th>
                                                <th scope="col" style={{ color: 'white' }}>Sales Id</th>
                                                <th scope="col" style={{ color: 'white' }}>Customer Name</th>
                                                <th scope="col" style={{ color: 'white' }}>Item</th>
                                                <th scope="col" style={{ color: 'white' }}>Item Group</th>
                                                <th scope="col" style={{ color: 'white' }}>Quantity</th>
                                                <th scope="col" style={{ color: 'white' }}>Unit Price</th>
                                                <th scope="col" style={{ color: 'white' }}>Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {salesOrderData.map((value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td style={{ color: 'white' }}>{moment(value.date).format('DD-MM-YYYY')}</td>
                                                        <td style={{ color: 'white' }}>{value.order_id}</td>
                                                        <td style={{ color: 'white' }}>{value.customer_name}</td>
                                                        <td style={{ color: 'white' }}>{value.item_name}</td>
                                                        <td style={{ color: 'white' }}>{value.item_group}</td>
                                                        <td style={{ color: 'white' }}>{value.quantity}</td>
                                                        <td style={{ color: 'white' }}>{value.selling_price.toLocaleString('en-IN')}</td>
                                                        <td style={{ color: 'white' }}>{value.total_price.toLocaleString('en-IN')}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home