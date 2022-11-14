/*
 * @FilePath: /mini-class-tool/src/hooks/usePromise.ts
 * @author: Wibus
 * @Date: 2022-11-14 11:17:13
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-14 11:17:13
 * Coding With IU
 */
import { useEffect, useState } from 'react';

export default function usePromise(promise: Promise<any>) {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(
    () => {
      let canceled = false;

      promise
        .then((r: any) => {
          if (!canceled) {
            setResult(r);
          }
        })
        .catch((e: any) => {
          if (!canceled) {
            setError(e);
          }
        });

      return () => {
        canceled = true;
      };
    },
    [promise]
  );

  return [result, error];
}