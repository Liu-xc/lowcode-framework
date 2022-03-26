import React, { useContext } from 'react';
import { APPContext } from 'app-framework';
import { withQuerySchema } from '../../hoc';

const RenderComponent: React.FC<any> = props => {
  const { schema } = props;
  const { renderEngine } = useContext(APPContext);

  return renderEngine.render(schema);
}

export default withQuerySchema(RenderComponent);