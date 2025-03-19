import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Button, useColorMode, Spacer } from '@chakra-ui/react';

const Navbar = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Flex as="nav" padding="1.5rem" bg="gray.800" color="white">
      <Box>
        <Link to="/">Home</Link>
      </Box>
      <Spacer />
      <Box>
        <Button onClick={toggleColorMode} mr="4">Toggle Mode</Button>
        <Link to="/login">Login</Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
