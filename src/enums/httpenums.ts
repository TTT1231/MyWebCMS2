export enum HttpStatusCode {
   /**成功 */
   OK = 200,
   /**错误请求 */
   BadRequest = 400,
   /**未授权 */
   Unauthorized = 401,
   /**禁止访问 */
   Forbidden = 403,
   /**未找到 */
   NotFound = 404,
   /**内部服务器错误 */
   InternalServerError = 500,
   /**服务不可用 */
   ServiceUnavailable = 503,
   /**网关超时 */
   GatewayTimeout = 504,
   /**在缓存中 */
   CustomHaveIt = 997,
   /**已过期 */
   CustomTimeout = 998,
   /**未知错误 */
   Unknown = 999
}
