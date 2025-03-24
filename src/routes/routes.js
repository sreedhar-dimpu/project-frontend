import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaidIcon from '@mui/icons-material/Paid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';


// Import page components 
import Dashboard from '../Components/Home';
import AllTransactions from '../Components/TransactionList';
import TransactionDetail from '../Components/GetTransactionById';
import AddTransaction from '../Components/AddTransaction';
import UpdateTransaction from '../Components/UpdateTransaction';
import DeleteTransaction from '../Components/DeleteTransaction'
import AllExpenses from '../Components/ExpenseList';
import ExpenseDetail from '../Components/GetExpenseById';
import AddExpense from '../Components/AddExpense';
import UpdateExpense from '../Components/UpdateExpense';
import DeleteExpense from '../Components/DeleteExpense';
import AllSales from '../Components/RevenueList';
import SaleDetail from '../Components/GetRevenueById';
import AddSale from '../Components/AddRevenue';
import UpdateSale from '../Components/UpdateRevenue';
import DeleteSale from '../Components/DeleteRevenue'
import AllInventory from '../Components/StockList';
import InventoryDetail from '../Components/GetStockById';
import AddInventory from '../Components/AddStock';
import UpdateInventory from '../Components/UpdateStock';
import DeleteInventory from '../Components/DeleteStock'
import UsersList from './../Components/UsersList';
import { SupervisedUserCircleRounded } from '@mui/icons-material';

// Routes configuration with nested routes
export const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <DashboardIcon />,
    component: Dashboard,
    exact: true,
  },
  {
    path: "/transactions",
    name: "Transactions",
    icon: <ReceiptIcon />,
    children: [
      {
        path: "",
        name: "All Transactions",
        component: AllTransactions,
        exact: true,
      },
      {
        path: "/details",
        name: "Transaction By ID",
        component: TransactionDetail,
        exact: true,
      },
      {
        path: "/details/:transactionId",
        name: "Transaction By ID",
        component: TransactionDetail,
        exact: true,
        hideInMenu: true
      },
      {
        path: "add",
        name: "Add New",
        component: AddTransaction,
        exact: true,
      },
      {
        path: "edit",
        name: "Update",
        component: UpdateTransaction,
        exact: true,
      },
      {
        path: "delete",
        name: "Delete",
        component: DeleteTransaction
      },
    ],
  },
  {
    path: "/expenses",
    name: "Expenses",
    icon: <PaidIcon />,
    children: [
      {
        path: "",
        name: "All Expenses",
        component: AllExpenses,
        exact: true,
      },
      {
        path: "details",
        name: "Expense By ID",
        component: ExpenseDetail,
        exact: true,
      },
      {
        path: "details/:id",
        name: "Expense By ID",
        component: ExpenseDetail,
        exact: true,
        hideInMenu: true
      },
      {
        path: "add",
        name: "Add New",
        component: AddExpense,
        exact: true,
        hideOnAccountant: true
      },
      {
        path: "edit",
        name: "Update",
        component: UpdateExpense,
        exact: true,
        hideOnAccountant: true
      },
      {
        path: "delete",
        name: "Delete",
        component: DeleteExpense,
        hideOnAccountant: true
      },
    ],
  },
  {
    path: "/sales",
    name: "Sales",
    icon: <ShoppingCartIcon />,
    children: [
      {
        path: "",
        name: "All Sales",
        component: AllSales,
        exact: true,
      },
      {
        path: "details",
        name: "Sale By ID",
        component: SaleDetail,
        exact: true,
      },
      {
        path: "details/:id",
        name: "Sale By ID",
        component: SaleDetail,
        exact: true,
        hideInMenu: true
      },
      {
        path: "add",
        name: "Add New",
        component: AddSale,
        exact: true,
        hideOnAccountant: true
      },
      {
        path: "edit",
        name: "Update",
        component: UpdateSale,
        exact: true,
        hideOnAccountant: true
      },
      {
        path: "delete",
        name: "Delete",
        component: DeleteSale,
        hideOnAccountant: true
      },
    ],
  },
  {
    path: "/inventory",
    name: "Inventory",
    icon: <InventoryIcon />,
    children: [
      {
        path: "",
        name: "All Inventory",
        component: AllInventory,
        exact: true,
      },
      {
        path: ":id",
        name: "Inventory By ID",
        component: InventoryDetail,
        exact: true,
      },
      {
        path: "add",
        name: "Add New",
        component: AddInventory,
        exact: true,
      },
      {
        path: "edit/:id",
        name: "Update",
        component: UpdateInventory,
        exact: true,
      },
      {
        path: "delete/:id",
        name: "Delete",
        component: DeleteInventory
      },
    ],
  },
  {
    path: "/users",
    name: "Users",
    icon: <SupervisedUserCircleRounded />,
    hideOnAccountant: true,
    children:
    [
       {
         path:"",
         name:"View All Users", 
         component :UsersList, 
         hideOnAccountant: true
        }
     ]
  }
];

// Function to generate full paths for nested routes
export const getFullPath = (parentPath, childPath) => {
  if (!childPath) return parentPath;
  const adjustedParentPath = parentPath.endsWith("/") ? parentPath.slice(0, -1) : parentPath;
  const adjustedChildPath = childPath.startsWith("/") ? childPath : `/${childPath}`;
  return `${adjustedParentPath}${adjustedChildPath}`;
};

// Flatten routes for React Router configuration
export const flattenRoutes = (routes, parentPath = "") => {
  return routes.reduce((acc, route) => {
    const { path, component, children, exact, redirectTo, hideOnAccountant } = route;
    const fullPath = getFullPath(parentPath, path);

    if (component || redirectTo) {
      acc.push({
        path: fullPath,
        component,
        exact,
        redirectTo,
        hideOnAccountant
      });
    }

    if (children) {
      acc = acc.concat(flattenRoutes(children, fullPath));
    }

    return acc;
  }, []);
};