import React from 'react';
import { Card } from 'antd';
import { withContainerChild } from '../../hoc';
import { ComponentMeta } from '../../types';
import './index.scss';

const meta: ComponentMeta = {
  ComponentType: 'IndicatorCard',
  configForm: {
    fields: [
      {
        type: 'Input',
        props: {},
        fieldProps: {
          label: '指标名称',
          name: 'title',
        }
      },
    ]
  },
  droppingItem: {
    w: 8,
    h: 6
  }
}

export const IndicatorCardMeta = meta;

const IndicatorCard: React.FC<any> = props => {
  const { title, value } = props;
  return (
    <Card title={title} className="indicatorCard">
      {value}
    </Card>
  );
}

export default withContainerChild(IndicatorCard);
