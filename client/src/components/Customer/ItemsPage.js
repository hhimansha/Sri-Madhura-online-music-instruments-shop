import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Grid,
    Typography,
    TextField,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import TopNav from '../topNav';
import Footer from '../Footer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    section: {
        marginTop: theme.spacing(5),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        marginBottom: theme.spacing(10),
    },
    card: {
        maxWidth: '60%',
        maxHeight: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: '5px', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    cardContent: {
        flexGrow: 1,
    },
    button: {
        marginTop: theme.spacing(2),
    },
    quantityField: {
        marginTop: theme.spacing(2),
    },
    header: {
        textAlign: 'center',
        marginBottom: theme.spacing(3),
    },
    table: {
        marginTop: theme.spacing(3),
        paddingLeft: '100px',
        paddingRight: '100px',
        paddingBottom: '30px',
    },
    tableHeadCell: {
        backgroundColor: '#ffcc80',
        fontWeight: 'bold',
    },
    tableRowEven: {
        backgroundColor: '#e0e0e0',
    },
    tableRowOdd: {
        backgroundColor: '#f5f5f5',
    },
}));

function ItemsPage() {
    const classes = useStyles();
    const [details, setDetails] = useState([]);
    const [orderdetails, setOrderDetails] = useState([]);

    useEffect(() => {
        fetchDetails();
        fetchOrderDetails();
    }, []);

    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/request/allRequests');
            const detailsWithId = response.data.map((details, index) => ({
                id: index + 1,
                ...details
            }));
            setOrderDetails(detailsWithId);
        } catch (error) {
            console.error('Error fetching Item details:', error);
        }
    };

    const fetchDetails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/item/allItem');
            const detailsWithId = response.data.map((details, index) => ({
                id: index + 1,
                ...details
            }));
            setDetails(detailsWithId);
        } catch (error) {
            console.error('Error fetching Item details:', error);
        }
    };

    const handleApply = async (product) => {
        const quantityInput = document.getElementById(`quantity-${product.id}`).value;
        const quantity = parseInt(quantityInput);

        if (isNaN(quantity) || quantity <= 0) {
            Swal.fire({
                title: 'Invalid Quantity',
                text: 'Please enter a valid quantity greater than 0.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const data = {
            rid: Math.floor(Math.random() * 1000),
            itemId: product.id,
            item: product.name,
            quantity: quantity,
            status: 'Pending',
            price: '0',
            mail: 'b.a.amadhihansani02@gmail.com'
        };

        try {
            await axios.post('http://localhost:5000/request/addRequest', data);
            Swal.fire({
                title: 'Product Requested',
                text: product.name + ' Requested successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            setTimeout(() => {
                window.location.href = "/ItemsPage";
            }, 1000);
        } catch (error) {
            console.error('Error requesting item:', error);
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while requesting the item. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            setTimeout(() => {
                window.location.href = "/ItemsPage";
            }, 1000);
        }
    };

    const handleDelete = async (rid) => {
        try {
            await axios.delete(`http://localhost:5000/request/deleteRequest/${rid}`);
            Swal.fire({
                title: "Success!",
                text: "Request deleted successfully.",
                icon: 'success',
                confirmButtonText: "OK"
            });
            fetchOrderDetails();
        } catch (error) {
            console.error('Error deleting Item:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to delete Item.",
                icon: 'error',
                confirmButtonText: "OK"
            });
        }
    };

    const handleAccept = async (rid, itemId, item, quantity, status, price, mail) => {
        var status = 'Completed';
        const data = { rid, itemId, item, quantity, status, price, mail };
        try {
            await axios.put('http://localhost:5000/request/updateReq', data);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <TopNav />
            <div className={classes.root}>
                <br />
                <div className={classes.header} style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <Typography variant="h3" style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
                        Bulk Order Instruments
                    </Typography>
                </div>
                <Grid container spacing={3} className={classes.section}>
                    {details.map(product => (
                        <Grid item xs={12} sm={6} md={4} key={product.uniqueId}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography variant="h5" style={{  fontWeight: 'bold' }} gutterBottom>{product.name}</Typography>
                                    <Typography variant="subtitle1"  style={{  fontWeight: 'bold' }} gutterBottom>{product.type}</Typography>
                                    <Divider style={{ marginBottom: '10px' }} />
                                    <Typography variant="body2"  style={{  fontWeight: 'bold' }} gutterBottom><strong>Brand:</strong> {product.brand}</Typography>
                                    <Typography variant="body2"  style={{  fontWeight: 'bold' }}gutterBottom><strong>Description:</strong></Typography>
                                    <Typography variant="body2"  style={{  fontWeight: 'bold' }}paragraph>{product.description}</Typography>
                                    <Divider style={{ marginBottom: '10px' }} />
                                    <img src={product.picture} alt={product.name} style={{ width: '225px', height: '260px', marginBottom: '10px', marginLeft: '51px' }} />
                                    <TextField
                                        type="number"
                                        label="Quantity"
                                        defaultValue={product.quantity}
                                        InputProps={{ inputProps: { min: 1 } }}
                                        fullWidth
                                        id={`quantity-${product.id}`}
                                        className={classes.quantityField}
                                    />
                                    <Button
                                    variant="contained"
                                    className={classes.button}
                                    style={{ backgroundColor: '#ff7900', color: 'black' }}
                                     onClick={() => handleApply(product)}
                                     >
                                    Order
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.header} style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <Typography variant="h3" component="h1" style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>Manage Your Requests</Typography>
                </div>
                <hr style={{ width: 100 }} />
                <section className={classes.table}>
                    <TableContainer component={Paper}>
                        <Table aria-label="ticket table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHeadCell}>Request ID</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Item ID</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Item Name</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Quantity</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Status</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Price</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Mail</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderdetails.map((details, index) => (
                                    <TableRow key={details.id} className={index % 2 === 0 ? classes.tableRowEven : classes.tableRowOdd}>
                                        <TableCell>{details.rid}</TableCell>
                                        <TableCell>{details.itemId}</TableCell>
                                        <TableCell>{details.item}</TableCell>
                                        <TableCell>{details.quantity}</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>{details.status}</TableCell>
                                        <TableCell>{details.price}</TableCell>
                                        <TableCell>{details.mail}</TableCell>
                                        <TableCell>
                                            {details.status === 'Accepted' ? (
                                                <>
                                                    <Button variant="contained" color="success" onClick={() => handleAccept(details.rid, details.itemId, details.item, details.quantity, details.status, details.price, details.mail)}>
                                                        Accept
                                                    </Button>
                                                    &nbsp;  &nbsp;
                                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(details.rid)}>
                                                        Reject
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button variant="contained" color="secondary" disabled>
                                                    Disabled
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default ItemsPage;

