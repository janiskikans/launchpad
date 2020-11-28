export default class LaunchStatus {
  constructor(params = {}) {
    this.id = params.id ?? null;
    this.name = params.name ?? '';
  }
}
