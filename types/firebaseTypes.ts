export interface SquareData {
  name: string;
  url: string;
  img: string;
}

export interface BannerData {
  title: string;
  img: string;
}

export interface Showcases {
  url: string;
  title: string;
  img: string;
}

export interface PromoData {
  banner: BannerData;
  showcases: Showcases[];
  expectation: string[];
}
