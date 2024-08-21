import { createContext } from 'react';

/**
 * @description Defines the AppContext object.
 */

/**
 * @typedef {Object} AppContext
 * @property {any} answers - The answers object.
 * @property {Function} setContext - The function to set the context.
 */

/**
 * @type {AppContext}
 */
export const AppContext = createContext({
    answers: null,
    setContext: () => {},
});