import axios from 'axios';

const API_URL = 'http://localhost:9191/api/users';

class UserService {
    getAllUsers() {
        return axios.get(API_URL);
    }

    getUserById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    addUser(user) {
        return axios.post(API_URL, user);
    }

    deleteUser(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    updateUser(user) {
        return axios.put(`${API_URL}/${user.id}`, user);
    }

    // New login method
    loginUser(email, password) {
        return axios.post(`${API_URL}/login`, { email, password });
    }
}

export default new UserService();
