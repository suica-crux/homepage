type Station = {
  Code: string;
  Name: string;
  Int: string;
};

export type City = {
  Code: string;
  Name: string;
  MaxInt: string;
  IntensityStation: Station[];
};

export type Area = {
  Code: string;
  Name: string;
  MaxInt: string;
  City: City[];
};

export type Pref = {
  Code: string;
  Name: string;
  MaxInt: string;
  Area: Area[];
};

export type GroupedByInt = {
  [int: string]: {
    [prefName: string]: string[];
  };
};

export type Head = {
  Headline: string;
  Title: string;
};
