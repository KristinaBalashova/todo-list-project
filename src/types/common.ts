export enum STATE {
  IDLE = 'idle',
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum FilterType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export enum TodoStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export type LoadingState = STATE.IDLE | STATE.LOADING | STATE.ERROR | STATE.SUCCESS;
