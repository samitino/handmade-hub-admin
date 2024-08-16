"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await fetch("/api/categories", {
        method: "GET",
      });
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      console.log("[categories_GET]", err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <h1 className="text-heading2-bold">Categories</h1>
        <div className="flex items-center gap-6">
          <Button
            className="bg-blue-1 text-white"
            onClick={() => router.push("/categories/new-category")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Categories
          </Button>
        </div>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <div className="mt-7 md:mt-10 space-y-8">
        {categories.map((category: any) => (
          <div key={category._id}>
            <h2 className="text-heading3-bold capitalize">{category.name}</h2>
            <div className="mt-3 flex gap-3">
              {category.subcategories.map((subcategory: any) => (
                <Badge
                  key={subcategory._id}
                  variant="secondary"
                  className="bg-blue-3 text-[16px]"
                >
                  {subcategory.name}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
