import React from 'react';
import { Typography } from 'antd';
import { withContainerChild } from '../../hoc';
import { ComponentMeta } from '../../types';
import { createOptions } from './commonConfigs';
import { withField, withFieldMeta } from '../../hoc/withField';

const { Title } = Typography;


const meta: ComponentMeta = {
  ComponentType: 'Title',
  configForm: {
    fields: [
      {
        type: 'Input',
        props: {},
        fieldProps: {
          label: '标题',
          name: 'title'
        }
      },
      {
        type: 'Select',
        props: {
          options: [
            {
              label: '居中',
              value: 'center',
            },
            {
              label: '居左',
              value: 'flex-start',
            },
            {
              label: '居右',
              value: 'flex-end',
            }
          ]
        },
        fieldProps: {
          label: '文字对齐',
          name: 'align'
        }
      }
    ],
  },
  droppingItem: {
    w: 24,
    h: 5
  }
}

export const TitleMeta: ComponentMeta = meta;

const TheTitle: React.FC<any> = props => {
  const { title, align = 'flex-start' } = props;

  return <Title style={{ display: 'flex', justifyContent: align }}>{title}</Title>
}

export default withContainerChild(TheTitle);