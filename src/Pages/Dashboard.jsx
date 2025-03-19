import React, { useEffect, useState } from 'react';
import RevenueService from '../../Services/RevenueService';
import ExpenseService from '../../Services/ExpenseService';
import TransactionService from '../../Services/TransactionService';
import StockService from '../../Services/StockService';
import '../styles.css';

const Home = () => {
    const [totalSales, setTotalSales] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalStock, setTotalStock] = useState(0);
    const [profitLoss, setProfitLoss] = useState(0);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    useEffect(() => {
        const fetchTotalSales = async () => {
            try {
                const response = await RevenueService.getTotalRevenueByMonth(year, month);
                setTotalSales(response.data);
            } catch (error) {
                console.error('Error fetching total sales:', error);
            }
        };

        const fetchTotalExpenses = async () => {
            try {
                const response = await ExpenseService.getTotalExpensesByMonth(year, month);
                setTotalExpenses(response.data);
            } catch (error) {
                console.error('Error fetching total expenses:', error);
            }
        };

        const fetchTotalStock = async () => {
            try {
                const response = await StockService.getAllStocks();
                const totalQuantity = response.data.reduce((sum, stock) => sum + stock.quantity, 0);
                setTotalStock(totalQuantity);
            } catch (error) {
                console.error('Error fetching total stock:', error);
            }
        };

        fetchTotalSales();
        fetchTotalExpenses();
        fetchTotalStock();
    }, [year, month]);

    useEffect(() => {
        setProfitLoss(totalSales - totalExpenses);
    }, [totalSales, totalExpenses]);

    const generatePDF = async () => {
        try {
            const response = await RevenueService.downloadRevenuePDF('profit-loss', year, month, false);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'profit_loss.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="stats-container">
                <div className="stat-box">
                    <h3>Total Sales of the Month</h3>
                    <p>{totalSales}</p>
                </div>
                <div className="stat-box">
                    <h3>Total Expenses of the Month</h3>
                    <p>{totalExpenses}</p>
                </div>
                <div className="stat-box">
                    <h3>Total Stock Remaining</h3>
                    <p>{totalStock}</p>
                </div>
                <div className="profit-loss-box">
                    <h3>Profit/Loss</h3>
                    <p>{profitLoss >= 0 ? `+$${profitLoss}` : `-$${Math.abs(profitLoss)}`}</p>
                </div>
            </div>
            <button className="pdf-button" onClick={generatePDF}>Create Profit and Loss PDF</button>
        </div>
    );
};

export default Home;
