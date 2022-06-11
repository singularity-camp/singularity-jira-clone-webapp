import { FC } from "react";
import { Button, Stack } from "@chakra-ui/react";

interface CardActionsProps {
  deleteHandler: () => void;
}

const CardActions: FC<CardActionsProps> = ({ deleteHandler }) => {
  return (
    <Stack direction="row" spacing={4}>
      <Button colorScheme="pink" variant="solid" onClick={deleteHandler}>
        Delete
      </Button>
      <Button colorScheme="blue" variant="outline" type="submit">
        Save
      </Button>
    </Stack>
  );
};

export default CardActions;
