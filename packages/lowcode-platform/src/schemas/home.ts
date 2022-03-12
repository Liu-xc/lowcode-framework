import { Schema } from 'app-framework';

const schema = {
  ComponentType: 'Group',
  children: [
    {
      ComponentType: 'Title',
      props: {
        $text$: '(()=>{if (!sv.name){sv.age=12;sv.name="alice"}; return `${sv.name} is ${sv.age}`})()'
      },
    },
    {
      ComponentType: 'BizCard',
      children: {
        ComponentType: 'Title',
        props: {
          $text$: 'sv.bizCard'
        }
      },
      query: {
        url: '/data/carddata',
        method: 'get',
      },
      props: {
        withQueryParams: {
          stateKey: 'bizCard',
        }
      },
    }
  ]
} as Schema;

export default schema;