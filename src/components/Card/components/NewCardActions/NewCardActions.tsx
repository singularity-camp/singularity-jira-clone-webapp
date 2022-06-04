import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@chakra-ui/react";

const NewCardActions = () => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={4}>
      <Button colorScheme="pink" variant="solid" onClick={() => navigate("/")}>
        Cancel
      </Button>
      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => navigate("/1")}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default NewCardActions;
