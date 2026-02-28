import type { Data } from './types';

export function GetPostData() {
  return fetchData('https://dev.narikakun.net/webapi/earthquake/post_data.json');
}

export function GetVXSE51Data() {
  return fetchData(
    'https://dev.narikakun.net/webapi/earthquake/last/%E9%9C%87%E5%BA%A6%E9%80%9F%E5%A0%B1.json'
  );
}

export function GetVXSE52Data() {
  return fetchData(
    'https://dev.narikakun.net/webapi/earthquake/last/%E9%9C%87%E6%BA%90%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%83%85%E5%A0%B1.json'
  );
}

export function GetVXSE53Data() {
  return fetchData(
    'https://dev.narikakun.net/webapi/earthquake/last/%E9%9C%87%E6%BA%90%E3%83%BB%E9%9C%87%E5%BA%A6%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%83%85%E5%A0%B1.json'
  );
}

async function fetchData(url: string): Promise<Data | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error('Network error');
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch data', err);
    return null;
  }
}
