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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRightIcon } from "lucide-react";
import { toast } from "sonner";

type Category = {
  id: string;
  name: string;
};

export default function AddSubcategorySheet({
  categories,
  onSubcategoryAdded,
}: {
  categories: Category[];
  onSubcategoryAdded: () => void;
}) {
  const { register, handleSubmit, reset } = useForm<{
    name: string;
    categoryId: string;
  }>();

  const onSubmit = async (data: { name: string; categoryId: string }) => {
    try {
      await axios.post("http://localhost:3000/subcategories", {
        name: data.name,
        categoryId: data.categoryId,
      });
      reset();
      onSubcategoryAdded();
      toast.success("Subcategory added successfully!");
    } catch (error) {
      console.error("Error adding subcategory:", error);
      toast.error("Failed to add subcategory.");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Add Subcategory
          <ChevronRightIcon className="h-4 w-4 opacity-50" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Subcategory</SheetTitle>
          <SheetDescription>
            Enter the name and select a category for the new subcategory.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subcategory-name">Subcategory Name</Label>
            <Input
              id="subcategory-name"
              {...register("name", { required: true })}
              placeholder="Enter subcategory name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subcategory-category">Select Category</Label>
            <Select {...register("categoryId", { required: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Add Subcategory
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
