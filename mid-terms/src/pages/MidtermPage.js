// MidtermPage.jsx - Clean and simple implementation

import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from '../components/Accordion';
import Banner from '../components/Banner';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
const image = '/hero.jpeg'; 


const MidtermPage = () => {
    const components = [
        {
            id: 'button',
            name: 'Button',
            description: 'Interactive buttons with multiple variants and states',
            route: '/components/button',
            category: 'Actions',
            status: 'ready'
        },
        {
            id: 'carousel',
            name: 'Carousel',
            description: 'Interactive carousel with expandable pill-shaped cards',
            route: '/components/carousel',
            category: 'Layout',
            status: 'ready'
        },
        {
            id: 'banner',
            name: 'Banner',
            description: 'Informational banners with multiple color variants',
            route: '/components/banner',
            category: 'Feedback',
            status: 'ready'
        },
        {
            id: 'accordion',
            name: 'Accordion',
            description: 'Collapsible content sections with smooth animations',
            route: '/components/accordion',
            category: 'Layout',
            status: 'ready'
        },
        {
            id: 'dropdown',
            name: 'Dropdown',
            description: 'Custom dropdown menus with click-outside handling',
            route: '/components/dropdown',
            category: 'Form',
            status: 'ready'
        }
    ];

    // Transform components data into accordion items
    const accordionItems = components.map(component => ({
        id: component.id,
        label: `${component.name}`,
        content: (
            <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">{component.description}</p>
                <div className="flex items-center justify-between">
                  
                </div>
                {component.status === 'ready' && (
                    <div className="pt-2">
                        <Link
                            to={component.route}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                            View Demo
                            <span className="material-icons ml-2 text-sm">arrow_forward</span>
                        </Link>
                    </div>
                )}
            </div>
        )
    }));

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 background">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                   Midterm Project
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                   Designing the layout of a webpage for my midterm project.
                </p>
                
                {/* Welcome Banner */}
                <Banner 
                    title="Welcome to the Midterm Project"
                    variant="blue"
                    instructions={[
                        "Design the layout of a webpage for my midterm project",
                        "The webpage should be mobile-responsive and accessible (try)",
                        "The webpage should be visually appealing and user-friendly"
                    ]}
                />
            </div>

           <Hero variant="full" image={image} />
           <Carousel />
           
        </div>
    );
};

export default MidtermPage;
