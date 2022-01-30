import React, { FC } from 'react';
import { Button as AdButton } from 'antd';

export interface ButtonProps {
  text: string;
}

const Button: FC<ButtonProps> = props => {
  const {
    text,
  } = props;
  return (
    <AdButton type="primary">{text}</AdButton>
    // <div>{text}</div>
  );
};

export default Button;