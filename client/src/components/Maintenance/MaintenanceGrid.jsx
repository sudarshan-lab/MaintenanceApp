

import { Table, Thead, Tbody, Tr, Th, Td, Button, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const MaintenanceGrid = ({ data, onDelete, onUpdate }) => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSort = (field) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(order);

    const sorted = [...data].sort((a, b) => {
      // Compare based on data type
      if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        return order === 'asc' ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field]);
      } else {
        return order === 'asc' ? a[field] - b[field] : b[field] - a[field];
      }
    });

    setSortedData(sorted);
  };

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th textAlign="center" cursor={'pointer'} width="12.5%" onClick={() => handleSort('reqId')}>Request ID</Th>
            <Th textAlign="center" cursor={'pointer'} width="12.5%" onClick={() => handleSort('by')}>By</Th>
            <Th textAlign="center" cursor={'pointer'} width="12.5%" onClick={() => handleSort('room')}>Room</Th>
            <Th textAlign="center" cursor={'pointer'} width="12.5%" onClick={() => handleSort('priority')}>Priority</Th>
            <Th textAlign="center" cursor={'pointer'} width="12.5%" onClick={() => handleSort('description')}>Description</Th>
            <Th textAlign="center" cursor={'pointer'} width="12.5%" onClick={() => handleSort('date')}>Date</Th>
            <Th textAlign="center" width="25%">Actions</Th>
          </Tr>
        </Thead>
      </Table>
      <Box maxHeight="500px" overflowY="scroll">
        <Table variant="simple">
          <Tbody>
            {sortedData.map((request) => (
              <Tr key={request.reqId}>
                <Td textAlign="center" width="12.5%">{request.reqId}</Td>
                <Td textAlign="center" width="12.5%">{request.by}</Td>
                <Td textAlign="center" width="12.5%">{request.room}</Td>
                <Td textAlign="center" width="12.5%">{request.priority}</Td>
                <Td textAlign="center" width="12.5%">{request.description}</Td>
                <Td textAlign="center" width="12.5%">{new Date(request.date).toLocaleDateString()}</Td> {/* Formatting date */}
                <Td textAlign="center" width="25%">
                  <Button onClick={() => onUpdate(request)} colorScheme="teal" mr={2}>Update</Button>
                  <Button onClick={() => onDelete(request.reqId)} colorScheme="red">Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default MaintenanceGrid;