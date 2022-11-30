import {createContext} from 'react';
import {Fridge} from "../../backend/types/Types";

const selectedFridgeContext = createContext<Fridge | null>(null);

export default selectedFridgeContext;
