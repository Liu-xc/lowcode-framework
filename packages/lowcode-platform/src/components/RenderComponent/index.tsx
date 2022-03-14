import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { replaceLayoutStore } from '../../store';
import { APPContext } from 'app-framework';
import { withQuerySchema } from '../../hoc';

const RenderComponent: React.FC<any> = props => {
  const dispatch = useDispatch();
  const { schema, state } = props;
  const { renderEngine } = useContext(APPContext);
  useEffect(() => {
    dispatch(replaceLayoutStore({
      layoutStore: state
    }));
  }, [dispatch, state]);
  return renderEngine.render(schema);
}

export default withQuerySchema(RenderComponent);