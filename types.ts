export interface Product {
  id: string;
  category: Category;
  name: string;
  price: number;
  discount: number;
  isFeatured: boolean;

  productColors: {
    color: Color;
    images: {
      id: string;
      url: string;
    }[];
    sizes: Size[];
  }[];
}
export interface Order {
  id: string;
  name: string;
  price: number;
  discount: number;
  color: string;
  size: string;
  image: string;
  quantity: number;
}
export interface UserInfo {
  fullName: string;
  phoneNumber: string;
  profileId?: string;
  email: string;
  address: string;
  paymentMethod?: string;
  ward?: string | undefined;
  district?: string | undefined;
  province?: string | undefined;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface Provinces {
  province_id: string;
  province_name: string;
  province_type?: string;
}
export interface District {
  district_id: string;
  district_name: string;
  district_type?: string;
  province_id: string;
}
export interface Ward {
  district_id: string;
  ward_id: string;
  ward_name: string;
  ward_type?: string;
}

export interface Review {
  id: string;
  productId: string;
  content: string;
  parentId: string | null;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
  };
  replies: Review[];
}
