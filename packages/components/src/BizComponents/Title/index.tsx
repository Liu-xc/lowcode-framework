import React, { FC } from 'react';

export interface TitleProps {
  text: string;
}

const Title: FC<TitleProps> = props => {
  const { text } = props;
  return (
    <h1>{text}</h1>
  );
}

export default Title;