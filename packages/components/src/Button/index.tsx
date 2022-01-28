import React, { FC } from 'react';

export interface ButtonProps {
  text: string;
}

const Button: FC<ButtonProps> = props => {
  const {
    text,
  } = props;
  return (
    <button>{text}</button>
  );
};

export default Button;