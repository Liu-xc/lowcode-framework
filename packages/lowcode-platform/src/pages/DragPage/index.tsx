import React, { useState } from "react";
import GridLayout from 'react-grid-layout';
import './index.scss';

const MyFirstGrid = () => {
  // layout is an array of objects, see the demo for more complete usage
  const [layout, setLayout] = useState([
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 }
  ]);
  const handleDrop = () => {
    console.log('drop');
      setLayout(prev => {
        const newItem = { i: Date.now().toString(), w: 2, h: 2, x: prev[prev.length - 1].x + 2, y: 0 };
        return [...prev, newItem];
      });
    }
    return (
      <GridLayout
        className="rgl"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        isDroppable={true}
        droppingItem={{ i: Date.now().toString(), w: 2, h: 2 }}
        onDrop={handleDrop}
        isDraggable={true}
      >
        {layout.map(item => (<div key={item.i}>{item.i}</div>))}
      </GridLayout>
    );
}

export default MyFirstGrid;