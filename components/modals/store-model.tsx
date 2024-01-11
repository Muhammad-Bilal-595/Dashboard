"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { NextResponse } from "next/server";
import axios from "axios";
import toast from "react-hot-toast";
import prismadb from "@/lib/prismadb";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Store Name must be at least 3 characters.",
  }),
});

export const StoreModal = () => {
  const [loading, setLoading] = useState(false);
  const storeModel = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      window.location.assign(`/${response.data.id}`);
      console.log(response.data);
    } catch (error) {
      toast.error("Something went wrong!.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Create Store"
      description="Add a new Store to manage products and categories"
      isOpen={storeModel.isOpen}
      onClose={storeModel.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button
                  disabled={loading}
                  variant={"outline"}
                  onClick={storeModel.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
