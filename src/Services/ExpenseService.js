import axios from 'axios';

const API_URL = 'http://localhost:9191/api/expenses';

class ExpenseService {
    getAllExpenses() {
        return axios.get(API_URL);
    }

    getExpenseById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    addExpense(expense) {
        return axios.post(API_URL, expense);
    }

    deleteExpense(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    updateExpense(expense) {
        return axios.put(`${API_URL}/${expense.id}`, expense);
    }

    getExpensesByMonth(year, month) {
        return axios.get(`${API_URL}/${year}/${month}`);
    }

    getTotalExpensesByMonth(year, month) {
        return axios.get(`${API_URL}/totalvalue/month/${year}/${month}`);
    }

    downloadExpensePDF(reportType, year, month, isExpense) {
        return axios.get(`${API_URL}/pdf/${reportType}/${year}/${month}/${isExpense}`, {
            responseType: 'blob'
        });
    }
}

export default new ExpenseService();
