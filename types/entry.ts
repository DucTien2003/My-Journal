import { Dayjs } from "dayjs";

export interface Entry {
  emotion: number;
  time: Dayjs;
  title: string;
  content: string;
}
