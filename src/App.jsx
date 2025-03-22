import React from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './themes/ThemeProvider';
import Layout from './Components/Layout/Layout';
import { routes, flattenRoutes } from './routes/routes';

function App({onLogout, username}) {
  // Get flattened routes for React Router
  const flattenedRoutes = flattenRoutes(routes);

  return (
    <ThemeProvider>
      <CssBaseline />
        <Layout onLogout={onLogout} username={username}>
          <Routes>
            {flattenedRoutes.map((route, index) => {
              if (route.redirectTo) {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={<Navigate to={route.redirectTo} replace />}
                  />
                );
              }
              
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={route.component && <route.component />}
                />
              );
            })}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
    </ThemeProvider>
  );
}

export default App;





// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
// import UsersList from './Components/UsersList';
// import AddUser from './Components/AddUser';
// import UpdateUser from './Components/UpdateUser';
// import GetUserById from './Components/GetUserById';
// import DeleteUser from './Components/DeleteUser';
// import StockList from './Components/StockList';
// import AddStock from './Components/AddStock';
// import UpdateStock from './Components/UpdateStock';
// import DeleteStock from './Components/DeleteStock';
// import GetStockById from './Components/GetStockById';
// import TransactionsList from './Components/TransactionList';
// import AddTransaction from './Components/AddTransaction';
// import UpdateTransaction from './Components/UpdateTransaction';
// import DeleteTransaction from './Components/DeleteTransaction';
// import GetTransactionById from './Components/GetTransactionById';
// import RevenueList from './Components/RevenueList';
// import AddRevenue from './Components/AddRevenue';
// import UpdateRevenue from './Components/UpdateRevenue';
// import DeleteRevenue from './Components/DeleteRevenue';
// import GetRevenueById from './Components/GetRevenueById';
// import ExpenseList from './Components/ExpenseList';
// import AddExpense from './Components/AddExpense';
// import UpdateExpense from './Components/UpdateExpense';
// import DeleteExpense from './Components/DeleteExpense';
// import GetExpenseById from './Components/GetExpenseById';
// import Home from './Components/Home';
// import './styles.css'; // Assuming your styles are in this file

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <header>
//           <h1>Accounting Software</h1>
//         </header>
//         <nav>
//           <ul className="nav-list">
//             <li><NavLink to="/">Dashboard</NavLink></li>
//             <li><NavLink to="/transactions">Transactions</NavLink></li>
//             <li><NavLink to="/expenses">Expenses</NavLink></li>
//             <li><NavLink to="/revenue">Sales</NavLink></li>
//             <li><NavLink to="/inventory">Inventory</NavLink></li>
//           </ul>
//         </nav>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/transactions/*" element={<TransactionsRoutes />} />
//           <Route path="/expenses/*" element={<ExpensesRoutes />} />
//           <Route path="/revenue/*" element={<RevenueRoutes />} />
//           <Route path="/inventory/*" element={<InventoryRoutes />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// function TransactionsRoutes() {
//   return (
//     <>
//       <nav>
//         <ul className="nav-list">
//           <li><NavLink to="/transactions/get-all-transactions">All Transactions</NavLink></li>
//           <li><NavLink to="/transactions/get-transaction-by-id">Transaction By Id</NavLink></li>
//           <li><NavLink to="/transactions/add-transaction">Add New</NavLink></li>
//           <li><NavLink to="/transactions/update-transaction">Update</NavLink></li>
//           <li><NavLink to="/transactions/delete-transaction">Delete</NavLink></li>
//         </ul>
//       </nav>
//       <Routes>
//         <Route path="/" element={<TransactionsList />} />
//         <Route path="/get-all-transactions" element={<TransactionsList />} />
//         <Route path="/get-transaction-by-id" element={<GetTransactionById />} />
//         <Route path="/get-transaction-by-id/:transactionId" element={<GetTransactionById />} />
//         <Route path="/add-transaction" element={<AddTransaction />} />
//         <Route path="/update-transaction" element={<UpdateTransaction />} />
//         <Route path="/delete-transaction" element={<DeleteTransaction />} />
//       </Routes>
//     </>
//   );
// }

