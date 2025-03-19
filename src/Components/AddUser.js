import React, { useState } from 'react';
import UserService from '../Services/UserService';
import '../styles.css';

const AddUser = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        business_name: '',
        gst_number: '',
        address: '',
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.addUser(user)
            .then((response) => {
                alert('User added successfully');
                setUser({
                    name: '',
                    email: '',
                    password: '',
                    role: '',
                    business_name: '',
                    gst_number: '',
                    address: '',
                });
            })
            .catch((error) => {
                alert('There was an error adding the user!' + error);
            });
    };

    return (
        <>
            <h2>Add User</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select role</option>
                        <option value="Admin">Admin</option>
                        <option value="Accountant">Accountant</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Business Name:</label>
                    <input
                        type="text"
                        name="business_name"
                        value={user.business_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>GST Number:</label>
                    <input
                        type="text"
                        name="gst_number"
                        value={user.gst_number}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <textarea
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add User</button>
            </form>
        </>
    );
};

export default AddUser;
