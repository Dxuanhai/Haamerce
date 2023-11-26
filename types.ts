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
    sizes: Size;
  }[];
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
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
