// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { List, Task, MyDay } = initSchema(schema);

export {
  List,
  Task,
  MyDay
};