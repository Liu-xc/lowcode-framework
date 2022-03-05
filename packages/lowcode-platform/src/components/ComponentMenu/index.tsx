import React, { useCallback } from 'react';
import { Menu, MenuProps } from 'antd';
import { CompoMenuOptions } from '../dragComps';
import { ComponentMeta } from '../../types';
import { setNewItem } from '../../store';
import { useDispatch } from 'react-redux';

const {
  SubMenu,
  Item
} = Menu;

const ComponentMenu: React.FC<MenuProps> = props => {
  const dispatch = useDispatch();
  const onDragStart = useCallback((type: string, meta: ComponentMeta) => {
    console.log(type, meta);
    dispatch(setNewItem(meta));
  }, [dispatch]);


  return (
    <Menu
      {...props}
    >
      {
        CompoMenuOptions.sub.map((k: string) => {
          const group = CompoMenuOptions[k] as any[];
          return (
            <SubMenu
              key={k}
              title={k}
            >
              {
                group.map(item => {
                  const {
                    key,
                    meta
                  } = item;
                  return (
                    <Item key={key} draggable={true} onDragStart={() => onDragStart(key, meta)}>{key}</Item>
                  );
                })
              }
            </SubMenu>
          );
          
          
        })
      }
    </Menu>
  );
}

export default ComponentMenu;
