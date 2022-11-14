/*
 * @FilePath: /mini-class-tool/src/utils/env.ts
 * @author: Wibus
 * @Date: 2022-11-14 08:50:57
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-14 08:50:57
 * Coding With IU
 */

export const isDev = process.env.NODE_ENV === 'development';

export const isApp = window.__TAURI__ !== undefined;