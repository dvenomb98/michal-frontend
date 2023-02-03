//
//
// COMPONENTS
//
//
export interface BannerData {
  title: string;
  img?: string;
  video?: string;
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

export interface ContactComponent {
  buttonText: string;
  title: string;
  description: string;
}

export interface PriceList {
  title: string;
  description: string;
  price: string;
}

export interface FaqTypes {
  question: string;
  answer: string;
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
  plainText: string[];
}

export interface PromoVidea {
  promoVideaData: PromoData;
  sharedBannerData: BannerInfo;
  contactCompData: ContactComponent;
}

export interface SvatbyData {
  banner: BannerData;
  showcases: Showcases[];
  reasonsBoxes: ReasonBoxes;
  plainText: string[];
  references: string[];
  priceList: PriceList[];
  faq: FaqTypes[];
}

export interface SvatbyPage {
  svatbyData: SvatbyData;
  sharedBannerData: BannerInfo;
  contactCompData: ContactComponent;
}
export interface SquareData {
  name: string;
  url: string;
  img: string;
}
export interface EventyData {
  banner: BannerData;
  showcases: Showcases[];
  reasonsBoxes: ReasonBoxes;
  plainText: string[];
}
export interface EventyPage {
  eventyData: EventyData;
  sharedBannerData: BannerInfo;
  contactCompData: ContactComponent;
}

//
//
// BLOG
//
//

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  featured_img: string;
  thumbnail: string;
  tags: string[];
  content: string;
  minutes_to_read: number | null;
  created_at: string;
  isPublished: boolean;
}
