import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";

const CustomModal = ({ activeItem, toggle, onSave }) => {
  const [item, setItem] = useState(activeItem);

  const handleChange = e => {
    const { name, value } = e.target;
    const updatedItem = { ...item, [name]: value };
    setItem(updatedItem);
  };

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}> Task Item </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={item.title}
              onChange={handleChange}
              placeholder="Enter Task Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={item.description}
              onChange={handleChange}
              placeholder="Enter Task Description"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(item)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
