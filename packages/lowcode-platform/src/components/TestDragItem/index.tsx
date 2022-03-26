import React from 'react';
import { withContainerChild } from '../../hoc';

const Test = (props: any) => (<div>{props.children}</div>);

export default withContainerChild(Test);