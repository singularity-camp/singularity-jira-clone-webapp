import { useReducer } from "react";
import { useParams } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";

import CardActions from "./components/CardActions";
import NewCardActions from "./components/NewCardActions";

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
  const { cardNumber } = useParams();
  const isNew = typeof cardNumber === "undefined";

  return (
    <div>
      <div>
        <h1 contentEditable={state.isTitleEditable}>
          {isNew ? "New" : `Card #${cardNumber}`}
        </h1>
        <EditIcon onClick={() => dispatch({ type: EDIT_TYPE.TITLE })} />
      </div>
      <div>
        <p contentEditable={state.isDescriptionEditable}>Description</p>
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
    </div>
  );
};

export default Card;
