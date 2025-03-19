import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Input, VStack } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    history.push('/dashboard');
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <VStack spacing="5">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleSubmit}>Login</Button>
      </VStack>
    </Box>
  );
};

export default Login;
