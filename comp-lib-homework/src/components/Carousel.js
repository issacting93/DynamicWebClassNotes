// Carousel.jsx - Clean and simple implementation

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Card from './Card';
import Button from './Button';

// Mock data for the carousel with content and Material Icons
const itemData = [
    {
        id: "item01",
        title: "Mountain Peak",
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=800&fit=crop",
        description: "Towering peaks and alpine adventures.",
        tags: ["terrain", "hiking", "camera_alt"]
    },
    {
        id: "item02",
        title: "Ocean Waves",
        img: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=800&fit=crop",
        description: "Endless waves perfect for surfing.",
        tags: ["waves", "surfing", "beach_access"]
    },
    {
        id: "item03",
        title: "Forest Trail",
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=800&fit=crop",
        description: "Ancient trails through towering trees.",
        tags: ["forest", "directions_walk", "nature"]
    },
    {
        id: "item04",
        title: "Desert Sunset",
        img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=800&fit=crop",
        description: "Golden sand dunes at sunset.",
        tags: ["landscape", "wb_twilight", "flare"]
    },
    {
        id: "item05",
        title: "Northern Lights",
        img: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=400&h=800&fit=crop",
        description: "Aurora borealis dancing in the sky.",
        tags: ["nightlight", "stars", "auto_awesome"]
    },
];

export default function Carousel() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isAnyCardClosing, setIsAnyCardClosing] = useState(false);

    const handleCardClick = (itemId) => {
        if (selectedItem === itemId) {
            // Close the selected card
            setIsAnyCardClosing(true);
            setSelectedItem(null);
            setTimeout(() => setIsAnyCardClosing(false), 350);
        } else {
            // Select a different card
            setSelectedItem(itemId);
            setIsAnyCardClosing(false);
        }
    };

    const handleClose = () => {
        setIsAnyCardClosing(true);
        setSelectedItem(null);
        setTimeout(() => setIsAnyCardClosing(false), 350);
    };

    const carouselClasses = `carousel-container ${selectedItem ? 'state-1' : 'state-0'}`;

    return (
        <div className={carouselClasses}>
            <AnimatePresence mode="popLayout">
                {itemData.map(item => (
                    <Card
                        key={item.id}
                        imgUrl={item.img}
                        itemId={item.id}
                        itemTitle={item.title}
                        description={item.description}
                        tags={item.tags}
                        isSelected={selectedItem === item.id}
                        isAnyCardClosing={isAnyCardClosing}
                        hasSelectedCard={selectedItem !== null}
                        onCardClick={handleCardClick}
                        onClose={handleClose}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}