import { createContext } from 'react';
import { Fridge } from '../../backend/types/Types';

const selectedFridgeContext = createContext<Fridge | undefined>(undefined);

export default selectedFridgeContext;
