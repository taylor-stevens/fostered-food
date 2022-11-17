import {createContext} from 'react';

const dataContext = createContext<JSON | null>(null);

export default dataContext;
