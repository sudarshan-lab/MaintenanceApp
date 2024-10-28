

import { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import Navbar from '../NavBar/NavBar';
import MaintenanceGrid from './MaintenanceGrid';
import {
  NewRequestModal,
  UpdateRequestModal,
  DeleteConfirmationModal
} from './MaintenanceModals';
import {
  getMaintenanceRequests,
  createMaintenanceRequest,
  updateMaintenanceRequest,
  deleteMaintenanceRequest
} from '../../Services/MaintenanceService';

const Maintenance = () => {
  const [requests, setRequests] = useState([]);
  const [isNewModalOpen, setNewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMaintenanceRequests();
      setRequests(data);
    };
    fetchData();
  }, []);

  const handleNewRequest = async (data) => {
    const newRequest = await createMaintenanceRequest(data);
    setRequests([...requests, newRequest]);
  };

  const handleUpdateRequest = async (data) => {
    const updatedRequest = await updateMaintenanceRequest(data.reqId, data);
    setRequests(requests.map(req => req.reqId === data.reqId ? updatedRequest : req));
  };

  const handleDeleteRequest = async () => {
    await deleteMaintenanceRequest(currentRequest.reqId);
    setRequests(requests.filter(req => req.reqId !== currentRequest.reqId));
    setDeleteModalOpen(false);
  };

  return (
    <Box>
      <Navbar />
      <Flex justifyContent="space-between" p={4} mt={2}>
        <strong style={{paddingLeft:"58px"}}>List of Requests</strong>
        <Button  mr={14} colorScheme="teal" onClick={() => setNewModalOpen(true)}>Raise a New Request</Button>
      </Flex>
      <Flex justify="center" align="center" > {/* Adjust height as needed */}
        <Box width="90%"  borderWidth="2px" borderRadius="md" borderColor="gray.200">
          <MaintenanceGrid
            data={requests}
            onDelete={(id) => { setCurrentRequest(requests.find(req => req.reqId === id)); setDeleteModalOpen(true); }}
            onUpdate={(req) => { setCurrentRequest(req); setUpdateModalOpen(true); }}
          />
        </Box>
      </Flex>
      <NewRequestModal isOpen={isNewModalOpen} onClose={() => setNewModalOpen(false)} onSubmit={handleNewRequest} />
      <UpdateRequestModal isOpen={isUpdateModalOpen} onClose={() => setUpdateModalOpen(false)} onSubmit={handleUpdateRequest} request={currentRequest} />
      <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleDeleteRequest} />
    </Box>
  );
};

export default Maintenance;
