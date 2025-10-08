'use client';

import { useEffect, useState } from 'react';
import type { Data } from './types';

export function GetPostData() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch('https://dev.narikakun.net/webapi/earthquake/post_data.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        console.error('データ取得に失敗:', err);
      });
  }, []);

  return data;
}

export function GetVXSE51Data() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch(
      'https://dev.narikakun.net/webapi/earthquake/last/%E9%9C%87%E5%BA%A6%E9%80%9F%E5%A0%B1.json'
    )
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        console.error('データ取得に失敗:', err);
      });
  }, []);

  return data;
}

export function GetVXSE52Data() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch(
      'https://dev.narikakun.net/webapi/earthquake/last/%E9%9C%87%E6%BA%90%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%83%85%E5%A0%B1.json'
    )
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        console.error('データ取得に失敗:', err);
      });
  }, []);

  return data;
}

export function GetVXSE53Data() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch(
      'https://dev.narikakun.net/webapi/earthquake/last/%E9%9C%87%E6%BA%90%E3%83%BB%E9%9C%87%E5%BA%A6%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%83%85%E5%A0%B1.json'
    )
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        console.error('データ取得に失敗:', err);
      });
  }, []);

  return data;
}
