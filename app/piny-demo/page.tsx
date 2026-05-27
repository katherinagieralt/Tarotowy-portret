'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/Card';
import { useState } from 'react';

/**
 * Example page demonstrating Piny-compatible components
 * 
 * This page showcases:
 * - forwardRef components with displayName
 * - Clean Tailwind class structure Piny can track
 * - Responsive design
 * - State management
 * 
 * To edit this with Piny:
 * 1. Right-click anywhere in this file
 * 2. Select "Edit in Piny"
 * 3. Click elements to select them
 * 4. Use the Visual Controls to adjust Tailwind classes
 */

export default function PinyDemoPage() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleIncrement = () => setCount(count + 1);
  const handleSimulateLoad = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Piny Integration Demo
          </h1>
          <p className="text-lg text-gray-600">
            Demonstrating Piny-compatible React components
          </p>
        </section>

        {/* Button Variants Section */}
        <section className="mb-8">
          <Card variant="elevated">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-900">
                Button Variants
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                All buttons are fully editable with Piny
              </p>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Primary Button */}
                <div className="flex flex-col items-center gap-2">
                  <Button variant="primary">Primary</Button>
                  <span className="text-xs text-gray-500">variant="primary"</span>
                </div>

                {/* Secondary Button */}
                <div className="flex flex-col items-center gap-2">
                  <Button variant="secondary">Secondary</Button>
                  <span className="text-xs text-gray-500">
                    variant="secondary"
                  </span>
                </div>

                {/* Danger Button */}
                <div className="flex flex-col items-center gap-2">
                  <Button variant="danger">Danger</Button>
                  <span className="text-xs text-gray-500">variant="danger"</span>
                </div>

                {/* Ghost Button */}
                <div className="flex flex-col items-center gap-2">
                  <Button variant="ghost">Ghost</Button>
                  <span className="text-xs text-gray-500">variant="ghost"</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Button Sizes Section */}
        <section className="mb-8">
          <Card variant="outlined">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-900">
                Button Sizes
              </h2>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Interactive Demo Section */}
        <section className="mb-8">
          <Card variant="ghost">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-900">
                Interactive Demo
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Click buttons to interact with state
              </p>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <p className="text-gray-700">
                    Current count: <span className="font-bold text-lg">{count}</span>
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleIncrement}
                  >
                    Increment
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setCount(0)}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                variant="primary"
                isLoading={isLoading}
                onClick={handleSimulateLoad}
                className="w-full md:w-auto"
              >
                {isLoading ? 'Loading...' : 'Simulate API Call'}
              </Button>
            </CardFooter>
          </Card>
        </section>

        {/* Feature Highlights */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Why These Components Work Well with Piny
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'forwardRef + displayName',
                description:
                  'Components expose refs and have display names for Piny recognition',
              },
              {
                title: 'Pure Tailwind Classes',
                description:
                  'No CSS-in-JS or complex styled-components. Piny can parse all styles.',
              },
              {
                title: 'Clean Prop Structure',
                description:
                  'Variant and size props make components flexible and Piny-trackable',
              },
              {
                title: 'Client-side Rendering',
                description:
                  'All components use "use client" for interactive editing in Piny',
              },
              {
                title: 'Responsive by Default',
                description:
                  'Tailwind responsive classes work seamlessly with Piny visual controls',
              },
              {
                title: 'Composable Structure',
                description:
                  'Card components (Header, Content, Footer) are easy to rearrange visually',
              },
            ].map((feature, index) => (
              <Card key={index} variant="outlined">
                <CardContent>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <Card variant="elevated">
            <CardContent>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Ready to Edit with Piny?
              </h2>
              <p className="text-gray-600 mb-6">
                Right-click on any file in this project and select "Edit in Piny" to start
                visually editing these components.
              </p>
              <Button variant="primary" size="lg">
                Open in Piny (Right-click → Edit in Piny)
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
