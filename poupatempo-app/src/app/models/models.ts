export interface nubankModel {
    id: number;
    date: Date;
    description: string;
    value: number;
    category?: matchModel
  
  }
  
  export interface matchModel extends item {
    tag: string;
  }
  
  export interface categoryModel extends item {
    tags: string[];
    amount: number;
  }
  
  export interface item {
    id: number;
    name: string;
  }