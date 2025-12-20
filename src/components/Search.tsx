import React, { useState, useEffect } from 'react';
import {
    TextInput, Select, MultiSelect, RangeSlider,
    Text, Collapse, Button, Box, Paper, Stack, Group
} from '@mantine/core';
import {
    IconSearch, IconAdjustmentsHorizontal,
    IconCalendarTime, IconX, IconFilter
} from '@tabler/icons-react';

interface SearchProps {
    onFilterChange: (filters: any) => void;
}

export default function Search({ onFilterChange }: SearchProps) {
    const [opened, setOpened] = useState(false); // Mobile collapse state
    const [query, setQuery] = useState('');
    const [occupancy, setOccupancy] = useState<string | null>('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 25000]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [dateRange, setDateRange] = useState<string | null>('all');

    useEffect(() => {
        onFilterChange({ query, occupancy, priceRange, selectedAmenities, dateRange });
    }, [query, occupancy, priceRange, selectedAmenities, dateRange]);

    const clearFilters = () => {
        setQuery('');
        setOccupancy('');
        setPriceRange([0, 25000]);
        setSelectedAmenities([]);
        setDateRange('all');
    };

    return (
        <Paper shadow="xs" p="xs" withBorder radius="md" className="mb-6 bg-white w-full">
            {/* Desktop Layout: Everything in one line */}
            {/* Mobile Layout: Search + Toggle button, others collapsed */}
            <div className="flex flex-col md:flex-row gap-3 items-end md:items-center">

                {/* 1. Main Search (Always Visible) */}
                <div className="w-full md:flex-[1.5]">
                    <TextInput
                        placeholder="Area or PG Name..."
                        leftSection={<IconSearch size={16} />}
                        value={query}
                        onChange={(e) => setQuery(e.currentTarget.value)}
                        size="sm"
                        radius="md"
                    />
                </div>

                {/* 2. Desktop-Only Horizontal Filters (Hidden on Mobile) */}
                <div className="hidden md:flex flex-row gap-3 items-center flex-[3]">
                    <Select
                        placeholder="Date"
                        className="w-32"
                        data={[
                            { value: 'all', label: 'Any time' },
                            { value: '1', label: 'Last 24h' },
                            { value: '7', label: '7 Days' },
                            { value: '30', label: 'Month' },
                        ]}
                        value={dateRange}
                        onChange={setDateRange}
                        size="sm"
                    />

                    <Select
                        placeholder="Occupancy"
                        className="w-36"
                        data={['boys', 'girls', 'any']}
                        value={occupancy}
                        onChange={setOccupancy}
                        size="sm"
                    />

                    <MultiSelect
                        placeholder="Amenities"
                        className="min-w-[150px] flex-1"
                        data={['WiFi', 'AC', 'CCTV', 'Parking', 'Food']}
                        value={selectedAmenities}
                        onChange={setSelectedAmenities}
                        size="sm"
                        maxValues={1} // Keeps it compact
                        hidePickedOptions
                    />

                    <Box className="w-48 px-2">
                        <Group justify="space-between" mb={4}>
                            <Text size="10px" fw={700} c="dimmed">RENT: ₹{priceRange[1]}</Text>
                        </Group>
                        <RangeSlider
                            size="xs"
                            max={25000}
                            step={500}
                            value={priceRange}
                            onChange={setPriceRange}
                            label={null}
                        />
                    </Box>

                    <Button variant="subtle" color="gray" p={0} onClick={clearFilters}>
                        <IconX size={16} />
                    </Button>
                </div>

                {/* 3. Mobile Filter Toggle (Hidden on Desktop) */}
                <Button
                    variant="light"
                    className="md:hidden w-full"
                    leftSection={<IconFilter size={16} />}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                >
                    {opened ? "Hide Filters" : "Show Filters"}
                </Button>
            </div>

            {/* 4. Mobile-Only Collapse Content */}
            <Collapse in={opened} className="md:hidden">
                <Stack gap="sm" mt="md" className="pt-3 border-t">
                    <Select
                        label="Date Posted"
                        data={[{ value: 'all', label: 'Any time' }, { value: '7', label: '7 Days' }]}
                        value={dateRange}
                        onChange={setDateRange}
                        size="sm"
                    />
                    <Select
                        label="Occupancy"
                        data={['boys', 'girls', 'any']}
                        value={occupancy}
                        onChange={setOccupancy}
                        size="sm"
                    />
                    <MultiSelect
                        label="Amenities"
                        data={['WiFi', 'AC', 'CCTV']}
                        value={selectedAmenities}
                        onChange={setSelectedAmenities}
                        size="sm"
                    />
                    <Box>
                        <Text size="xs" mb="xs">Rent Range: ₹{priceRange[0]} - ₹{priceRange[1]}</Text>
                        <RangeSlider max={25000} value={priceRange} onChange={setPriceRange} size="sm" />
                    </Box>
                    <Button variant="outline" color="gray" fullWidth size="sm" onClick={clearFilters}>
                        Reset All
                    </Button>
                </Stack>
            </Collapse>
        </Paper>
    );
}