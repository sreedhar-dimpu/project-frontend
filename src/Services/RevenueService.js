import axios from 'axios';

const API_URL = 'http://localhost:9191/api/revenues';

class RevenueService {
    getAllRevenues() {
        return axios.get(API_URL);
    }

    getRevenueById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    getRevenuesByUserId(userId) {
        return axios.get(`${API_URL}/userid/${userId}`);
    }


    addRevenue(revenue) {
        return axios.post(API_URL, revenue);
    }

    deleteRevenue(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    updateRevenue(revenue) {
        return axios.put(`${API_URL}/${revenue.id}`, revenue);
    }

    getRevenuesByMonth(year, month) {
        return axios.get(`${API_URL}/${year}/${month}`);
    }

    getTotalRevenueByMonth(year, month) {
        return axios.get(`${API_URL}/totalvalue/month/${year}/${month}`);
    }

    getTotalRevenueByMonthAndUserId(year, month, userId) {
        return axios.get(`${API_URL}/user/${userId}/month/${year}/${month}/total`);
    }

    getTotalRevenue() {
        return axios.get(`${API_URL}/totalvalue`);
    }

    downloadRevenuePDF(reportType, year, month, isExpense) {
        return axios.get(`${API_URL}/pdf/${reportType}/${year}/${month}/${isExpense}`, {
            responseType: 'blob'
        });
    }

    downloadReceipt(revenueId) {
        return axios.get(`${API_URL}/${revenueId}/receipt`, {
            responseType: 'blob'
        });
    }

    downloadProfitLossPDF(year, month) {
        return axios.get(`${API_URL}/profit-loss/${year}/${month}`, {
            responseType: 'blob', // Ensure the response is treated as a blob for downloading files
        });
    }

}

export default new RevenueService();
