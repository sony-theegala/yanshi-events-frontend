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
    refreshCategories: () => Promise<any>;
    refreshSubcategories: () => Promise<any>;
    createCategory: (name: string) => Promise<any>;
    deleteCategory: (id: string) => Promise<any>;
    createSubcategory: (name: string, categoryId: string) => Promise<any>;
    deleteSubcategory: (id: string) => Promise<any>;
};

export const useCategoryStore = create<Store>((set) => ({
    categories: [],
    subcategories: [],
    refreshCategories: async () => {
        try {
            const response = await api.get<Category[]>('/categories');
            set({ categories: response.data });
            return response
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw new Error(JSON.stringify(error))
        }
    },
    refreshSubcategories: async () => {
        try {
            const response = await api.get<Subcategory[]>('/subcategories');
            set({ subcategories: response.data });
            return response
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            throw new Error(JSON.stringify(error))
        }
    },
    createCategory: async (name: string) => {
        try {
            const response = await api.post<Category>('/categories', { name });
            set((state) => ({
                categories: [...state.categories, response.data],
            }));
            return response
        } catch (error) {
            console.error("Error creating category:", error);
            throw new Error(JSON.stringify(error))
        }
    },
    deleteCategory: async (id: string) => {
        try {
            const response = await api.delete(`/categories/${id}`);
            set((state) => ({
                categories: state.categories.filter((category) => category.id !== id),
            }));
            return response
        } catch (error) {
            console.error("Error deleting category:", error);
            throw new Error(JSON.stringify(error))
        }
    },
    createSubcategory: async (name: string, categoryId: string) => {
        try {
            const response = await api.post<Subcategory>('/subcategories', { name, categoryId });
            set((state) => ({
                subcategories: [...state.subcategories, response.data],
            }));
            return response
        } catch (error) {
            console.error("Error creating subcategory:", error);
            throw new Error(JSON.stringify(error))
        }
    },
    deleteSubcategory: async (id: string) => {
        try {
            const response = await api.delete(`/subcategories/${id}`);
            set((state) => ({
                subcategories: state.subcategories.filter((subcategory) => subcategory.id !== id),
            }));
            return response
        } catch (error) {
            console.error("Error deleting subcategory:", error);
            throw new Error(JSON.stringify(error))
        }
    },
}));


useCategoryStore.getState().refreshCategories();
useCategoryStore.getState().refreshSubcategories();
