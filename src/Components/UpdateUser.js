import React, { useState } from 'react';
import UserService from '../Services/UserService';
import '../styles.css';

const UpdateUser = () => {
    const [user, setUser] = useState({
        id: '',
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
        UserService.updateUser(user)
            .then((response) => {
                alert('User updated successfully');
                setUser({
                    id: '',
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
                alert('There was an error updating the user!' + error);
            });
    };

    return (
        <>
            <h2>Update User</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>User ID:</label>
                    <input
                        type="text"
                        name="id"
                        value={user.id}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                    <input
                        type="text"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        required
                    />
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
                <button type="submit">Update User</button>
            </form>
        </>
    );
};

export default UpdateUser;
