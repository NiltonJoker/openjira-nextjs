import { FC, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "Pendiente:Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "InProgress:Reprehenderit officia esse Lorem excepteur ullamco eu sunt.",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description:
        "Finished:Amet deserunt aliquip veniam proident ut dolore officia.",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = ( description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      status:'pending',
      createdAt: Date.now()
    }

    dispatch({
      type: '[Entry] - Add-Entry',
      payload: newEntry
    })
  }
  

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        // Methods
        addNewEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
