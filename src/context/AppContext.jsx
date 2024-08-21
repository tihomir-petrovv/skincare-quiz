import { createContext } from 'react';

export const AppContext = createContext({
    answers: null,
    setContext: () => {},
});