import {BaseEntity} from "./base.entity";

export interface Answer extends BaseEntity {
  value: string;
  correct: number;
  chosen: number;
  orderPlace: number;
}
