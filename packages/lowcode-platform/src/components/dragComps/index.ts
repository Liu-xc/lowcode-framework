import { createContext } from "react";
import DraggableInput, { InputMeta } from "./Input";
import DraggableForm, { FormMeta } from './Form';

export {
  DraggableInput,
  InputMeta,
  DraggableForm,
  FormMeta
}

export const CompoMenuOptions = {
  sub: [
    'items'
  ],
  items: [
    {
      key: 'input',
      meta: InputMeta
    },
    {
      key: 'form',
      meta: FormMeta
    }
  ]
} as any;

export const ComponentsMap: Record<string, React.ComponentType<any>> = {
  Input: DraggableInput,
  Form: DraggableForm
}

export const ComponentsMapContext = createContext(ComponentsMap);