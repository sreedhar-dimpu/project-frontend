import React from 'react';
import { Link } from 'react-router-dom';
import { Box, VStack, Text } from '@chakra-ui/react';

const Sidebar = () => {
  return (
    <Box bg="gray.200" w="200px" p="4">
      <VStack align="stretch">
        <Link to="/dashboard"><Text>Dashboard</Text></Link>
        <Link to="/transactions"><Text>Transactions</Text></Link>
        <Link to="/revenue"><Text>Revenue</Text></Link>
        <Link to="/expense"><Text>Expense</Text></Link>
        <Link to="/inventory"><Text>Inventory</Text></Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
