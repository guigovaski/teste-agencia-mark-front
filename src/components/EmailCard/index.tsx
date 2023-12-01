import { Button, Card, CardBody, CardFooter, CardHeader, HStack, Heading, Text } from "@chakra-ui/react";

type Props = {
  subject: string;
  author: string;
  receiver: string;
  message: string;
  onOpenBtnClick: () => void;
  onDeleteBtnClick: () => void;
}

export const EmailCard = ({ subject, author, receiver, 
  message, onOpenBtnClick, onDeleteBtnClick }: Props) => {
  
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{subject}</Heading>
        <Heading size="xs" colorScheme="gray" mt={2}>
          FROM: <span className="text-gray-600">
                  {author}
                </span>
        </Heading>
        <Heading size="xs" colorScheme="gray">
          TO: <span className="text-gray-600">
                {receiver}
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