import DragContainer, { ContainerMeta } from "./Container";

import { createContext } from "react";
import DraggableInput, { InputMeta } from "./dragComps/Input";
import DraggableForm, { FormMeta } from './dragComps/Form';

export {
  DraggableInput,
  InputMeta,
  DraggableForm,
  FormMeta,
  DragContainer
}

export const ComponentsMap: Record<string, React.ComponentType<any>> = {
  Input: DraggableInput,
  Form: DraggableForm,
  Container: DragContainer
}

export const ComponentsMapContext = createContext(ComponentsMap);

export const CompoMenuOptions = {
  sub: [
    'items',
    'container'
  ],
  items: [
    {
      key: 'input',
      meta: InputMeta
    },
    {
      key: 'form',
      meta: FormMeta
    },
  ],
  container: [
    {
      key: 'container',
      meta: ContainerMeta,
    }
  ]
} as any;