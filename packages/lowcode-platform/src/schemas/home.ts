import { Schema } from 'app-framework';

const schema = {
  ComponentType: 'Group',
  children: [
    {
      ComponentType: 'Title',
      Props: {
        $text$: '(()=>{sv.age=12;sv.name="alice"; return `${sv.name} is ${sv.age}`})()'
      },
    }
  ]
} as Schema;

export default schema;