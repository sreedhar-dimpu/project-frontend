import React, { useState } from 'react';
import UserService from '../Services/UserService';
import '../styles.css';

const GetUserById = () => {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setUserId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.getUserById(userId)
            .then((response) => {
                setUser(response.data);
                setError('');
            })
            .catch((error) => {
                setError('There was an error fetching the user: ' + error.message);
                setUser(null);
            });
    };

    return (
        <>
            <h2>Get User By ID</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>User ID:</label>
                    <input
                        type="text"
                        name="userId"
                        value={userId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Get User</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {user && (
                <div className="user-details">
                    <h3>User Details</h3>
                    <table className="details-table">
                        <tbody>
                            <tr>
                                <th>ID:</th>
                                <td>{user.id}</td>
                            </tr>
                            <tr>
                                <th>Name:</th>
                                <td>{user.name}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th>Role:</th>
                                <td>{user.role}</td>
                            </tr>
                            <tr>
                                <th>Business Name:</th>
                                <td>{user.businessName}</td>
                            </tr>
                            <tr>
                                <th>GST Number:</th>
                                <td>{user.gstNumber}</td>
                            </tr>
                            <tr>
                                <th>Address:</th>
                                <td>{user.address}</td>
                            </tr>
                            <tr>
                                <th>Created At:</th>
                                <td>{new Date(user.createdAt).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default GetUserById;
