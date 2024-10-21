"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import { useCategoryStore } from "@/lib/category-store";

type CategoryFormData = {
  name: string;
};

export default function CategoriesPage() {
  const { categories, createCategory, deleteCategory, refreshCategories } =
    useCategoryStore();
  const { register, handleSubmit, reset } = useForm<CategoryFormData>();
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const handleAddCategory = async (data: CategoryFormData) => {
    try {
      await createCategory(data.name);
      reset();
      toast.success("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category.");
    }
  };

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      await deleteCategory(categoryToDelete);
      setCategoryToDelete(null);
      toast.success("Category deleted successfully!");
    }
  };

  useEffect(() => {
    refreshCategories();
  }, [refreshCategories]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(handleAddCategory)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Input
                    id="new-category"
                    {...register("name", { required: true })}
                    placeholder="Enter new category name"
                    className="flex-grow"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Add
                </Button>
              </form>
            </CardContent>
          </Card>
          {categories?.map((category) => (
            <Card key={category.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      onClick={() => setCategoryToDelete(category.id)}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        {`This action cannot be undone. This will permanently delete the category "${category.name}" from your list.`}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => setCategoryToDelete(null)}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteCategory}>
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
