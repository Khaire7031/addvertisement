import React, { useEffect, useState } from 'react';
import {
    ActionIcon, Card, Group, Image, Menu, SimpleGrid, Text, Button, Badge
} from '@mantine/core';
import {
    IconDots, IconEye, IconShare, IconHeart, IconMapPin,
} from '@tabler/icons-react';
import { NavLink } from '@/components/NavLink';

interface ListingCardProps {
    listing: any;
}

export default function PGDetails({ listing }: ListingCardProps) {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const rawImages = typeof listing.images === 'string'
            ? listing.images.split(",")
            : listing.images;

        // Filter out empty strings and trim whitespace
        const cleanImages = Array.isArray(rawImages)
            ? rawImages.map(img => img.trim()).filter(img => img !== "")
            : [];
        setImages(cleanImages);
    }, [listing]);

    // Main featured image (first image)
    const mainImage = images[0] || 'https://placehold.co/600x400?text=No+Image';

    // Thumbnails (next 3 images)
    const thumbnails = images.slice(1, 4);

    return (
        <Card withBorder shadow="sm" radius="md" className="hover:shadow-md transition-shadow">
            {/* Header Section */}
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <Text fw={600} size="sm" className="line-clamp-1 flex-1">
                        {listing.pgName}
                    </Text>
                    <Menu withinPortal position="bottom-end" shadow="sm">
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDots size={16} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconHeart size={14} />}>Save to Favorites</Menu.Item>
                            <Menu.Item leftSection={<IconShare size={14} />}>Share PG</Menu.Item>
                            <Menu.Item leftSection={<IconEye size={14} />}>Quick Preview</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Card.Section>

            {/* Main Hero Image */}
            <Card.Section mt="xs">
                <Image
                    src={mainImage}
                    height={180}
                    alt="Main PG Image"
                    fallbackSrc="https://placehold.co/600x400?text=Listing+Image"
                />
            </Card.Section>

            {/* Thumbnail Grid - Style requested */}
            <Card.Section inheritPadding mt="sm">
                <SimpleGrid cols={3}>
                    {thumbnails.map((image, index) => (
                        <Image
                            src={image}
                            key={index}
                            radius="xs"
                            height={50}
                            className="object-cover"
                            fallbackSrc="https://placehold.co/100x100?text=PG"
                        />
                    ))}
                    {/* Fill empty spots if less than 3 thumbnails exist */}
                    {thumbnails.length === 0 && <div className="bg-gray-50 h-[50px] rounded-xs" />}
                </SimpleGrid>
            </Card.Section>

            {/* Content Section */}
            <div className="py-4">
                <Group gap="xs" mb="xs">
                    <Badge variant="light" size="xs" color="blue">{listing.occupancy}</Badge>
                    <Badge variant="outline" size="xs" color="gray">{listing.roomType} Sharing</Badge>
                </Group>

                <Group gap={4} mb="xs">
                    <IconMapPin size={14} className="text-gray-500" />
                    <Text size="xs" c="dimmed" className="line-clamp-1">
                        {listing.address}
                    </Text>
                </Group>

                <Group justify="space-between" align="center" mt="md">
                    <div className="flex items-center text-blue-600">
                        {/* <IconIndianRupee size={18} stroke={3} /> */}
                        <Text fw={800} size="xl">
                            {Number(listing.rentPerPerson).toLocaleString('en-IN')}
                        </Text>
                        <Text size="xs" c="dimmed" ml={2}>/mo</Text>
                    </div>
                </Group>
            </div>

            {/* Action Button - 1 button to show all details */}
            <Card.Section inheritPadding pb="md">
                <NavLink to={`/listing/${listing.id}`} className="no-underline">
                    <Button
                        fullWidth
                        variant="filled"
                        color="blue"
                        radius="md"
                        rightSection={<IconEye size={16} />}
                    >
                        Show All Details
                    </Button>
                </NavLink>
            </Card.Section>
        </Card>
    );
}