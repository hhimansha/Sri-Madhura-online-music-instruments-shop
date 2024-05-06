import React, { useState, useEffect } from 'react';
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
import AdminNav from '../AdminDash';
import * as XLSX from 'xlsx';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        paddingLeft: 200
    },
    header: {
        backgroundColor: '#f0f0f0',
        padding: theme.spacing(1),
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    headerText: {
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    section: {
        width: '40%',
        height: '60%',
        marginTop: '30px', // Center vertically
        marginBottom: 'auto', // Center vertically
        marginLeft: 'auto', // Center horizontally
        marginRight: 'auto', // Center horizontally
    },
    form: {
        backgroundColor: 'rgba(255, 224, 178, 0.3)', // Light orange background color
        padding: theme.spacing(3), // Add padding for better appearance
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        marginTop: theme.spacing(3),
        paddingLeft: '250px',
        paddingRight: '100px',
        paddingBottom: '30px',
        overflowX: 'auto',
    },
    tableHeadCell: {
        backgroundColor: '#ffcc80',
        color: '#333',
        fontWeight: 'bold',
    },
    tableRowEven: {
        backgroundColor: '#e0e0e0',
    },
    tableRowOdd: {
        backgroundColor: '#f5f5f5',
    },
}));

function BulkOrderAdmin() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const uniqueId = generateId();
    const [details, setDetails] = useState([]);
    const [editvalue, setEditvalue] = useState(false);

    useEffect(() => {
        fetchDetails();
    }, []);

    function generateId() {
        let id = '';
        for (let i = 0; i < 9; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }

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

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handlePictureChange = (event) => {
        setPicture(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { uniqueId, name, type, brand, description, picture };
        console.log(data);
        try {
            await axios.post('http://localhost:5000/item/addItem', data);
            Swal.fire({
                title: "Success!",
                text: "Item Add successfully.",
                icon: 'success',
                confirmButtonText: "OK"
            });
            setTimeout(() => {
                window.location.href = "/BulkOrderAdmin";
            }, 1000);
        } catch (error) {
            console.error(error.message);
            Swal.fire({
                title: "Error!",
                text: "Failed",
                icon: 'error',
                confirmButtonText: "OK"
            });
            setTimeout(() => {
                window.location.href = "/BulkOrderAdmin";
            }, 1000);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5000/item/delete/${itemId}`);
            Swal.fire({
                title: "Success!",
                text: "Item deleted successfully.",
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

    const handleEdit = (uniqueId, name, type, brand, description, picture) => {
        setName(name);
        setType(type);
        setBrand(brand);
        setDescription(description);
        setPicture(picture);
        localStorage.setItem("uniqueId", uniqueId);
        setEditvalue(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const uniqueId = localStorage.getItem("uniqueId");
        const data = { uniqueId, name, type, brand, description, picture };
        try {
            await axios.put(`http://localhost:5000/item/update`, data);
            Swal.fire({
                title: "Success!",
                text: "Item updated successfully.",
                icon: 'success',
                confirmButtonText: "OK"
            });
            fetchDetails();
            setEditvalue(false);
            setTimeout(() => {
                window.location.href = "/BulkOrderAdmin";
            }, 1000);
        } catch (error) {
            console.error('Error updating Item:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update Item.",
                icon: 'error',
                confirmButtonText: "OK"
            });
            setTimeout(() => {
                window.location.href = "/BulkOrderAdmin";
            }, 1000);
        }
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
                <div className={classes.header}>
                    {editvalue ? (
                        <Typography variant="h3" component="h1">Edit Instrument</Typography>
                    ) : (
                        <div className={classes.header}>
                            <Typography variant="h3" component="h1" className={classes.headerText}>
                                Add Bulk Order Instruments
                            </Typography>
                        </div>
                    )}
                </div>
                <hr style={{ width: 100 }}></hr>
                <section className={classes.section}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={3} direction="column">
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Instrument Name"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="type"
                                    label="Instrument Type"
                                    value={type}
                                    onChange={handleTypeChange}
                                    type='type'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="brand"
                                    label="Brand"
                                    value={brand}
                                    onChange={handleBrandChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="picture"
                                    label="Image URL"
                                    value={picture}
                                    onChange={handlePictureChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    value={description}
                                    onChange={handleDescriptionChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {editvalue ? (
                                    <Button variant="contained" color="primary" onClick={handleEditSubmit}>
                                        Edit
                                    </Button>
                                ) : (
                                    <Button variant="contained" style={{ backgroundColor: '#ff7900', color: 'white' }} type="submit">
                                        Save
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </section>
                <section className={classes.table}>
                    <div style={{ textAlign: 'right', margin: '10px' }}>
                        <Button onClick={exportToExcel} style={{ backgroundColor: '#ff7900', color: 'white' }}>
                            Report Download
                        </Button>
                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="table" className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHeadCell}>ID</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Name</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Type</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Brand</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Description</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Picture</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {details.map((details, index) => (
                                    <TableRow key={details.id} className={index % 2 === 0 ? classes.tableRowEven : classes.tableRowOdd}>
                                        <TableCell>{details.uniqueId}</TableCell>
                                        <TableCell>{details.name}</TableCell>
                                        <TableCell>{details.type}</TableCell>
                                        <TableCell>{details.brand}</TableCell>
                                        <TableCell>{details.description}</TableCell>
                                        <TableCell>
                                            <img src={details.picture} alt="Item" style={{ width: '50px', height: '50px' }} />
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="secondary" onClick={() => handleDelete(details.uniqueId)}>
                                                Delete
                                            </Button>{' '}
                                            <Button variant="contained" color="primary" onClick={() => handleEdit(details.uniqueId, details.name, details.type, details.brand, details.description, details.picture)}>
                                                Edit
                                            </Button>
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

export default BulkOrderAdmin;



