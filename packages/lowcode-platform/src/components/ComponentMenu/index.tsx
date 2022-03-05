import React from 'react';
import { Menu, MenuProps } from 'antd';
import TestDragItem from '../TestDragItem';

const ComponentMenu: React.FC<MenuProps> = props => {
  return (
    <Menu
      {...props}
    >
      <Menu.SubMenu key={"sub1"} title="菜单1">
        <Menu.ItemGroup key={"g1"}>
          <Menu.Item key={"1"}>
            <TestDragItem>Menu DragItem</TestDragItem>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
    </Menu>
  );
}

export default ComponentMenu;
