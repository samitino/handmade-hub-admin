"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../custom ui/Loader";

const OrderStatusDialog = ({ orderId }: { orderId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/orders/${orderId}/status?status=delivered`,
        { method: "PATCH" }
      );
      const message = await res.text();
      if (res.ok) {
        toast.success(message);
        window.location.href = `/orders/${orderId}`;
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-green-300 ml-4 text-white" size="sm">
            Mark as Delivered
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently set the order
              as delivered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleStatus}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {loading && (
        <div className="fixed inset-0 z-[5000] bg-white w-full">
          <Loader />
        </div>
      )}
    </>
  );
};

export default OrderStatusDialog;
