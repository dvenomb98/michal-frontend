//
//
// COMPONENTS
//
//
export interface BannerData {
  title: string;
  img: string;
}

export interface Showcases {
  url: string;
  title: string;
  img: string;
}

export interface YoutubeReview {
  description: string;
  url: string;
}

export interface ReasonsArr {
  description: string;
  header: string;
}

export interface ReasonBoxes {
  title: string;
  reasons: ReasonsArr[];
}

export interface BannerInfo {
  list: string[];
  img: string;
}

//
//
//
// PAGES
//
//
//

export interface PromoData {
  banner: BannerData;
  showcases: Showcases[];
  expectation: string[];
  youtubeReview: YoutubeReview;
  reasonsBoxes: ReasonBoxes;
}

export interface PromoVidea {
  promoVideaData: PromoData;
  sharedBannerData: BannerInfo;
}
export interface SquareData {
  name: string;
  url: string;
  img: string;
}
