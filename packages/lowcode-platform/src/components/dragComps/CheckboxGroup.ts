import { Checkbox } from "antd";
import { withField, withFieldMeta, withContainerChild } from "../../hoc";
import { ComponentMeta } from "../../types";

const meta: ComponentMeta = {
  ComponentType: 'CheckboxGroup',
  configForm: {
    fields: [{
      type: 'Options',
      props: {},
      fieldProps: {
        name: 'options',
        label: '创建选项'
      }
    }],
    formProps: {
      initialValues: {
        options: []
      }
    }
  },
  droppingItem: {
    w: 6,
    h: 3
  }
}

export const CheckboxGroupMeta = withFieldMeta(meta);

export default withContainerChild(withField(Checkbox.Group));