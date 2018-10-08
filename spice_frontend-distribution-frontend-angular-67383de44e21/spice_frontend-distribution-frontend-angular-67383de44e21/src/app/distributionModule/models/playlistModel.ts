export class Countries {
  countryCode: string;
  countryId: number;
  countryName: string;
  constructor() { }
}

// tslint:disable-next-line:class-name
export class playListCountry {
  countryId: number;
}


// tslint:disable-next-line:class-name
export class playListResourceCode {
  Title: string;
  resourceCode: string;
  artist: string;
  imageURL: string;
}

// tslint:disable-next-line:class-name
export class playList {
  id: number;
  name: string;
  desc: string;
  dayTime: string;
  imageCode: string;
  playListType: number;
  playListCountry: playListCountry[];
  resourceCode: playListResourceCode[];
}


