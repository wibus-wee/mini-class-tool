/*
 * @FilePath: /mini-class-tool/src/hooks/useStorage.ts
 * @author: Wibus
 * @Date: 2022-11-11 16:02:29
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-11 16:09:47
 * Coding With IU
 */

import { useState, useEffect } from 'react';

export default function useStorage(key: string, defaultValue?: any) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof defaultValue === 'function') {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

// Usage:
// 
// import useStorage from './useStorage';
// const [name, setName] = useStorage('name', 'Wibus');
// const [age, setAge] = useStorage('age', 18);
// setName('Wibus'); // localStorage will be updated