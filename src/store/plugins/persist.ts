/**
 * Register Pinia Persist Plugin
 * 注册 Pinia 持久化插件
 *
 * @param pinia Pinia instance Pinia 实例
 */
import type { Pinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
export function registerPiniaPersistPlugin(pinia: Pinia) {
   pinia.use(piniaPluginPersistedstate);
}
