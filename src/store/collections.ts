import { create } from 'zustand';
import { Collection, fetchCollections } from '../lib/supabase';

interface CollectionsState {
  collections: Collection[];
  loading: boolean;
  error: string | null;
  fetch: (type?: Collection['type']) => Promise<void>;
}

export const useCollections = create<CollectionsState>((set) => ({
  collections: [],
  loading: false,
  error: null,
  fetch: async (type) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCollections(type);
      set({ collections: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch collections', loading: false });
    }
  },
}));