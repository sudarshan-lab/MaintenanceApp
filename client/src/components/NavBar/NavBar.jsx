

import { Box, Text, Flex } from '@chakra-ui/react';

const Navbar = () => (
  <Box bg="teal.500" color="white" px={4} py={3}>
    <Flex justifyContent="space-between" alignItems="center">
      <Text fontSize="xl" fontWeight="bold">Maintenance App</Text>
      <Text mr={3} fontSize="md">Welcome!</Text>
    </Flex>
  </Box>
);

export default Navbar;
