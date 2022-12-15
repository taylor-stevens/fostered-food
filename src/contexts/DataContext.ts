import {createContext} from 'react';
import { Fridge } from '../types/Types';

const dataContext = createContext<Fridge[] | undefined>(undefined);

export default dataContext;
