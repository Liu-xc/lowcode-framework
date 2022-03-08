import DragContainer, { ContainerMeta } from "./Container";

import { createContext } from "react";
import DraggableInput, { InputMeta } from "./dragComps/Input";
import DraggableForm, { FormMeta } from './dragComps/Form';
import DraggableSwitch, { SwitchMeta } from './dragComps/Switch';
import DraggableRadioGroup, { RadioGroupMeta } from './dragComps/RadioGroup';

export {
  DraggableInput,
  InputMeta,
  DraggableForm,
  FormMeta,
  DraggableSwitch,
  SwitchMeta,
  DraggableRadioGroup,
  RadioGroupMeta,
  DragContainer
}

export const ComponentsMap: Record<string, React.ComponentType<any>> = {
  Input: DraggableInput,
  Form: DraggableForm,
  Switch: DraggableSwitch,
  RadioGroup: DraggableRadioGroup,
  Container: DragContainer
}

export const ComponentsMapContext = createContext(ComponentsMap);

export const CompoMenuOptions = {
  sub: [
    'items',
    'containers'
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
    {
      key: 'switch',
      meta: SwitchMeta
    },
    {
      key: 'radio-group',
      meta: RadioGroupMeta
    }
  ],
  containers: [
    {
      key: 'container',
      meta: ContainerMeta,
    }
  ]
} as any;