// function ExpensesRoutes() {
//   return (
//     <>
//       <nav>
//         <ul className="nav-list">
//           <li><NavLink to="/expenses/get-all-expenses">All Expenses</NavLink></li>
//           <li><NavLink to="/expenses/get-expense-by-id">Find By Id</NavLink></li>
//           <li><NavLink to="/expenses/add-expense">Add Expense</NavLink></li>
//           <li><NavLink to="/expenses/update-expense">Update</NavLink></li>
//           <li><NavLink to="/expenses/delete-expense">Delete</NavLink></li>
//         </ul>
//       </nav>
//       <Routes>
//         <Route path="/" element={<ExpenseList />} />
//         <Route path="/get-all-expenses" element={<ExpenseList />} />
//         <Route path="/get-expense-by-id" element={<GetExpenseById />} />
//         <Route path="/add-expense" element={<AddExpense />} />
//         <Route path="/update-expense" element={<UpdateExpense />} />
//         <Route path="/delete-expense" element={<DeleteExpense />} />
//       </Routes>
//     </>
//   );
// }

// function RevenueRoutes() {
//   return (
//     <>
//       <nav>
//         <ul className="nav-list">
//           <li><NavLink to="/revenue/get-all-revenue">All Sales</NavLink></li>
//           <li><NavLink to="/revenue/get-revenue-by-id">Find by Id</NavLink></li>
//           <li><NavLink to="/revenue/add-revenue">Add Sale</NavLink></li>
//           <li><NavLink to="/revenue/update-revenue">Edit</NavLink></li>
//           <li><NavLink to="/revenue/delete-revenue">Delete</NavLink></li>
//         </ul>
//       </nav>
//       <Routes>
//         <Route path="/" element={<RevenueList />} />
//         <Route path="/get-all-revenue" element={<RevenueList />} />
//         <Route path="/get-revenue-by-id" element={<GetRevenueById />} />
//         <Route path="/add-revenue" element={<AddRevenue />} />
//         <Route path="/update-revenue" element={<UpdateRevenue />} />
//         <Route path="/delete-revenue" element={<DeleteRevenue />} />
//       </Routes>
//     </>
//   );
// }

// function InventoryRoutes() {
//   return (
//     <>
//       <nav>
//         <ul className="nav-list">
//           <li><NavLink to="/inventory/get-all-stock">All Inventory</NavLink></li>
//           <li><NavLink to="/inventory/get-stock-by-id">Find By Id</NavLink></li>
//           <li><NavLink to="/inventory/add-stock">Add Stock</NavLink></li>
//           <li><NavLink to="/inventory/update-stock">Update</NavLink></li>
//           <li><NavLink to="/inventory/delete-stock">Delete</NavLink></li>
//         </ul>
//       </nav>
//       <Routes>
//         <Route path="/" element={<StockList />} />
//         <Route path="/get-all-stock" element={<StockList />} />
//         <Route path="/get-stock-by-id" element={<GetStockById />} />
//         <Route path="/add-stock" element={<AddStock />} />
//         <Route path="/update-stock" element={<UpdateStock />} />
//         <Route path="/delete-stock" element={<DeleteStock />} />
//       </Routes>
//     </>
//   );
// }

// export default App;




// function App() {
//   return (
//     <div className="App">
//      <UsersList/>
//      <AddUser/>
//      <UpdateUser/>
//      <GetUserById/>
//      <DeleteUser/>
     
//      <StockList/>
//      <AddStock/>
//      <UpdateStock/>
//      <DeleteStock/>
//      <GetStockById/>

//      <TransactionsList/>
//      <AddTransaction/>
//      <UpdateTransaction/>
//      <DeleteTransaction/>
//      <GetTransactionById/>

//      <RevenueList/>
//      <AddRevenue/>
//      <UpdateRevenue/>
//      <DeleteRevenue/>
//      <GetRevenueById/>

//      <ExpenseList/>
//      <AddExpense/>
//      <UpdateExpense/>
//      <DeleteExpense/>
//      <GetExpenseById/>
//     </div>
//   );
// }

// export default App;



// /*
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { ChakraProvider } from '@chakra-ui/react';
// import Navbar from './Components/Navbar';
// import Sidebar from './Components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Transactions from './pages/Transactions';
// import Revenue from './pages/Revenue';
// import Expense from './pages/Expense';
// import Inventory from './pages/Inventory';
// import PrivateRoute from './Components/PrivateRoute';
// import AuthProvider from './context/AuthProvider';

// function App() {
//   return (
//     <ChakraProvider>
//       <AuthProvider>
//         <Router>
//           <Navbar />
//           <Sidebar />
//           <Switch>
//             <Route path="/login" component={Login} />
//             <Route path="/register" component={Register} />
//             <PrivateRoute path="/dashboard" component={Dashboard} />
//             <Private

// */