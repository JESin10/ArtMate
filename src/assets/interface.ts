export interface ArtworkInfo {
  dp_artist?: string;
  dp_art_cnt?: number;
  dp_art_part: string;
  dp_start: Date;
  dp_end: Date;
  dp_date: Date;
  dp_event?: string | null;
  dp_ex_no?: number;
  dp_homepage?: string | null;
  dp_info: string;
  dp_link?: string;
  dp_main_img?: string;
  dp_name?: string;
  dp_place?: string;
  dp_seq?: number;
  dp_sponser?: string;
  dp_subname?: string | null;
  dp_viewpoint?: string | null;
  dp_viewtime: string;
}

export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  artworkInfo: ArtworkInfo | null;
  currentUser: any;
  CloudInfo?: Object | null;
  onFilterChange?: (filteredData: ArtworkInfo[]) => void; // Add this line
}

export interface ArtWorkSaveInfo {
  Uid: string;
  // Artwork_No : number;
  isSaved: boolean;
  DP_NAME: string;
  DP_EX_NO: number;
  DP_MAIN_IMG: string;
  DP_END: Date;
  DP_ART_PART: string;
}

export interface CommentProps {
  isOpen: boolean;
  closeModal: () => void;
  currentUser: any;
  ReviewInfo: ReviewInfo | null;
}

export interface ReviewProps {
  isOpen: boolean;
  closeModal: () => void;
  currentUser: any;
}

export interface ReviewInfo {
  Review_Uid: string;
  User_ID: string;
  Title: string;
  Content: string;
  Img?: string | null;
  Visited_Date: Date;
  Like_Cnt?: number;
  Comment_Uid: string;
}

export interface ReviewCommentInfo {
  Uid: string;
  Comment_Uid: string;
  User_ID: string;
  Content: string;
  Updated_Date: Date;
}

export interface FilterInfo {
  Uid: string;
  // Artwork_No : number;
  // isSaved: boolean;
  dp_name: string;
  dp_ex_np: number;
  dp_main_img: string;
  dp_end: Date;
  dp_art_part: string;
}

export interface RecommendArtworkInfo {
  index: number;
  dp_main_img: string;
}

export interface LikedReviewInfo {
  Review_Uid: string;
  Uid?: string;
}

export interface SearchInfo {
  keyword?: string;
  searchMode?: boolean;
  searchResults?: any;
}

export interface UserInfo {
  userId: string;
  uid: string;
  name: string;
  profileURL: string[];
  email: string;
  access_token?: string;
}

export interface LatestArtworkInfo {
  dp_end: Date;
  dp_main_img: string;
  dp_name: string;
  dp_start: Date;
  dp_artist: string;
  dp_ex_no: number;
  dp_art_part: string;
}
