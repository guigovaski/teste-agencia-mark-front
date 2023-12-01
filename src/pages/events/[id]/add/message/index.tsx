import { Editor } from "@/components/Editor";
import { postMessage } from "@/services/http/postMessage";
import { Container, Heading, Stack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function AddEventMessage() {
  const { id } = useParams();
  const router = useRouter();

  const [eventMessage, setEventMessage] = useState({
    subject: "",
    author: "",
    receiver: "",
    authorPhoneNumber: "",
    receiverPhoneNumber: "",
    message: "",
    eventId: 0
  });

  useEffect(() => {
    setEventMessage({
      ...eventMessage,
      eventId: Number(id)
    });
  }, [id]);

  const onSubmit = async () => {
    await postMessage(eventMessage);
    router.push(`/events/${id}`);
  }

  return (
    <Container maxW="container.lg" py={10}>
      <Heading size="lg" colorScheme="gray" mb={10}>
        Nova mensagem
      </Heading>
      <Stack spacing={4}>
        <fieldset className="flex flex-col gap-2">
          <legend className="text-2xl font-semibold mb-2">E-mail</legend>
          <FormControl id="authorPhoneNumber">
            <FormLabel>Assunto</FormLabel>
            <Input 
              onChange={(e) => setEventMessage({ ...eventMessage, subject: e.target.value })}
              type="text" 
            />
          </FormControl>
          <FormControl id="authorPhoneNumber">
            <FormLabel>Remetente</FormLabel>
            <Input 
              onChange={(e) => setEventMessage({ ...eventMessage, author: e.target.value })}
              type="text" 
            />
          </FormControl>
          <FormControl id="authorPhoneNumber">
            <FormLabel>Destinatário</FormLabel>
            <Input
              onChange={(e) => setEventMessage({ ...eventMessage, receiver: e.target.value })} 
              type="text" 
            />
          </FormControl>
        </fieldset>
        <fieldset className="mt-6 flex flex-col gap-2">
          <legend className="text-2xl font-semibold mb-2">WhatsApp</legend>
          <FormControl id="authorPhoneNumber">
            <FormLabel>Telefone do autor</FormLabel>
            <Input 
              type="tel" 
              onChange={(e) => setEventMessage({ ...eventMessage, authorPhoneNumber: e.target.value })}
            />
          </FormControl>
          <FormControl id="receiverPhoneNumber">
            <FormLabel>Telefone do destinatário</FormLabel>
            <Input
              type="tel" 
              onChange={(e) => setEventMessage({ ...eventMessage, receiverPhoneNumber: e.target.value })} 
            />
          </FormControl>
        </fieldset>
        
        <Editor 
          placeholder="Escreva sua mensagem..." 
          setMessageContent={(value) => setEventMessage({ ...eventMessage, message: value })}
          messageContent={eventMessage.message} 
        />
        {/* <FormControl mt={4} id="message">
          <FormLabel>Mensagem</FormLabel>
          <Input
            onChange={(e) => setEventMessage({ ...eventMessage, message: e.target.value })} 
            as="textarea" 
            minH="150px" 
            py={2} 
          />
        </FormControl> */}
        <Button 
          colorScheme="blue"
          onClick={onSubmit}
        >
          Salvar
        </Button>
      </Stack>
    </Container>
  );
}