export enum STATE {
  IDLE = 'idle',
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

export type LoadingState = STATE.IDLE | STATE.LOADING | STATE.ERROR | STATE.SUCCESS;