import { Editor } from '@/components/Editor'
import { Inter } from 'next/font/google'
import { Container, Heading, Input, Text,
  Stack, Button, Divider, AbsoluteCenter, Grid, 
  GridItem, Box } from '@chakra-ui/react'
import { Event } from '@/components/Event'
import { getEvents } from '@/services/http/getEvents'
import { EventType } from '@/@types/EventType'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { postEvent } from '@/services/http/postEvent'

//const inter = Inter({ subsets: ['latin'] })

export default function Home({ events }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();  

  const [eventName, setEventName] = useState("");

  const onEventClick = (eventId: number) => {
    router.push(`events/${eventId}`);
  }

  const onCreateEventClick = async () => {
    await postEvent(eventName);
    setEventName("");
    router.reload();
  }

  return (
    <Container py={10} maxW="container.lg">
      <Heading as="h1" size="2xl" mb={24}>Agência de eventos</Heading>
      <Heading as="h2" size="lg" mb={10}>Criar eventos</Heading>
      <Stack spacing={4}>
        <Input
          onChange={(e) => setEventName(e.target.value)} 
          placeholder="Nome do evento" 
          size="lg" 
        />
        <Button
          onClick={onCreateEventClick} 
          colorScheme="blue"
        >
          Criar
        </Button>
        <Divider orientation="horizontal" my={8} />
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {events.map((ev, index) => (
            <GridItem colSpan={2}>
              <Event 
                key={index} 
                name={ev.name}
                onClick={() => onEventClick(ev.id)}
              />
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </Container>
  )
}

export async function getServerSideProps() {
  const data = await getEvents();  
  return {
    props: {
      events: data
    }
  }
}
