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

export type LoadingState = STATE.IDLE | STATE.LOADING | STATE.ERROR | STATE.SUCCESS;
