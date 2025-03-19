import axios from 'axios';

const API_URL = 'http://localhost:9191/api/stocks';

class StockService {
    getAllStocks() {
        return axios.get(API_URL);
    }

    getStockById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    addStock(stock) {
        return axios.post(API_URL, stock);
    }

    deleteStock(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    updateStock(stock) {
        return axios.put(`${API_URL}/${stock.id}`, stock);
    }

    downloadMonthlyReport(year, month) {
        return axios.get(`${API_URL}/pdf/stock-report/${year}/${month}`, {
            responseType: 'blob'
        });
    }
}

export default new StockService();
