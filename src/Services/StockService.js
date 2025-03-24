import axios from 'axios';

const API_URL = 'http://localhost:9191/api/stocks';

class StockService {
    // Fetch all stocks for a specific user
    getAllStocks(userId) {
        return axios.get(`${API_URL}?userId=${userId}`);
    }

    // Fetch stock by ID for a specific user
    getStockById(id, userId) {
        return axios.get(`${API_URL}/${id}?userId=${userId}`);
    }

    // Fetch stocks by userId
    getStocksByUserId(userId) {
        return axios.get(`${API_URL}/user/${userId}`);
    }


    // Add a new stock (including userId automatically)
    addStock(stock) {
        return axios.post(`${API_URL}`, stock, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    
    // Delete stock by ID
    deleteStock(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    // Update an existing stock
    updateStock(stock) {
        return axios.put(`${API_URL}/${stock.id}`, stock);
    }

     // Fetch total stock value by month for a specific user
     getTotalStockValueByMonth(year, month, userId) {
        return axios.get(`${API_URL}/totalvalue/month/${year}/${month}?userId=${userId}`);
    }


    // Fetch total stock quantity by month for a specific user
    getMonthlyStocksQuantity(year, month, userId) {
        return axios.get(`${API_URL}/quantity/month/${year}/${month}?userId=${userId}`);
    }

    // Download a monthly stock report for a specific user
    downloadMonthlyReport(year, month, reportType, userId) {
        return axios.get(`${API_URL}/pdf/${reportType}/${year}/${month}?userId=${userId}`, {
            responseType: 'blob',
        });
    }

}

export default new StockService();