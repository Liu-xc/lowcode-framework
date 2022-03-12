import { Checkbox } from "antd";
import { withField, withFieldMeta, withDragItem } from "../../hoc";
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
    w: 4,
    h: 3
  }
}

export const CheckboxGroupMeta = withFieldMeta(meta);

export default withDragItem(withField(Checkbox.Group));