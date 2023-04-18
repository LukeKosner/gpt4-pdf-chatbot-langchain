export enum InterviewType {
  USHMM = 'USHMM',
  IIT = 'IIT',
  Hoess = 'Hoess',
  Pending = 'Pending',
}

export interface Interview {
  name: string;
  url: string;
  type?: InterviewType;
}
