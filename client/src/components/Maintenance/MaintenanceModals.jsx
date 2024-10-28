// components/MaintenanceModals.js

import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input,
    Select, Text
  } from '@chakra-ui/react';
  
  import { useEffect, useState } from 'react';
  
  export const NewRequestModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({ room: '', by: '', description: '', priority: 'Low' });
  
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = () => {
      onSubmit(formData);
      setFormData({ room: '', by: '', description: '', priority: 'Low' });
      onClose();
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Raise New Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Room#</FormLabel>
            <Input name="room" value={formData.room} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Requested by</FormLabel>
            <Input name="by" value={formData.by} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description of work/repair</FormLabel>
            <Input name="description" value={formData.description} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Requested priority</FormLabel>
            <Select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Requested date of work/repair</FormLabel>
            <Input
              type="date" 
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleSubmit}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    );
  };
  
  export const UpdateRequestModal = ({ isOpen, onClose, onSubmit, request }) => {
    const [formData, setFormData] = useState({});
    useEffect(() => {
      if (request) {
        setFormData({
          ...request,
          date: request.date ? new Date(request.date).toISOString().split('T')[0] : '', 
        });
      }
    }, [request]);
    
  
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = () => {
      onSubmit(formData);
      onClose();
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Room</FormLabel>
            <Input name="room" value={formData?.room} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>By</FormLabel>
            <Input name="by" value={formData?.by} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input name="description" value={formData?.description} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Priority</FormLabel>
            <Select name="priority" value={formData?.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Date</FormLabel>
            <Input
              type="date" 
              name="date"
              value={formData?.date}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleSubmit}>Save Changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    );
  };
  
  export const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this request?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onConfirm}>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
  