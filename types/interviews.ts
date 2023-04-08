export enum InterviewType {
  USHMM = 'USHMM',
  IIT = 'IIT',
  Hoess = 'Hoess',
  Pending = 'Pending',
}

export type Interview = {
  name: string;
  url: string;
  type?: InterviewType;
};
