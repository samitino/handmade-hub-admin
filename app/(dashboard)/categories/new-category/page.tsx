"use client";

import AddCategoryForm from "@/components/categories/AddCategoryForm";
import AddSubcategoryForm from "@/components/categories/AddSubcategoryForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NewCategoryPage = () => {
  const router = useRouter();

  const [isCategory, setIsCategory] = useState(true);
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
      <div className="flex items-center justify-between gap-6">
        <p className="text-heading2-bold max-md:hidden">Categories</p>
        <div className="flex flex-wrap items-center gap-6">
          <Button
            className="bg-blue-1 text-white"
            onClick={() => setIsCategory(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Category
          </Button>
          <Button
            className="bg-blue-1 text-white"
            onClick={() => setIsCategory(false)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Subcategory
          </Button>
        </div>
      </div>
      <Separator className="bg-grey-1 my-4" />
      {isCategory ? (
        <AddCategoryForm />
      ) : (
        <AddSubcategoryForm categories={categories ?? []} />
      )}
    </div>
  );
};

export default NewCategoryPage;
