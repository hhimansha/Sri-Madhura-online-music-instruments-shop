import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    TextField,
    Button,
    Grid,
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
import emailjs from 'emailjs-com';
import AdminNav from '../Admin/AdminDash';
import * as XLSX from 'xlsx';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: 1800,
        paddingLeft: 200
    },
    header: {
        backgroundColor: theme.palette.dark,
        color: theme.palette.primary,
        paddingTop: theme.spacing(4),
        textAlign: 'center',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    section: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(10),
        marginLeft: theme.spacing(60),
        marginRight: theme.spacing(60),
    },
    form: {
        marginTop: theme.spacing(3),

    },
    table: {
        marginTop: theme.spacing(5),
        marginLeft: '150px',
    },
    tableHead: {
        backgroundColor: '#ffcc80',
        fontWeight: 'bold',
    },
    rowEven: {
        backgroundColor: '#f0f0f0',
    },
    rowOdd: {
        backgroundColor: '#e0e0e0',
    },
    actionButton: {
        marginRight: theme.spacing(1),
    },
}));

function BulkOrderRequestAdmin() {
    const classes = useStyles();
    const [price, setPrice] = useState('');
    const [details, setDetails] = useState([]);
    const [editvalue, setEditvalue] = useState(false);
    const form = useRef();

    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        try {
            const response = await axios.get('http://localhost:5050/request/allRequests');
            const detailsWithId = response.data.map((details, index) => ({
                id: index + 1,
                ...details
            }));
            setDetails(detailsWithId);
        } catch (error) {
            console.error('Error fetching Item details:', error);
        }
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleDelete = async (rid) => {
        try {
            await axios.delete(`http://localhost:5050/request/deleteRequest/${rid}`);
            Swal.fire({
                title: "Success!",
                text: "Request deleted successfully.",
                icon: 'success',
                confirmButtonText: "OK"
            });
            fetchDetails();
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

    const handleEdit = (rid, itemId, item, quantity, status, price, mail) => {
        const editdata = { rid, itemId, item, quantity, status, price, mail };
        localStorage.setItem("editdata", JSON.stringify(editdata));
        setPrice(price);
        setEditvalue(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const info = JSON.parse(localStorage.getItem("editdata"));
        const data = { rid: info.rid, itemId: info.itemId, item: info.item, quantity: info.quantity, status: info.status, price: price, mail: info.mail };
        try {
            await axios.put(`http://localhost:5050/request/updateReq`, data);
            Swal.fire({
                title: "Success!",
                text: "Request updated successfully.",
                icon: 'success',
                confirmButtonText: "OK"
            });
            localStorage.setItem("editdata", JSON.stringify({}));
            fetchDetails();
            setEditvalue(false);
            setTimeout(() => {
                window.location.href = "/BulkOrderRequestAdmin";
            }, 1000);
        } catch (error) {
            console.error('Error updating Item:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update Request.",
                icon: 'error',
                confirmButtonText: "OK"
            });
            setTimeout(() => {
                window.location.href = "/BulkOrderRequestAdmin";
            }, 1000);
        }
    };

    const handleAccept = async (rid, itemId, item, quantity, status, price, mail) => {
        var status = 'Accepted';
        const data = { rid, itemId, item, quantity, status, price, mail };
        try {
            await axios.put('http://localhost:5050/request/updateReq', data).then(sendEmail(rid, price, mail));
            Swal.fire({
                title: "Success!",
                text: "Request Accepted successfully.",
                icon: 'success',
                confirmButtonText: "OK"
            });            

            setTimeout(() => {
                window.location.href = "/BulkOrderRequestAdmin";
            }, 2000);
        } catch (error) {
            console.error(error.message);
            Swal.fire({
                title: "Error!",
                text: "Failed",
                icon: 'error',
                confirmButtonText: "OK"
            });
            setTimeout(() => {
                window.location.href = "/BulkOrderRequestAdmin";
            }, 1000);
        }
    };

    const sendEmail = (rid, price, mail) => {
        const templateParams = {
            to_email: mail,
            request_id: rid,
            price: price
        };

        emailjs.send(
            'service_jugr1d4',
            'template_0y5hbry',
            templateParams,
            'IQPlzGATenisO_tQX'
        )
            .then((response) => {
                console.log('Email sent:', response);
            })
            .catch((error) => {
                console.error('Email sending failed:', error);
            });

        setTimeout(() => {
            window.location.href = "/BulkOrderRequestAdmin";
        }, 3000);
    };

    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(details);
        XLSX.utils.book_append_sheet(wb, ws, "Report Data");
        XLSX.writeFile(wb, 'report.xlsx');
    };

    return (
        <>
            <AdminNav />
            <div className={classes.root}>
                <div className={classes.header} style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <Typography variant="h3" component="h1" style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>Request Management</Typography>
                </div>
                <hr style={{ width: 100 }} />
                {editvalue && (
                    <section className={classes.section}>
                        <form ref={form} className={classes.form} onSubmit={handleEditSubmit}>
                            <Grid container spacing={3} direction="column">
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="price"
                                        label="Price"
                                        value={price}
                                        onChange={handlePriceChange}
                                        type='number'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit">
                                        Add Quotation
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </section>
                )}

                <section className={classes.table}>
                    <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                        <Button onClick={exportToExcel} style={{ backgroundColor: '#ff7900', color: 'white' }}>
                            Report Download
                        </Button>
                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="table">
                            <TableHead>
                                <TableRow className={classes.tableHead}>
                                    <TableCell>Request ID</TableCell>
                                    <TableCell>Item ID</TableCell>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Mail</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {details.map((details, index) => (
                                    <TableRow key={details.id} className={index % 2 === 0 ? classes.rowEven : classes.rowOdd}>
                                        <TableCell>{details.rid}</TableCell>
                                        <TableCell>{details.itemId}</TableCell>
                                        <TableCell>{details.item}</TableCell>
                                        <TableCell>{details.quantity}</TableCell>
                                        <TableCell>{details.status}</TableCell>
                                        <TableCell>{details.price}</TableCell>
                                        <TableCell>{details.mail}</TableCell>
                                        <TableCell>
                                            {details.price !== '0' && details.status !== 'Accepted' && details.status !== 'Completed' && (
                                                <Button variant="contained" color="primary" onClick={() => handleAccept(details.rid, details.itemId, details.item, details.quantity, details.status, details.price, details.mail)} className={classes.actionButton}>
                                                    Accept
                                                </Button>
                                            )}
                                            {details.status !== 'Completed' && (
                                                <>
                                                    <Button variant="contained" color="primary" onClick={() => handleEdit(details.rid, details.itemId, details.item, details.quantity, details.status, details.price, details.mail)} className={classes.actionButton}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(details.rid)} className={classes.actionButton}>
                                                        Delete
                                                    </Button>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </section>
            </div>
        </>
    );
}

export default BulkOrderRequestAdmin;
