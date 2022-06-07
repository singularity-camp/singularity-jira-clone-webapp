import { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";

import style from "./Card.module.css";

import CardActions from "./components/CardActions";
import NewCardActions from "./components/NewCardActions";
import { gql, useQuery } from "@apollo/client";
import { Button, Spinner, useToast } from "@chakra-ui/react";

enum EDIT_TYPE {
  TITLE,
  DESCRIPTION,
}

interface Action {
  type: EDIT_TYPE;
}

interface Card {
  title?: string;
  description?: string;
}

interface CardsData {
  cards_by_pk: Card;
}

const GET_CARD = gql`
  query GetCard($id: uuid!) {
    cards_by_pk(id: $id) {
      title
      description
    }
  }
`;

const initState = {
  isTitleEditable: false,
  isDescriptionEditable: false,
};

function reducer(state: typeof initState, action: Action): typeof initState {
  switch (action.type) {
    case EDIT_TYPE.TITLE:
      return { ...state, isTitleEditable: !state.isTitleEditable };
    case EDIT_TYPE.DESCRIPTION:
      return { ...state, isDescriptionEditable: !state.isDescriptionEditable };
    default:
      throw new Error("Now element to toggle");
  }
}

const Card = () => {
  const [bg, setBg] = useState(style.green);
  const [state, dispatch] = useReducer(reducer, initState);
  const { cardNumber } = useParams();
  const isNew = typeof cardNumber === "undefined";

  const toast = useToast();
  const { loading, error, data } = useQuery<CardsData>(GET_CARD, {
    variables: {
      id: cardNumber,
    },
  });

  if (error) {
    toast({
      title: "Error card",
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
    <div className={`${bg} ${style.txtBlue}`}>
      <div>
        <h1 contentEditable={state.isTitleEditable}>
          {isNew ? "New" : data?.cards_by_pk.title}
        </h1>
        <EditIcon onClick={() => dispatch({ type: EDIT_TYPE.TITLE })} />
      </div>
      <div>
        <p contentEditable={state.isDescriptionEditable}>
          {data?.cards_by_pk.description}
        </p>
        <EditIcon onClick={() => dispatch({ type: EDIT_TYPE.DESCRIPTION })} />
      </div>
      <section>
        <ul>
          <div>
            <li>Comment1</li>
            <EditIcon />
          </div>
          <div>
            <li>Comment2</li>
            <EditIcon />
          </div>
        </ul>
      </section>
      {isNew ? <NewCardActions /> : <CardActions />}
      <Button colorScheme="blue" onClick={() => setBg(style.red)}>
        Set bg
      </Button>
    </div>
  );
};

export default Card;
