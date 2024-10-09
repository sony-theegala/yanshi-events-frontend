import { create } from 'zustand';
import api from './api';

export type Category = {
    id: string;
    name: string;
};

export type Subcategory = {
    id: string;
    name: string;
    categoryId: string;
    createdAt: string;
    category: Category;
};

type Store = {
    categories: Category[];
    subcategories: Subcategory[];
    refreshCategories: () => Promise<void>;
    refreshSubcategories: () => Promise<void>;
    createCategory: (name: string) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
    createSubcategory: (name: string, categoryId: string) => Promise<void>;
    deleteSubcategory: (id: string) => Promise<void>;
};

export const useCategoryStore = create<Store>((set) => ({
    categories: [],
    subcategories: [],
    refreshCategories: async () => {
        try {
            const response = await api.get<Category[]>('/categories');
            set({ categories: response.data });
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    },
    refreshSubcategories: async () => {
        try {
            const response = await api.get<Subcategory[]>('/subcategories');
            set({ subcategories: response.data });
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    },
    createCategory: async (name: string) => {
        try {
            const response = await api.post<Category>('/categories', { name });
            set((state) => ({
                categories: [...state.categories, response.data],
            }));
        } catch (error) {
            console.error("Error creating category:", error);
        }
    },
    deleteCategory: async (id: string) => {
        try {
            await api.delete(`/categories/${id}`);
            set((state) => ({
                categories: state.categories.filter((category) => category.id !== id),
            }));
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    },
    createSubcategory: async (name: string, categoryId: string) => {
        try {
            const response = await api.post<Subcategory>('/subcategories', { name, categoryId });
            set((state) => ({
                subcategories: [...state.subcategories, response.data],
            }));
        } catch (error) {
            console.error("Error creating subcategory:", error);
        }
    },
    deleteSubcategory: async (id: string) => {
        try {
            await api.delete(`/subcategories/${id}`);
            set((state) => ({
                subcategories: state.subcategories.filter((subcategory) => subcategory.id !== id),
            }));
        } catch (error) {
            console.error("Error deleting subcategory:", error);
        }
    },
}));


useCategoryStore.getState().refreshCategories();
useCategoryStore.getState().refreshSubcategories();