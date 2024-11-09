import NodeCache = require("node-cache");

export class CacheSetup {
  private static cache: NodeCache;
  constructor() {}
  static getInstace(): NodeCache {
    if (this.cache === undefined) {
      this.cache = new NodeCache({ stdTTL: 600});
    }
    return this.cache;
  }
}