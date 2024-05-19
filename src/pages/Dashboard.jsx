import React, { useState, useMemo } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import useData from '../hooks/useData';
import Layout from './Layout';
import axios from '../axios'; 

const Dashboard = () => {
    const { data: products, loading, error, setData: setProducts } = useData('/dashboard');
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState(null);
    const [hiddenProducts, setHiddenProducts] = useState([]);

    const hideProduct = (id) => {
        setHiddenProducts([...hiddenProducts, id]);
    };

    const sortedProducts = useMemo(() => {
        if (!products) return [];
        let sortableProducts = [...products];
        if (sortConfig !== null) {
            sortableProducts.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableProducts;
    }, [products, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const filteredProducts = useMemo(() => {
        return sortedProducts.filter(product =>
            !hiddenProducts.includes(product.id) &&
            (product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.id.toString().includes(search))
        );
    }, [sortedProducts, search, hiddenProducts]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Layout>
            <Form.Control
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('id')}>ID</th>
                        <th onClick={() => requestSort('name')}>Name</th>
                        <th onClick={() => requestSort('price')}>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.selling_price}rs</td>
                            <td>
                                <Button variant="danger" onClick={() => hideProduct(product.id)}>Check</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Layout>
    );
};

export default Dashboard;
