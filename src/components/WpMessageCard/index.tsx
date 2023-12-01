import { WhatsApp } from "@/@types/WhatsApp";
import { Card, CardHeader, Heading, CardBody, Text, CardFooter, HStack, Button } from "@chakra-ui/react";

type Props = Omit<WhatsApp, "eventId"|"id"> & {
  onOpenBtnClick: () => void;
  onDeleteBtnClick: () => void;
}

export const WpMessageCard = ({ authorPhoneNumber, receiverPhoneNumber, message, 
  onOpenBtnClick, onDeleteBtnClick }: Props) => {
        
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Mensagem</Heading>
        <Heading size="xs" colorScheme="gray" mt={2}>
          Nº Remetente: <span className="text-gray-600">
                  {authorPhoneNumber}
                </span>
        </Heading>
        <Heading size="xs" colorScheme="gray">
          Nº Destinatário: <span className="text-gray-600">
                {receiverPhoneNumber}
              </span>                  
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>{message}</Text>
      </CardBody>
      <CardFooter>
        <HStack>
          <Button 
            colorScheme="blue"
            onClick={onOpenBtnClick}
          >
            Abrir
          </Button>
          <Button 
            colorScheme="red"
            onClick={onDeleteBtnClick}
          >
            Deletar
          </Button>
        </HStack>            
      </CardFooter>
    </Card>
  );
}