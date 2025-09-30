// Card.jsx - Simplified with props instead of Context

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

// Helper function to get readable labels for Material Icons
const getTagLabel = (iconName) => {
    const labels = {
        'terrain': 'Mountain',
        'hiking': 'Hiking',
        'camera_alt': 'Photography',
        'waves': 'Ocean',
        'surfing': 'Surfing',
        'beach_access': 'Beach',
        'forest': 'Forest',
        'directions_walk': 'Walking',
        'nature': 'Nature',
        'landscape': 'Landscape',
        'wb_twilight': 'Sunset',
        'flare': 'Golden Hour',
        'nightlight': 'Night',
        'stars': 'Stars',
        'auto_awesome': 'Magical'
    };
    return labels[iconName] || iconName;
};

const Card = ({
    imgUrl = "",
    itemId = "",
    itemTitle = "",
    description = "",
    tags = [],
    isSelected = false,
    isAnyCardClosing = false,
    onCardClick,
    onClose,
    hasSelectedCard = false  // New prop to know if ANY card is selected
}) => {
    const handleClick = () => {
        onCardClick(itemId);
    };

    // Animation configuration - smooth without bounce
    const spring = {
        type: "tween",
        duration: 0.4,
        ease: "easeInOut"
    };

    // Reduced motion support (transition configured in spring constant)

    // Content animation variants for smooth closing
    const contentVariants = {
        open: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                opacity: { duration: 0.2 },
                scale: { duration: 0.3 },
                filter: { duration: 0.3 }
            }
        },
        closed: {
            opacity: 0,
            scale: 0.98,
            filter: "blur(6px)",
            transition: {
                opacity: { duration: 0.15 },
                scale: { duration: 0.2 },
                filter: { duration: 0.2 }
            }
        }
    };

    // Determine if this card should be shrunk (not hidden, just smaller)
    // Shrink when: closing animation OR when another card is selected
    const shouldShrink = (!isSelected && isAnyCardClosing) || (!isSelected && hasSelectedCard);

    return (
        <motion.div
            className={`card ${isSelected ? 'card--expanded' : ''} ${shouldShrink ? 'card--hidden' : ''}`}
            style={{
                backgroundImage: `url(${imgUrl})`
            }}
            onClick={handleClick}
            layout
            transition={spring}
        >
            {/* Card poster image with smooth opacity transition */}
            <motion.div
                className="card__poster"
                style={{ backgroundImage: `url(${imgUrl})` }}
                layout
                transition={spring}
                animate={{ opacity: isSelected ? 0.3 : 1 }}
            />

            {/* Card title overlay - Only visible when not selected */}
            <AnimatePresence>
                {!isSelected && (
                    <motion.div
                        className="card__title"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span className="material-icons card__title-icon">
                            {tags.length > 0 ? tags[0].split(' ')[0] : 'landscape'}
                        </span>
                        <span className="card__title-text">{itemTitle}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Expanded content overlay with staged closing animation */}
            <AnimatePresence mode="wait">
                {isSelected && (
                    <motion.div
                        className="card__content"
                        layout
                        variants={contentVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Content header */}
                        <div className="card__content-header">
                            <h2 className="card__content-title">{itemTitle}</h2>
                        </div>

                        {/* Content body */}
                        <div className="card__content-body">
                            <p className="card__content-description">
                                {description || `This is the expanded content area for item ID: ${itemId}.`}
                            </p>

                            {/* Meta information with Material Icons */}
                            {tags.length > 0 && (
                                <div className="card__content-meta">
                                    {tags.map((tag, index) => (
                                        <span key={index} className="card__content-tag">
                                            <span className="material-icons">{tag}</span>
                                            <span className="card__content-tag-text">{getTagLabel(tag)}</span>
                                       
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Content footer with close button */}
                        <div className="card__content-footer">
                            <button className="card__close-btn" onClick={onClose}>
                                <span className="material-icons">close</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Card;