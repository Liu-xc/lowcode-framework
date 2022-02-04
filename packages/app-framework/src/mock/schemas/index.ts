import { Schema } from 'render-engine';

const schema = {
  ComponentType: 'Group',
  Children: [
    {
      ComponentType: 'Title',
      Props: {
        $text$: '`${name} is ${age}`'
      },
      MockContext: {
        name: 'bob',
        age: 14
      }
    }
  ],
} as Schema;

export default schema;