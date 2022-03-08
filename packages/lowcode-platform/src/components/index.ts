import DragContainer, { ContainerMeta } from "./Container";

import { createContext } from "react";
import DraggableInput, { InputMeta } from "./dragComps/Input";
import DraggableForm, { FormMeta } from './dragComps/Form';
import DraggableSwitch, { SwitchMeta } from './dragComps/Switch';
import DraggableRadioGroup, { RadioGroupMeta } from './dragComps/RadioGroup';
import DraggableSelect, { SelectMeta } from './dragComps/Select';

export {
  DraggableInput,
  InputMeta,
  DraggableForm,
  FormMeta,
  DraggableSwitch,
  SwitchMeta,
  DraggableRadioGroup,
  RadioGroupMeta,
  DraggableSelect,
  SelectMeta,
  DragContainer
}

export const ComponentsMap: Record<string, React.ComponentType<any>> = {
  Input: DraggableInput,
  Form: DraggableForm,
  Switch: DraggableSwitch,
  RadioGroup: DraggableRadioGroup,
  Select: DraggableSelect,
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
      key: 'form',
      meta: FormMeta
    },
    {
      key: 'input',
      meta: InputMeta
    },
    {
      key: 'switch',
      meta: SwitchMeta
    },
    {
      key: 'radio-group',
      meta: RadioGroupMeta
    },
    {
      key: 'select',
      meta: SelectMeta
    }
  ],
  containers: [
    {
      key: 'container',
      meta: ContainerMeta,
    }
  ]
} as any;