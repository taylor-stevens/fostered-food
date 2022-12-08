import {createContext} from 'react';
import {Fridge} from "../types/Types";

const dataContext = createContext<Fridge[] | null>(null);

export default dataContext;
