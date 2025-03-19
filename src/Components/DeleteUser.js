import React, { useState } from 'react';
import UserService from '../Services/UserService';
import '../styles.css';

const DeleteUser = () => {
    const [userId, setUserId] = useState('');

    const handleChange = (e) => {
        setUserId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.deleteUser(userId)
            .then((response) => {
                alert('User deleted successfully');
                setUserId('');
            })
            .catch((error) => {
                alert('There was an error deleting the user!' + error);
            });
    };

    return (
        <>
            <h2>Delete User</h2>
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
                <button type="submit">Delete User</button>
            </form>
        </>
    );
};

export default DeleteUser;
