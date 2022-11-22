import {createContext} from 'react';
import {Fridge} from "../../shared/types/Types";

const selectedFridgeContext = createContext<Fridge | null>(null);

export default selectedFridgeContext;
