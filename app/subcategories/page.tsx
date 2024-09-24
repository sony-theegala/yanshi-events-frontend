"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
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
import CategoryDropDown from "@/components/reusables/CategoryDropDown";
import { useCategoryStore } from "@/lib/category-store";

type SubcategoryFormData = {
  name: string;
  categoryId: string;
};

export default function ManageSubcategoriesPage() {
  const {
    subcategories,
    refreshSubcategories,
    createSubcategory,
    deleteSubcategory,
  } = useCategoryStore();
  const { control, handleSubmit, reset, register } =
    useForm<SubcategoryFormData>();
  const [subcategoryToDelete, setSubcategoryToDelete] = useState<string | null>(
    null
  );

  const handleAddSubcategory = async (data: SubcategoryFormData) => {
    try {
      await createSubcategory(data.name, data.categoryId);
      reset();
      toast.success("Subcategory added successfully!");
    } catch (error) {
      console.error("Error adding subcategory:", error);
      toast.error("Failed to add subcategory.");
    }
  };

  const handleDeleteSubcategory = async () => {
    if (subcategoryToDelete) {
      await deleteSubcategory(subcategoryToDelete);
      setSubcategoryToDelete(null);
      toast.success("Subcategory deleted successfully!");
    }
  };

  useEffect(() => {
    refreshSubcategories();
  }, [refreshSubcategories]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Subcategories</h1>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Subcategory</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(handleAddSubcategory)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Input
                    id="subcategory-name"
                    {...register("name", { required: true })}
                    placeholder="Enter new subcategory name"
                  />
                </div>
                <CategoryDropDown
                  control={control}
                  name="categoryId"
                  rules={{ required: "Category is required" }} // Set the category as required
                />
                <Button type="submit" className="w-full">
                  Add Subcategory
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing Subcategories List */}
          {subcategories?.map((subcategory) => (
            <Card
              key={subcategory.id}
              className="flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle>{subcategory.name}</CardTitle>
                <CardDescription>{subcategory?.category?.name}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      onClick={() => setSubcategoryToDelete(subcategory.id)}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        {`This action cannot be undone. This will permanently delete the subcategory "${subcategory.name}" from your list.`}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => setSubcategoryToDelete(null)}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteSubcategory}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
