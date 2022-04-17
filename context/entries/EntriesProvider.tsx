import { FC, useEffect, useReducer } from "react";
import { entriesApi } from "../../apis";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', { description })
  
      dispatch({
        type: "[Entry] - Add-Entry",
        payload: data,
      });
      
    } catch (error) {
      console.log(error)
    }
  };

  const updateEntry = async (entry: Entry) => {

    try {
      const { _id, description, status } = entry;
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status } )

      dispatch({
        type: "[Entry] - Entry-Updated",
        payload: data,
      });
    } catch (error) {
      console.log(error)
    }

  };

  const refreshEntries = async () => {
    try {
      const { data } = await entriesApi.get<Entry[]>('/entries')
      dispatch({ type: '[Entry] - Refresh-Data', payload: data })
      
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        // Methods
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
