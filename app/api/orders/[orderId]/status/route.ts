import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { orderId: String } }
) => {
  try {
    await connectToDB();

    const orderDetails = await Order.findById(params.orderId);
    if (!orderDetails) {
      return new NextResponse("Order Not Found", {
        status: 404,
      });
    }

    const status = req.nextUrl.searchParams.get("status");

    orderDetails.isDelivered = true;
    await orderDetails.save();

    return new NextResponse("Order marked as delivered", { status: 200 });
  } catch (err) {
    console.log("[orderId_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
