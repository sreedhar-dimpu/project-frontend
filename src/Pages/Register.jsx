import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Input, VStack } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
    history.push('/dashboard');
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <VStack spacing="5">
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleSubmit}>Register</Button>
      </VStack>
    </Box>
  );
};

export default Register;
