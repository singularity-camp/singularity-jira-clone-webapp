import { Link as LinkRouter, useNavigate } from "react-router-dom";
import {
  Button,
  Link,
  ListItem,
  Spinner,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";

interface Card {
  id: string;
  title?: string;
}

interface CardsData {
  cards: Card[];
}

const GET_CARDS = gql`
  query GetCards($limit: Int, $offset: Int) {
    cards(limit: $limit, offset: $offset) {
      id
      title
    }
  }
`;

const Board = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { loading, error, data, refetch } = useQuery<CardsData>(GET_CARDS, {
    variables: {
      offset: 0,
      limit: 3,
    },
  });

  if (error) {
    toast({
      title: "Error board",
      description: error.message,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
    return null;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Board</h1>
      <UnorderedList>
        {data &&
          data.cards.map(({ id, title }) => (
            <ListItem key={id}>
              <Link as={LinkRouter} to={`/${id}`}>
                {title}
              </Link>
            </ListItem>
          ))}
        <Button onClick={() => navigate("/new")}>New</Button>
      </UnorderedList>
      <Button
        colorScheme="blue"
        onClick={() => refetch({ offset: 3, limit: 3 })}
      >
        Next
      </Button>
    </div>
  );
};

export default Board;
