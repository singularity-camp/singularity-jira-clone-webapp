import { useReducer } from "react";
import { EditIcon } from "@chakra-ui/icons";

import CardActions from "./components/CardActions";
import NewCardActions from "./components/NewCardActions";
import { Spinner, useToast } from "@chakra-ui/react";

import useCards from "./useCards";

enum EDIT_TYPE {
  TITLE,
  DESCRIPTION,
}

interface Action {
  type: EDIT_TYPE;
}

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
  const [state, dispatch] = useReducer(reducer, initState);
  const {
    isNew,
    title,
    setTitle,
    description,
    setDescription,
    error,
    loading,
    addHandler,
    updateHandler,
    deleteHandler,
  } = useCards();

  const toast = useToast();

  if (error) {
    toast({
      title: "Error card",
      description: error?.message,
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
    <form onSubmit={isNew ? addHandler : updateHandler}>
      <div>
        {state.isTitleEditable ? (
          <input
            value={title}
            onChange={({ target: { value } }) => setTitle(value)}
            style={{
              display: "block",
            }}
          />
        ) : (
          <h1>{title}</h1>
        )}
        <EditIcon onClick={() => dispatch({ type: EDIT_TYPE.TITLE })} />
      </div>
      <div>
        {state.isDescriptionEditable ? (
          <input
            value={description}
            onChange={({ target: { value } }) => setDescription(value)}
            style={{
              display: "block",
            }}
          />
        ) : (
          <p contentEditable={state.isDescriptionEditable}>{description}</p>
        )}
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
      {isNew ? (
        <NewCardActions />
      ) : (
        <CardActions deleteHandler={deleteHandler} />
      )}
    </form>
  );
};

export default Card;
