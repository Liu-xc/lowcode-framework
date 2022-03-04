import React from 'react';
import withLayoutContainer from '../../hoc/withLayoutContainer';

const Test = (props: any) => (<div>{props.children}</div>);

export default withLayoutContainer(Test);