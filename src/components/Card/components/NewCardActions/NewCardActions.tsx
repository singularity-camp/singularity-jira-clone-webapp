import { FC } from "react";
import { Button, Stack } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

interface INewCardActions {}

const NewCardActions: FC<INewCardActions> = () => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={4}>
      <Button colorScheme="pink" variant="solid" onClick={() => navigate("/")}>
        Cancel
      </Button>
      <Button colorScheme="blue" variant="outline" type="submit">
        Submit
      </Button>
    </Stack>
  );
};

export default NewCardActions;
