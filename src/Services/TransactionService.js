import axios from 'axios';

const API_URL = 'http://localhost:9191/api/transactions';

class TransactionService {
    getAllTransactions() {
        return axios.get(API_URL);
    }

    getTransactionById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    getUserTransactions = (userId) => {
        return axios.get(`${API_URL}/user/${userId}`);
    };

    addTransaction(transaction) {
        return axios.post(API_URL, transaction);
    }

    deleteTransaction(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    updateTransaction(transaction) {
        return axios.put(`${API_URL}/${transaction.id}`, transaction);
    }

    getTransactionsByMonth(year, month) {
        return axios.get(`${API_URL}/month/${year}/${month}`);
    }

    getProfitLossStatement(year, month) {
        return axios.get(`${API_URL}/profit-loss/${year}/${month}`);
    }

    downloadProfitLossPDF(year, month) {
        return axios.get(`${API_URL}/profit-loss/pdf/${year}/${month}`, {
            responseType: 'blob'
        });
    }
}

export default new TransactionService();
