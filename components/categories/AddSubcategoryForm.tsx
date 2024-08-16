"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  category: z.string().min(2, "Category is required"),
  subcategoryName: z
    .string()
    .min(2, "Input a valid subcategory")
    .max(35, "Subcategory cannot exceed 35 char."),
});

const AddSubcategoryForm = ({ categories }: { categories: any }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { category: "", subcategoryName: "" },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);
      const url = `/api/categories`;
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success("Sub category created");
        window.location.href = "/categories";
        router.push("/categories");
      } else {
        const errorMessage = await res.text();
        toast.error(errorMessage);
      }
    } catch (err) {
      console.log("[categories_POST]", err);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <p className="text-heading2-bold">Create Sub-Category</p>

      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {categories.map((category: any) => (
                      <SelectItem
                        className="cursor-pointer hover:bg-gray-400 capitalize"
                        key={category._id}
                        value={category._id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subcategoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="sub-category"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-10">
            <Button
              disabled={loading}
              type="submit"
              className="bg-blue-1 text-white"
            >
              Submit
            </Button>
            <Button
              disabled={loading}
              type="button"
              onClick={() => router.push("/categories")}
              className="bg-blue-1 text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddSubcategoryForm;
