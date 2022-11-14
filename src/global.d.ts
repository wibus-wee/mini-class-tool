/*
 * @FilePath: /mini-class-tool/global.d.ts
 * @author: Wibus
 * @Date: 2022-11-14 15:20:24
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-14 15:33:22
 * Coding With IU
 */

declare global {
  interface Window {
    __TAURI__: any;
  }
}

export {}