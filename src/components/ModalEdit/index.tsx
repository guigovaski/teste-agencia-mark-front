import { Button, Modal, ModalBody, ModalCloseButton, 
  ModalContent, ModalFooter, ModalHeader, ModalOverlay, 
  useDisclosure } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
  header: string;  
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

export const ModalEdit = ({ children, header, isOpen, onClose, id }: Props) => {
  return (
    <>
       <Modal        
        isOpen={isOpen}
        onClose={onClose}
        id={id}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {children}
          </ModalBody>

          <ModalFooter>            
            <Button colorScheme="gray" onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}