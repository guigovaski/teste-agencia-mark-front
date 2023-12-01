import { convertDate } from "@/utils/convertDate";
import { Card, CardHeader, CardFooter, Button, CardBody, Text, Heading, HStack } from "@chakra-ui/react";
import { ComponentProps } from "react";

type EventProps = {
  name: string;
  description: string;
  date: string;
  onOpenBtnClick: () => void;
  onDeleteBtnClick: () => void;
} & ComponentProps<"div">

export const Event = ({ name, description, date, onOpenBtnClick, onDeleteBtnClick, ...props }: EventProps) => {
  return (
    <Card height="100%" {...props}>
      <CardHeader>
        <Heading size="lg">{name}</Heading>
        <Text fontSize="xl" as="b">Data: {convertDate(date)}</Text>
      </CardHeader>
      <CardBody>        
        <Text fontSize="lg">{description}</Text>
      </CardBody>
      <CardFooter>
        <HStack>
          <Button onClick={onOpenBtnClick}>Visualizar</Button>
          <Button colorScheme="red" onClick={onDeleteBtnClick}>Excluir</Button>
        </HStack>
      </CardFooter>
    </Card>
  );
}