'use client';

import { InfoBox } from './quakeUtil';
import type { Head, Body } from './types';
import { formatDateTime } from './quakeUtil';
import { useState, useEffect } from 'react';

export function Head({ data }: { data: Head }) {
  return (
    <h1>
      <span className="text-xl">{data.Title}</span>
    </h1>
  );
}

export function Body({ data }: { data: Body }) {
  const [timeStr, setTimeStr] = useState('');
  useEffect(() => {
    const now = new Date();
    const formattedNow = formatDateTime(now);
    setTimeStr(formattedNow);
  }, []);
  return (
    <div>
      <InfoBox title="更新日時">{timeStr}</InfoBox>
      <InfoBox title="発生日時">{formatDateTime(data.Earthquake.OriginTime)}</InfoBox>
      <InfoBox title="震源地">{data.Earthquake.Hypocenter.Name}</InfoBox>
      <InfoBox title="震源の深さ">{data.Earthquake.Hypocenter.Depth}</InfoBox>
      <InfoBox title="マグニチュード">M{data.Earthquake.Magnitude}</InfoBox>
    </div>
  );
}
