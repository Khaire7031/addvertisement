import { useParams, useNavigate } from "react-router-dom";
import { Container, Grid, Card, Text, Title, Button, Badge, Group, Image, Divider, TextInput, Textarea, Stack, Anchor } from "@mantine/core";

import { IconMapPin, IconArrowLeft, IconPhone, IconMail, IconBrandWhatsapp, IconCheck } from "@tabler/icons-react";

import { useState } from "react";
import { toast } from "sonner";
import { usePGData } from "@/context/PGContext";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";
import { Carousel } from "@mantine/carousel";


const ListingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { pgList, loading } = usePGData();

    const listing = pgList.find((l: any) => l.id === id);

    console.log("Listing Detail - Loaded listing:", listing);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [reviewRefresh, setReviewRefresh] = useState(0);
    const [userReview, setUserReview] = useState<any>(null);

    if (loading) {
        return (
            <Container size="md" py="xl">
                <Text>Loading...</Text>
            </Container>
        );
    }

    if (!listing) {
        return (
            <Container size="md" py="xl">
                <Title order={3}>Listing not found</Title>
                <Button mt="md" onClick={() => navigate("/listings")}>
                    Back to Listings
                </Button>
            </Container>
        );
    }

    /* ---------------- NORMALIZATION ---------------- */
    const images = listing.images
        ? listing.images.split(",").map((i: string) => i.trim())
        : [];

    const amenities = listing.amenities
        ? listing.amenities.split(",").map((a: string) => a.trim())
        : [];

    const roomTypeLabel: any = {
        single: "Single",
        double: "Double",
        triple: "Triple",
        shared: "Shared",
    };

    const occupancyLabel: any = {
        boys: "Boys Only",
        girls: "Girls Only",
        unisex: "Co-living",
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Inquiry sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    const handleWhatsApp = () => {
        const msg = encodeURIComponent(
            `Hi, I'm interested in ${listing.pgName}. Please share more details.`
        );
        window.open(
            `https://wa.me/${listing.whatsapp.replace(/\D/g, "")}?text=${msg}`,
            "_blank"
        );
    };

    return (
        <Container size="xl" py="xl">
            <Button
                variant="subtle"
                leftSection={<IconArrowLeft size={16} />}
                mb="lg"
                onClick={() => navigate("/listings")}
            >
                Back to Listings
            </Button>

            <Grid gutter="xl">
                {/* LEFT CONTENT */}
                <Grid.Col span={{ base: 12, md: 8 }}>
                    {/* IMAGES */}
                    <Card radius="lg" shadow="sm" p={0} style={{ overflow: "hidden" }}>
                        <Carousel
                            withIndicators
                            // height={500}
                            slideSize="100%"
                            slideGap={0}
                        // align="center"
                        >
                            {images.map((img: string, idx: number) => (
                                <Carousel.Slide key={idx}>
                                    <Image
                                        src={img}
                                        height={420}
                                        fit="cover"
                                        alt={`${listing.pgName} - ${idx + 1}`}
                                    />
                                </Carousel.Slide>
                            ))}
                        </Carousel>
                    </Card>

                    {/* DETAILS */}
                    <Card shadow="sm" radius="md" mt="lg" p="lg">
                        <Title order={2}>{listing.pgName}</Title>

                        <Group mt={6} gap={6}>
                            <IconMapPin size={16} />
                            <Text size="sm" c="dimmed">
                                {listing.address}
                            </Text>
                        </Group>

                        <Group mt="md">
                            <Title order={3} c="orange">
                                ₹{Number(listing.rentPerPerson).toLocaleString("en-IN")}
                            </Title>
                            <Text c="dimmed">/ month</Text>
                        </Group>

                        <Group mt="sm">
                            <Badge>
                                {roomTypeLabel[listing.roomType] || "Shared"} Sharing
                            </Badge>
                            <Badge variant="outline">
                                {occupancyLabel[listing.occupancy]}
                            </Badge>
                        </Group>

                        <Divider my="md" />

                        <Title order={4}>Description</Title>
                        <Text mt={6} c="dimmed">
                            {listing.description}
                        </Text>

                        <Divider my="md" />

                        <Title order={4}>Amenities</Title>

                        <Group mt="sm" gap="xs">
                            {amenities.map((a: string, i: number) => (
                                <Badge
                                    key={i}
                                    radius="md"
                                    color="rgba(255, 72, 0, 0.9)"
                                    size="lg"
                                >
                                    {a}
                                </Badge>
                            ))}
                        </Group>

                        <Divider my="md" />

                        <Anchor
                            href={listing.googleMapLink}
                            target="_blank"
                            c="blue"
                            fw={500}
                        >
                            <Group gap={6}>
                                <IconMapPin size={16} />
                                View on Google Maps
                            </Group>
                        </Anchor>
                    </Card>


                    {/* REVIEWS (UNCHANGED) */}
                    <ReviewForm
                        listingId={listing.id}
                        existingReview={userReview}
                        onReviewSubmitted={() => setReviewRefresh((r) => r + 1)}
                    />

                    <ReviewsList
                        listingId={listing.id}
                        refreshTrigger={reviewRefresh}
                        onUserReviewFound={setUserReview}
                    />
                </Grid.Col>

                {/* RIGHT SIDEBAR */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Stack>
                        {/* CONTACT CARD */}
                        <Card shadow="sm" radius="md" p="lg">
                            <Title order={4}>Contact Owner</Title>

                            <Text fw={500} mt="sm">
                                {listing.contactPerson}
                            </Text>

                            <Anchor
                                href={`tel:${listing.mobile.split(",")[0]}`}
                                mt="sm"
                            >
                                <Group gap={6}>
                                    <IconPhone size={16} />
                                    <Text size="sm">{listing.mobile}</Text>
                                </Group>
                            </Anchor>

                            {listing.email && (
                                <Anchor href={`mailto:${listing.email}`} mt={6}>
                                    <Group gap={6}>
                                        <IconMail size={16} />
                                        <Text size="sm">{listing.email}</Text>
                                    </Group>
                                </Anchor>
                            )}

                            <Button
                                mt="md"
                                fullWidth
                                color="green"
                                leftSection={<IconBrandWhatsapp size={18} />}
                                onClick={handleWhatsApp}
                            >
                                WhatsApp
                            </Button>
                        </Card>

                        {/* INQUIRY FORM */}
                        <Card shadow="sm" radius="md" p="lg">
                            <Title order={4}>Send Inquiry</Title>

                            <form onSubmit={handleSubmit}>
                                <Stack mt="md">
                                    <TextInput
                                        label="Name"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                    />
                                    <TextInput
                                        label="Email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                    />
                                    <TextInput
                                        label="Phone"
                                        required
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                    />
                                    <Textarea
                                        label="Message"
                                        required
                                        minRows={3}
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({ ...formData, message: e.target.value })
                                        }
                                    />
                                    <Button type="submit">Send Inquiry</Button>
                                </Stack>
                            </form>
                        </Card>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default ListingDetail;
