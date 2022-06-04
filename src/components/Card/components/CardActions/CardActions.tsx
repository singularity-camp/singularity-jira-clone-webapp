import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@chakra-ui/react";

const CardActions = () => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={4}>
      <Button colorScheme="pink" variant="solid" onClick={() => navigate("/")}>
        Delete
      </Button>
      <Button colorScheme="blue" variant="outline">
        Save
      </Button>
    </Stack>
  );
};

export default CardActions;
