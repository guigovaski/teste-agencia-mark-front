import { Card, CardHeader, CardFooter, Button } from "@chakra-ui/react";
import { ComponentProps } from "react";

type EventProps = {
  name: string;
  onClick: () => void;
} & ComponentProps<"div">

export const Event = ({ name, onClick, ...props }: EventProps) => {
  return (
    <Card {...props}>
      <CardHeader>{name}</CardHeader>
      <CardFooter>
        <Button onClick={onClick}>Abrir</Button>
      </CardFooter>
    </Card>
  );
}