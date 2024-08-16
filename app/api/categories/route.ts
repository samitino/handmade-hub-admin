import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import Category from "@/lib/models/Category";
import Subcategory from "@/lib/models/Subcategory";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();

    const isCategory = req.nextUrl.searchParams.get("isCategory");
    if (isCategory) {
      const { name } = await req.json();

      const existingCategory = await Category.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") },
      });

      if (existingCategory) {
        return new NextResponse("Category already exists", { status: 400 });
      }

      const newCategory = await Category.create({
        name,
      });

      return NextResponse.json(newCategory, { status: 200 });
    } else {
      const { category: categoryId, subcategoryName } = await req.json();
      const category = await Category.findById(categoryId);
      if (!category) {
        return new NextResponse("Invalid category", { status: 400 });
      }

      const existingSubcategory = await Subcategory.findOne({
        name: { $regex: new RegExp(`^${subcategoryName}$`, "i") },
      });

      if (existingSubcategory) {
        return new NextResponse("Subcategory already exists", { status: 400 });
      }

      const newSubcategory = await Subcategory.create({
        name: subcategoryName,
      });

      category.subcategories.push(newSubcategory._id);
      await category.save();

      return NextResponse.json(newSubcategory, { status: 200 });
    }
  } catch (err) {
    console.log("[Categorys_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const categories = await Category.find({}).populate({
      path: "subcategories",
      model: Subcategory,
    });

    return NextResponse.json(categories, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log("[Categorys_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
