import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ListMetaData = {
  readOnlyFields;
}

type TaskMetaData = {
  readOnlyFields;
}

type MyDayMetaData = {
  readOnlyFields;
}

export declare class List {
  readonly id: string;
  readonly listName: string;
  readonly listColor: string;
  readonly owner: string;
  readonly ownerId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<List>);
  static copyOf(source: List, mutator: (draft: MutableModel<List>) => MutableModel<List> | void): List;
}

export declare class Task {
  readonly id: string;
  readonly taskTitle: string;
  readonly isCompleted: boolean;
  readonly isImportant?: boolean | null;
  readonly owner: string;
  readonly ownerId: string;
  readonly createdOn: string;
  readonly updatedOn?: string | null;
  readonly listID?: string | null;
  readonly list?: List | null;
  constructor(init: ModelInit<Task>);
  static copyOf(source: Task, mutator: (draft: MutableModel<Task>) => MutableModel<Task> | void): Task;
}

export declare class MyDay {
  readonly id: string;
  readonly myDayTitle: string;
  readonly owner: string;
  readonly ownerId: string;
  readonly isCompleted: boolean;
  readonly isImportant?: boolean | null;
  readonly createdOn: string;
  readonly updatedOn?: string | null;
  constructor(init: ModelInit<MyDay>);
  static copyOf(source: MyDay, mutator: (draft: MutableModel<MyDay>) => MutableModel<MyDay> | void): MyDay;
}