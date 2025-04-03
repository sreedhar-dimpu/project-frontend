import React, { useEffect, useState } from 'react';
import RevenueService from '../Services/RevenueService';
import ExpenseService from '../Services/ExpenseService';
import StockService from '../Services/StockService';
import '../styles.css';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useUser } from '../Context/UserContext';

const Home = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const { user } = useUser(); 

  useEffect(() => {
    const fetchTotalSales = async () => {
        try {
            if (user && user.id) { 
              const response = await RevenueService.getTotalRevenueByMonthAndUserId(year, month, user.id); 
              setTotalSales(response.data);
            }
          } catch (error) {
            console.error('Error fetching total expenses:', error);
          }
        };

    const fetchTotalExpenses = async () => {
        try {
          if (user && user.id) { 
            const response = await ExpenseService.getTotalExpensesByMonthAndUserId(year, month, user.id); 
            setTotalExpenses(response.data);
          }
        } catch (error) {
          console.error('Error fetching total expenses:', error);
        }
      };
  

    const fetchTotalStock = async () => {
        try {
          if (user && user.id) { // Ensure user and user.id exist
            const response = await StockService.getMonthlyStocksQuantity(year, month, user.id); 
            setTotalStock(response.data); // Set total stock quantity
          }
        } catch (error) {
          console.error('Error fetching total stock:', error);
        }
      };
  

    fetchTotalSales();
    fetchTotalExpenses();
    fetchTotalStock();
  }, [year, month, user]);

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
        <Grid item xs={6}>
          <Box>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Sales of the Month
                </Typography>
                <Typography variant="h6" color="primary" sx={{ fontSize: '1rem' }}>
                  ${totalSales}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Expenses of the Month
                </Typography>
                <Typography variant="h6" color="error" sx={{ fontSize: '1rem' }}>
                  ${totalExpenses}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Stock Remaining
                </Typography>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                  {totalStock}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Card
              variant="outlined"
              sx={{
                backgroundColor: profitLoss >= 0 ? 'rgba(144, 238, 144, 0.3)' : 'rgba(255, 182, 193, 0.3)',
                border: '1px solid',
                borderColor: profitLoss >= 0 ? 'green' : 'red',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Profit/Loss
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    color: profitLoss >= 0 ? 'green' : 'red',
                    fontWeight: 'bold'
                  }}
                >
                  {profitLoss >= 0 ? `+$${profitLoss}` : `-$${Math.abs(profitLoss)}`}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={generatePDF}>
            Create Profit & Loss Statement
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;