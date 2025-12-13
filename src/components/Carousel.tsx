import React from "react";
import { Image, Box } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import PG1 from "../assets/carousel/PG1.jpg";
import PG2 from "../assets/carousel/PG2.jpg";
import PG3 from "../assets/carousel/PG3.jpg";
import PG4 from "../assets/carousel/PG4.jpg";
import PG5 from "../assets/carousel/PG5.jpg";
import PG6 from "../assets/carousel/PG6.jpg";
import PG7 from "../assets/carousel/PG7.jpg";
import PG_VIDEO from "../assets/carousel/PG_VIDEO.mp4";

const media = [
    { type: "image", src: PG1, alt: "PG 1" },
    { type: "image", src: PG2, alt: "PG 2" },
    { type: "image", src: PG3, alt: "PG 3" },
    { type: "image", src: PG4, alt: "PG 4" },
    { type: "image", src: PG5, alt: "PG 5" },
    { type: "image", src: PG6, alt: "PG 6" },
    { type: "image", src: PG7, alt: "PG 7" },
];

const PGCarousel: React.FC = () => {
    return (
        <Box>
            <Carousel
                withIndicators
                height="auto"
                slideSize="20%"
                slideGap="md"
                controlSize={32}
                styles={{
                    control: { background: "rgba(255,255,255,0.6)" },
                }}
            >
                {media.map((m, idx) => (
                    <Carousel.Slide key={idx}>
                        <Image
                            src={m.src}
                            alt={m.alt}
                            radius="md"
                            className="w-full h-auto object-cover"
                        />
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Box>
    );
};

export default PGCarousel;
