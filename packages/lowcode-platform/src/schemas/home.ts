import { Schema } from 'app-framework';

const schema = {
  ComponentType: 'Group',
  children: [
    {
      ComponentType: 'Title',
      Props: {
        $text$: '(()=>{if (!sv.name){sv.age=12;sv.name="alice"}; return `${sv.name} is ${sv.age}`})()'
      },
    },
    {
      ComponentType: 'BizCard',
      children: {
        ComponentType: 'Title',
        Props: {
          $text$: 'sv.bizCard'
        }
      },
      Query: {
        url: '/data/carddata',
        method: 'get',
      },
      Props: {
        withQueryParams: {
          stateKey: 'bizCard',
        }
      },
    }
  ]
} as Schema;

export default schema;