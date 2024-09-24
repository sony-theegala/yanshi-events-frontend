import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Button } from "../ui/button";
import Link from "next/link";
import { useCategoryStore } from "@/lib/category-store";

interface SubcategoryDropDownProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: { required?: boolean | string }; // Optional rules for validation
  manage?: boolean;
  categoryId?: string;
}

export default function SubcategoryDropDown<T extends FieldValues>({
  categoryId,
  manage,
  control,
  name,
  rules,
}: SubcategoryDropDownProps<T>) {
  const { subcategories: list } = useCategoryStore();

  const subcategories = categoryId
    ? list.filter((item) => item?.categoryId === categoryId)
    : list;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>Subategory</Label>
      <div className="space-y-2">
        <Controller
          control={control}
          name={name}
          rules={rules} // Pass rules for validation
          render={({ field, fieldState }) => (
            <>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                // onBlur={field.onBlur} // Trigger onBlur for field validation
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {subcategories?.map((subcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && fieldState.error?.message && (
                <p className="text-red-500">{fieldState.error.message}</p>
              )}
            </>
          )}
        />
        {manage && (
          <div>
            <Link href="/subcategories" passHref>
              <Button variant="secondary">Manage Categories</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
