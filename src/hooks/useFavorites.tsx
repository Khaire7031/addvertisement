import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useFavorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchFavorites();
        } else {
            setFavorites([]);
            setLoading(false);
        }
    }, [user]);

    const fetchFavorites = async () => {
        if (!user) return;

        try {
            const { data, error } = await supabase
                .from('favorites')
                .select('listing_id')
                .eq('user_id', user.id);

            if (error) throw error;
            setFavorites(data?.map(f => f.listing_id) || []);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (listingId: string) => {
        if (!user) {
            toast.error('Please sign in to save favorites');
            return;
        }

        const isFavorite = favorites.includes(listingId);

        try {
            if (isFavorite) {
                const { error } = await supabase
                    .from('favorites')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('listing_id', listingId);

                if (error) throw error;
                setFavorites(prev => prev.filter(id => id !== listingId));
                toast.success('Removed from wishlist');
            } else {
                const { error } = await supabase
                    .from('favorites')
                    .insert({ user_id: user.id, listing_id: listingId });

                if (error) throw error;
                setFavorites(prev => [...prev, listingId]);
                toast.success('Added to wishlist');
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            toast.error('Something went wrong');
        }
    };

    const isFavorite = (listingId: string) => favorites.includes(listingId);

    return { favorites, loading, toggleFavorite, isFavorite, refetch: fetchFavorites };
};
