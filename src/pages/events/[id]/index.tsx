import { Email } from "@/@types/Email";
import { WhatsApp } from "@/@types/WhatsApp";
import { EmailCard } from "@/components/EmailCard";
import { ModalEdit } from "@/components/ModalEdit";
import { WpMessageCard } from "@/components/WpMessageCard";
import { deleteWpMessage } from "@/services/http/deleteWpMessage";
import { getEventMessages } from "@/services/http/getEventMessages";
import { Container, Grid, GridItem, Card, CardHeader,
  CardBody, CardFooter, Heading, Text,
  Button, HStack, VStack, useDisclosure, FormControl, Input,
  FormLabel, Divider, Stack, Box, Flex } from "@chakra-ui/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function EventDetails({ eventEmails, wpMessages, eventInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [wpMessage, setWpMessage] = useState<WhatsApp | null>(null);
  const [email, setEmail] = useState<Email | null>(null);

  const { isOpen: isEmailOpen, onOpen: emailOnOpen, onClose: emailOnClose } = useDisclosure({
    id: "email-modal-open"
  });

  const { isOpen: isWpMessageOpen, onOpen: wpMessageOnOpen, onClose: wpMessageOnClose } = useDisclosure({
    id: "whatsapp-modal-open"
  });

  const onEmailOpenBtnClick = (email: Email) => {
    setEmail(email);
    emailOnOpen();
  }

  const onWpMessageOpenBtnClick = (message: WhatsApp) => {
    setWpMessage(message);
    wpMessageOnOpen();
  }

  const onWpMessageDeleteBtnClick = async (messageId: number) => {
    await deleteWpMessage(messageId);
    router.reload();
  }

  return (
    <Container maxW="container.lg" py={10}>
      <Divider orientation="horizontal" mb={4} />
      <Flex mb={14} justifyContent="flex-end">
        <Box>
          <Button 
            colorScheme="blue"
            onClick={() => router.push(`/events/${eventInfo.id}/add/message`)}
          >
            Nova mensagem
          </Button>
          <Text fontSize="xs">*E-mail e WhatsApp</Text>
        </Box>        
      </Flex>

      <VStack align="flex-start">
        <Heading as="h2" size="xl">Dados do evento</Heading>
        <Text>Nome: <span className="font-bold">{eventInfo.name}</span></Text>
      </VStack>      

      <Heading as="h2" size="xl" mt={20} mb={8}>E-mails do evento</Heading>
      <Grid templateColumns="repeat(6, 1fr)" gap={4}>
        {eventEmails.map((email, index) => (
          <GridItem key={index} colSpan={2}>
            <EmailCard 
              author={email.author} 
              message={email.message} 
              receiver={email.receiver}
              subject={email.subject}
              onOpenBtnClick={() => onEmailOpenBtnClick(email)}              
            />
          </GridItem>
        ))}
      </Grid>

      {/* E-mail Modal */}
      <ModalEdit         
        onClose={emailOnClose}
        isOpen={isEmailOpen}
        header={email?.subject ?? ""}
        id="email-modal-open"
      >        
        <Heading size="xs" colorScheme="gray">
          FROM: <span className="text-gray-600">
                  {email?.author}
                </span>
        </Heading>
        <Heading size="xs" colorScheme="gray">
          TO: <span className="text-gray-600">
                {email?.receiver}
              </span>                  
        </Heading>
        <VStack mt={8} align="flex-start">
          <Text fontWeight="bold">Message: </Text>
          <Text className="text-gray-600">
            {email?.message}
          </Text>
        </VStack>
      </ModalEdit>

      <Divider orientation="horizontal" my={14} />

      <Heading as="h2" size="xl" mb={8}>Mensagens do evento</Heading>
      <Grid templateColumns="repeat(6, 1fr)" gap={4}>
        {wpMessages.map((msg, index) => (
          <GridItem key={index} colSpan={2}>
            <WpMessageCard 
              message={msg.message}
              authorPhoneNumber={msg.authorPhoneNumber}
              receiverPhoneNumber={msg.receiverPhoneNumber}
              onOpenBtnClick={() => onWpMessageOpenBtnClick(msg)}
              onDeleteBtnClick={() => onWpMessageDeleteBtnClick(msg.id)}
            />
          </GridItem>
        ))}
      </Grid>
          
      {/* WhatsApp Modal */}
      <ModalEdit         
        onClose={wpMessageOnClose}
        isOpen={isWpMessageOpen}
        header="Mensagem do WhatsApp"
        id="whatsapp-modal-open"
      >        
        <Heading size="xs" colorScheme="gray">
          FROM: <span className="text-gray-600">
                  {wpMessage?.authorPhoneNumber}
                </span>
        </Heading>
        <Heading size="xs" colorScheme="gray">
          TO: <span className="text-gray-600">
                {wpMessage?.receiverPhoneNumber}
              </span>
        </Heading>
        <VStack mt={8} align="flex-start">
          <Text fontWeight="bold">Message: </Text>
          <Text className="text-gray-600">
            {wpMessage?.message}
          </Text>
        </VStack>
      </ModalEdit>
    </Container>          
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const eventId = context.params?.id;

  const event = await getEventMessages(Number(eventId));

  const eventEmails = event.emails;
  const wpMessages = event.whatsApps;
  const eventInfo = {
    name: event.name,
    id: event.id
  };

  return {
    props: {
      eventEmails,
      wpMessages,
      eventInfo
    }
  }
}