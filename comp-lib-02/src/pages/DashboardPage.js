// DashboardPage.jsx - Clean and simple implementation

import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from '../components/Accordion';
import Banner from '../components/Banner';

const DashboardPage = () => {
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
        label: `${component.name} ${component.status === 'ready' ? '✅' : component.status === 'coming-soon' ? '⏳' : '📋'}`,
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
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Component Library
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    A collection of reusable, accessible, and beautifully designed React components.
                </p>
                
                {/* Welcome Banner */}
                <Banner 
                    title="Welcome to the Component Library"
                    variant="blue"
                    instructions={[
                        "Browse our collection of React components",
                        "Each component includes live demos and code examples",
                        "All components are mobile-responsive and accessible"
                    ]}
                />
            </div>

            {/* Components Accordion */}
            <div className="bg-white rounded-lg   p-4 sm:p-6 mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    Available Components
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Click on any component to see details and access the demo.
                </p>
                <Accordion items={accordionItems} />
            </div>

            {/* Footer Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="text-center text-gray-500">
                    <p className="text-sm">
                        Built with React, Tailwind CSS, and Framer Motion
                    </p>
                    <p className="text-xs mt-1">
                        Inspired by Material Design principles
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
