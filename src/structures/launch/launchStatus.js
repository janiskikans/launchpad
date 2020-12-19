export const STATUS_GO = 1;
export const STATUS_TBD = 2;
export const STATUS_SUCCESS = 3;

export default class LaunchStatus {
  constructor(params = {}) {
    this.id = params.id ?? null;
    this.name = params.name ?? '';
  }
}
