import React from 'react';
import { Card, CardProps } from "antd";
import { WithQueryProps } from '@/types';
import { withQuery } from 'app-framework';

const BizCard: React.FC<CardProps & WithQueryProps> = props => {
  const {
    loading,
    error,
    retry,
    children
  } = props;
  return (
    <Card
      loading={loading}
    >
      {!error && children}
      {error && error.message}
    </Card>
  );
};

export default withQuery(BizCard);