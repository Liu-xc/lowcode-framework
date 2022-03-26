import DragContainer, { ContainerMeta } from "./Container";

import React, { createContext } from "react";
import DraggableInput, { InputMeta } from "./dragComps/Input";
import DraggableForm, { FormMeta } from './dragComps/Form';
import DraggableSwitch, { SwitchMeta } from './dragComps/Switch';
import DraggableRadioGroup, { RadioGroupMeta } from './dragComps/RadioGroup';
import DraggableSelect, { SelectMeta } from './dragComps/Select';
import DraggableCheckboxGroup, { CheckboxGroupMeta } from './dragComps/CheckboxGroup';
import RenderComponent from "./RenderComponent";

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
  DraggableCheckboxGroup,
  CheckboxGroupMeta,

  DragContainer,
  RenderComponent
}

export const ComponentsMap: Record<string, React.ComponentType<any> | React.ForwardedRef<any>> = {
  Input: DraggableInput,
  Form: DraggableForm,
  Switch: DraggableSwitch,
  RadioGroup: DraggableRadioGroup,
  Select: DraggableSelect,
  CheckboxGroup: DraggableCheckboxGroup,
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
    },
    {
      key: 'checkbox-group',
      meta: CheckboxGroupMeta
    }
  ],
  containers: [
    {
      key: 'container',
      meta: ContainerMeta,
    }
  ]
} as any;