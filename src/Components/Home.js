import React, { useEffect, useState } from 'react';
import RevenueService from '../Services/RevenueService';
import ExpenseService from '../Services/ExpenseService';
import TransactionService from '../Services/TransactionService';
import StockService from '../Services/StockService';
import '../styles.css';
import { Box, Button, Card, CardContent, Grid, Typography, } from '@mui/material';

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
            <Grid container spacing={2}>
            <Grid item xs={6} >
                <Box>
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography variant='h5'>
                                Total Sales of the Month
                            </Typography>
                            <p>{totalSales}</p>
                        </CardContent>
                    </Card>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                <Box>
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography variant='h5'>
                                Total Expenses of the Month
                            </Typography>
                            <p>{totalExpenses}</p>
                        </CardContent>
                    </Card>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                <Box>
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography variant='h5'>
                                Total Stock Remaining
                            </Typography>
                            <p>{totalStock}</p>
                        </CardContent>
                    </Card>
                    </Box>
                    </Grid>
                <Grid item xs={12} >
                <Box>
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography variant='h5'>
                                Profit/Loss
                            </Typography>
                            <p>{profitLoss >= 0 ? `+$${profitLoss}` : `-$${Math.abs(profitLoss)}`}</p>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
                <Grid item xs={12}>
                <Button variant='contained' onClick={generatePDF}>Create Profit and Loss PDF</Button>
                </Grid>
            </Grid>
            
        </div>
    );
};

export default Home;
