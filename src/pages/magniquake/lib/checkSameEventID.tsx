'use client';

import { GetVXSE51Data, GetVXSE52Data } from './getData';

export function checkSameEventId(eventId: string) {
  const data51 = GetVXSE51Data();
  const data52 = GetVXSE52Data();

  if (!data51 || !data52) {
    return null;
  }

  const data51EventId = data51.Head.EventID;
  const data52EventId = data52.Head.EventID;

  return {
    data51EventIdStatus: data51EventId === eventId,
    data52EventIdStatus: data52EventId === eventId,
  };
}
