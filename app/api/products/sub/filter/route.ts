import { NextRequest, NextResponse } from "next/server";
import Category from "@/lib/models/Category";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import Subcategory from "@/lib/models/Subcategory";
import { connectToDB } from "@/lib/mongoDB";
import mongoose, { FilterQuery } from "mongoose";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const searchQuery = req.nextUrl.searchParams.get("q");
    const id = req.nextUrl.searchParams.get("id");

    console.log("Query: ", searchQuery);
    const query: FilterQuery<typeof Product> = {};

    if (searchQuery) {
      const id = mongoose.Types.ObjectId.isValid(searchQuery)
        ? searchQuery
        : new mongoose.Types.ObjectId();
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { brand: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
        { category: id },
        { subcategory: id },
      ];
    }

    const products = await Product.find(query)
      .populate({
        path: "collections",
        model: Collection,
      })
      .populate({ path: "category", model: Category })
      .populate({ path: "subcategory", model: Subcategory });

    return NextResponse.json(products, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log("[productId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
