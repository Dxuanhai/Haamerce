import { MetadataRoute } from "next";
import getCategories from "@/actions/get-categories";
import { Category } from "../types";

export default async function sitemap() {
  const categories: Category[] = await getCategories();

  const categoriestSitemap =
    categories.map((category) => ({
      url: `/https://haamerce.vercel.app/category/${category.name}_${category.id}.html`,
      lastModified: new Date(),
    })) ?? [];
  return [
    {
      url: "/https://haamerce.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...categoriestSitemap,
  ];
}
