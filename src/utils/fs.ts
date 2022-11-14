/*
 * @FilePath: /mini-class-tool/src/utils/fs.ts
 * @author: Wibus
 * @Date: 2022-11-14 10:08:23
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-14 15:05:25
 * Coding With IU
 */

import { fs } from '@tauri-apps/api';
import { BaseDirectory, exists } from '@tauri-apps/api/fs';
import message from 'react-message-popup';

class appStorage {
  constructor() {
    this.init();
  }

  dir = BaseDirectory.AppData;

  async init() {
    if (!(await exists('', { dir: this.dir }))) {
      await fs.createDir('', { dir: this.dir, recursive: true });
    }
    if (!await exists('config.json', { dir: this.dir })){
      message.loading("正在初始化配置文件");
      await fs.writeTextFile("config.json", '{}', { dir: this.dir });
    }
  }

  async getItem(key: string, defaultValue: any = null) {
    const config = JSON.parse(await fs.readTextFile('config.json', { dir: this.dir }));
    return config[key] || defaultValue;
  }

  async setItem(key: string, value: string) {
    console.log(key);
    const config = JSON.parse(await fs.readTextFile('config.json', { dir: this.dir }));
    config[key] = value;
    console.log(config[key]);
    await fs.writeTextFile('config.json', JSON.stringify(config), { dir: this.dir });
  }

  async removeItem(key: string) {
    const config = JSON.parse(await fs.readTextFile('config.json', { dir: this.dir }));
    delete config[key];
    await fs.writeTextFile('config.json', JSON.stringify(config), { dir: this.dir });
  }

  async clear() {
    await fs.writeTextFile('config.json', '{}', { dir: this.dir });
  }

  async getAll() {
    return JSON.parse(await fs.readTextFile('config.json', { dir: this.dir }));
  }

  async setAll(config: any) {
    await fs.writeTextFile('config.json', JSON.stringify(config), { dir: this.dir });
  }
}

const AppStorage = new appStorage();


export default AppStorage;