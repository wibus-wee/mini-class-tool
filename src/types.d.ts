/*
 * @FilePath: /mini-class-tool/src/types.d.ts
 * @author: Wibus
 * @Date: 2022-11-14 15:20:24
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-14 15:20:25
 * Coding With IU
 */

declare global {
  interface Window {
    __TAURI__: any;
  }
}