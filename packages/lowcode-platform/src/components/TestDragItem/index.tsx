import React from 'react';
import withDragItem from '../../hoc/withDragItem';

const Test = (props: any) => (<div>{props.children}</div>);

export default withDragItem(Test);