import React, { FC } from 'react';
import { Schema } from '@/types';

class RenderEngine {
  constructor() {

  }

  render(schema: Schema) {
    console.log(schema);
    return (<>resolved schema</>);
  }
}

export default RenderEngine;