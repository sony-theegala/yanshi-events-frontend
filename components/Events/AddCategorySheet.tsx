import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronRightIcon } from "lucide-react";
import { toast } from "sonner";

export default function AddCategorySheet({
  onCategoryAdded,
}: {
  onCategoryAdded: () => void;
}) {
  const { register, handleSubmit, reset } = useForm<{ name: string }>();

  const onSubmit = async (data: { name: string }) => {
    try {
      await axios.post("http://localhost:3000/categories", { name: data.name });
      reset();
      onCategoryAdded();
      toast.success("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category.");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Add Category
          <ChevronRightIcon className="h-4 w-4 opacity-50" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Category</SheetTitle>
          <SheetDescription>
            Enter the name of the new category.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">Category Name</Label>
            <Input
              id="category-name"
              {...register("name", { required: true })}
              placeholder="Enter category name"
            />
          </div>
          <Button type="submit" className="w-full">
            Add Category
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
