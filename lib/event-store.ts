import { create } from 'zustand';
import api from './api';

export type Event = {
    id: string;
    name: string;
    date: string | number;
    venue: string;
    imageUrl?: string | null | undefined;
    categoryId: string;
    subcategoryId: string;
    contactPhone: string;
    contactEmail: string;
    createdAt: string;
    category: {
        id: string;
        name: string;
        createdAt: string;
    };
    subcategory: {
        id: string;
        name: string;
        categoryId: string;
        createdAt: string;
    };
};

type Store = {
    events: Event[];
    refreshEvents: () => Promise<void>;
    getEventById: (id: string) => Event | undefined;
    createEvent: (eventData: Omit<Event, 'id' | 'createdAt' | 'category' | 'subcategory'>) => Promise<void>;
    updateEvent: (id: string, eventData: Omit<Event, 'id' | 'createdAt' | 'category' | 'subcategory'>) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
};

export const useEventStore = create<Store>((set, get) => ({
    events: [],
    refreshEvents: async () => {
        try {
            const response = await api.get<Event[]>('/events');
            set({ events: response.data });
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    },
    getEventById: (id: string) => {
        return get().events.find(event => event.id === id);
    },
    createEvent: async (eventData) => {
        try {
            const response = await api.post<Event>('/events', eventData);
            set((state) => ({
                events: [...state.events, response.data],
            }));
        } catch (error) {
            console.error("Error creating event:", error);
        }
    },
    updateEvent: async (id: string, eventData) => {
        try {
            const response = await api.put<Event>(`/events/${id}`, eventData);
            set((state) => ({
                events: state.events.map(event => event.id === id ? response.data : event),
            }));
        } catch (error) {
            console.error("Error updating event:", error);
        }
    },
    deleteEvent: async (id: string) => {
        try {
            await api.delete(`/events/${id}`);
            set((state) => ({
                events: state.events.filter(event => event.id !== id),
            }));
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    },
}));

// Example usage
useEventStore.getState().refreshEvents();
