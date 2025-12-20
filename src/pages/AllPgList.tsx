import React, { useEffect, useState, Suspense } from 'react';
import { usePGData } from '@/context/PGContext';
import { PostData } from '@/dto/PG';
import Search from '@/components/Search';
import { Loader, Center, Text } from '@mantine/core';
import ListingCard from '@/components/ListingCard';
import PGDetails from '@/components/PGDetails';

export default function AllPgList() {
    const { pgList, loading } = usePGData();
    const [filteredData, setFilteredData] = useState<PostData[]>([]);

    // Initialize data
    useEffect(() => {
        if (pgList) setFilteredData(pgList);
    }, [pgList]);

    const handleFilter = (filters: any) => {
        if (!pgList) return;

        const filtered = pgList.filter((pg) => {
            const matchesSearch =
                pg.pgName.toLowerCase().includes(filters.query.toLowerCase()) ||
                pg.address.toLowerCase().includes(filters.query.toLowerCase());

            const matchesOccupancy = filters.occupancy && filters.occupancy !== 'any'
                ? pg.occupancy.toLowerCase() === filters.occupancy.toLowerCase()
                : true;

            const rentNum = parseInt(pg.rentPerPerson.replace(/[^0-9]/g, '')) || 0;
            const matchesPrice = rentNum >= filters.priceRange[0] && rentNum <= filters.priceRange[1];

            const matchesAmenities = filters.selectedAmenities.length > 0
                ? filters.selectedAmenities.every(a => pg.amenities.toLowerCase().includes(a.toLowerCase()))
                : true;

            let matchesDate = true;
            if (filters.dateRange !== 'all' && pg.createdAt) {
                const postDate = new Date(pg.createdAt).getTime();
                const today = new Date().getTime();
                const diffInDays = (today - postDate) / (1000 * 60 * 60 * 24);
                matchesDate = diffInDays <= parseInt(filters.dateRange);
            }

            return matchesSearch && matchesOccupancy && matchesPrice && matchesAmenities && matchesDate;
        });

        setFilteredData(filtered);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6 lg:display-none">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Find Your PG</h1>
                <Text c="dimmed" size="sm">
                    Showing {filteredData.length} verified listings
                </Text>
            </div>

            <Search onFilterChange={handleFilter} />

            <Suspense fallback={<Center className="py-20"><Loader color="blue" /></Center>}>
                {loading ? (
                    <Center className="py-20"><Loader color="blue" /></Center>
                ) : filteredData.length > 0 ? (
                    <div className="grid lg:px-20 px-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* CRITICAL FIX: Map over filteredData, not pgList */}
                        {filteredData.map((listing, index) => (
                            <ListingCard key={listing.id || index} listing={listing} />
                        ))}
                    </div>
                ) : (
                    <Center className="py-20 flex-col">
                        <Text fw={500} c="dimmed">No PGs match your filters.</Text>
                        <Text size="xs" c="dimmed">Try resetting your search or price range.</Text>
                    </Center>
                )}
            </Suspense>
        </div>
    );
}