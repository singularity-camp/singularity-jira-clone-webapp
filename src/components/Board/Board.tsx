import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { Button, Link, ListItem, UnorderedList } from "@chakra-ui/react";

const Board = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Board</h1>
      <UnorderedList>
        <ListItem>
          <Link as={LinkRouter} to="/1">
            Card 1
          </Link>
        </ListItem>
        <ListItem>
          <Link as={LinkRouter} to="/2">
            Card 2
          </Link>
        </ListItem>
        <ListItem>
          <Link as={LinkRouter} to="/3">
            Card 3
          </Link>
        </ListItem>
        <ListItem>
          <Link as={LinkRouter} to="/4">
            Card 4
          </Link>
        </ListItem>
        <Button onClick={() => navigate("/new")}>New</Button>
      </UnorderedList>
    </div>
  );
};

export default Board;
