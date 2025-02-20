import { Button, Text, Modal, ModalOverlay, ModalHeader, ModalFooter, ModalContent, ModalCloseButton, ModalBody, useDisclosure } from "@chakra-ui/react"

const  DeleteModal = ({title, msg, confirmTxt, closeTxt, deleteCallback, isOpen, onClose}) => {

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                {msg}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                {closeTxt}
              </Button>
              <Button colorScheme='blue' onClick={deleteCallback}>{confirmTxt}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default DeleteModal