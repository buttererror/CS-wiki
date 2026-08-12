import { withPwa } from '@vite-pwa/vitepress'
import { defineConfig } from 'vitepress'

export default withPwa(defineConfig({
    title: 'CS Wiki',
    description: "A practical, evolving knowledge base for computer science and software development.",
    base: '/',
    cleanUrls: true,
    head: [
        ['link', { rel: 'icon', href: '/pwa-icon.svg', type: 'image/svg+xml' }],
    ],
    vite: {
        publicDir: '.vitepress/public',
    },
    srcExclude: ['docs/**', 'README.md', 'AGENTS.md'],
    rewrites: (id) => {
        if (id.endsWith('/README.md')) {
            return id.replace(/README\.md$/, 'index.md')
        }

        return id
    },

    ignoreDeadLinks: [
    ],

    themeConfig: {
        siteTitle: "CS Wiki",
        search: {
            provider: 'local',
            options: {
                detailedView: true,
                miniSearch: {
                    searchOptions: {
                        combineWith: 'AND',
                        fuzzy: 0.1,
                        prefix: true,
                    },
                },
            },
        },
        outline: [2, 3],

        nav: [
            {
                text: 'Foundations',
                link: '/computer-science-foundations/',
            },
            {
                text: 'System Design',
                link: '/system-design/',
            },
            {
                text: 'Security',
                link: '/security/',
            },
            {
                text: 'Practices',
                link: '/software-development-practices/',
            },
            {
                text: 'Frontend',
                link: '/frontend-development/',
            },
            {
                text: 'Tooling',
                link: '/framework-tooling/',
            },
        ],
        sidebar: {
            '/computer-science-foundations/': [
                {
                    text: 'Computer Science Foundations',
                    link: '/computer-science-foundations/',
                    items: [
                        {
                            text: 'Computer Systems',
                            link: '/computer-science-foundations/computer-systems/',
                        },
                        {
                            text: 'Programming Languages',
                            link: '/computer-science-foundations/programming-languages/',
                            items: [
                                {
                                    text: 'Type Systems',
                                    link: '/computer-science-foundations/programming-languages/type-systems',
                                },
                                {
                                    text: 'JavaScript',
                                    link: '/computer-science-foundations/programming-languages/javascript/',
                                    items: [
                                        {
                                            text: 'Set, Map, and Object',
                                            link: '/computer-science-foundations/programming-languages/javascript/set-map-and-object',
                                        },
                                        {
                                            text: 'Functions, Closures, and Identity',
                                            link: '/computer-science-foundations/programming-languages/javascript/functions-closures-and-identity',
                                        },
                                        {
                                            text: 'Hoisting and Binding Initialization',
                                            link: '/computer-science-foundations/programming-languages/javascript/hoisting',
                                        },
                                    ],
                                },
                                {
                                    text: 'TypeScript',
                                    link: '/computer-science-foundations/programming-languages/typescript/',
                                    items: [
                                        {
                                            text: 'Type-System Foundations',
                                            link: '/computer-science-foundations/programming-languages/typescript/type-system',
                                        },
                                        {
                                            text: 'Toolchain and Type Checking',
                                            link: '/computer-science-foundations/programming-languages/typescript/toolchain',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            text: 'Software Engineering',
                            link: '/computer-science-foundations/software-engineering/',
                            collapsed: false,
                            items: [
                                {
                                    text: 'Software Taxonomy',
                                    link: '/computer-science-foundations/software-engineering/software-taxonomy',
                                },
                                {
                                    text: 'Software Architecture',
                                    link: '/computer-science-foundations/software-engineering/software-architecture',
                                },
                                {
                                    text: 'Programming Paradigms',
                                    link: '/computer-science-foundations/software-engineering/programming-paradigms/',
                                    items: [
                                        {
                                            text: 'Programming Paradigm',
                                            link: '/computer-science-foundations/software-engineering/programming-paradigms/programming-paradigm',
                                        },
                                        {
                                            text: 'Reactive Programming',
                                            link: '/computer-science-foundations/software-engineering/programming-paradigms/reactive-programming',
                                        },
                                    ],
                                },
                                {
                                    text: 'Software Design Principles',
                                    link: '/computer-science-foundations/software-engineering/software-design-principles/',
                                    items: [
                                        {
                                            text: 'Inversion of Control',
                                            link: '/computer-science-foundations/software-engineering/software-design-principles/inversion-of-control',
                                        },
                                    ],
                                },
                                {
                                    text: 'Terminology',
                                    link: '/computer-science-foundations/software-engineering/terminology/',
                                    items: [
                                        {
                                            text: 'Cache Invalidation',
                                            link: '/computer-science-foundations/software-engineering/terminology/cache-invalidation',
                                        },
                                        {
                                            text: 'Caveat',
                                            link: '/computer-science-foundations/software-engineering/terminology/caveat',
                                        },
                                        {
                                            text: 'Client',
                                            link: '/computer-science-foundations/software-engineering/terminology/client',
                                        },
                                        {
                                            text: 'Mechanism',
                                            link: '/computer-science-foundations/software-engineering/terminology/mechanism',
                                        },
                                        {
                                            text: 'Pattern',
                                            link: '/computer-science-foundations/software-engineering/terminology/pattern',
                                        },
                                        {
                                            text: 'Route Map',
                                            link: '/computer-science-foundations/software-engineering/terminology/route-map',
                                        },
                                        {
                                            text: 'Style',
                                            link: '/computer-science-foundations/software-engineering/terminology/style',
                                        },
                                        {
                                            text: 'Narrowing',
                                            link: '/computer-science-foundations/software-engineering/terminology/narrowing',
                                        },
                                    ],
                                },
                                {
                                    text: 'Communication Patterns',
                                    link: '/computer-science-foundations/software-engineering/communication-patterns/',
                                    items: [
                                        {
                                            text: 'Publish/Subscribe',
                                            link: '/computer-science-foundations/software-engineering/communication-patterns/publish-subscribe',
                                        },
                                        {
                                            text: 'Request/Response',
                                            link: '/computer-science-foundations/software-engineering/communication-patterns/request-response',
                                        },
                                    ],
                                },
                                {
                                    text: 'Design Patterns',
                                    link: '/computer-science-foundations/software-engineering/design-patterns/',
                                    items: [
                                        {
                                            text: 'Gang of Four Design Patterns',
                                            link: '/computer-science-foundations/software-engineering/design-patterns/gang-of-four-design-patterns',
                                        },
                                        {
                                            text: 'Observer Pattern',
                                            link: '/computer-science-foundations/software-engineering/design-patterns/observer-pattern',
                                        },
                                        {
                                            text: 'Observer Pattern - Wikipedia Study',
                                            link: '/computer-science-foundations/software-engineering/design-patterns/observer-pattern-wikipedia',
                                        },
                                    ],
                                },
                                {
                                    text: 'Architectural Patterns',
                                    link: '/computer-science-foundations/software-engineering/architectural-patterns/',
                                },
                                {
                                    text: 'Architectural Styles',
                                    link: '/computer-science-foundations/software-engineering/architectural-styles/',
                                    items: [
                                        {
                                            text: 'Event-Driven Architecture',
                                            link: '/computer-science-foundations/software-engineering/architectural-styles/event-driven-architecture',
                                        },
                                        {
                                            text: 'Microservice Architecture',
                                            link: '/computer-science-foundations/software-engineering/architectural-styles/microservice-architecture',
                                        },
                                        {
                                            text: 'Modular Monolith',
                                            link: '/computer-science-foundations/software-engineering/architectural-styles/modular-monolith',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],

            '/system-design/': [
                {
                    text: 'System Design',
                    link: '/system-design/',
                    items: [
                        {
                            text: 'Software System Design',
                            link: '/system-design/software-system-design/',
                            items: [
                                {
                                    text: 'Domain-Driven Design',
                                    link: '/system-design/software-system-design/domain-driven-design',
                                },
                                {
                                    text: 'Neighboring Perspectives',
                                    link: '/system-design/software-system-design/neighboring-perspectives',
                                },
                            ],
                        },
                    ],
                },
            ],

            '/security/': [
                {
                    text: 'Security',
                    link: '/security/',
                    items: [
                        {
                            text: 'Identity and Access Management',
                            link: '/security/identity-and-access-management/',
                            items: [
                                {
                                    text: 'Authentication',
                                    link: '/security/identity-and-access-management/authentication',
                                },
                                {
                                    text: 'JSON Web Token',
                                    link: '/security/identity-and-access-management/json-web-token',
                                },
                            ],
                        },
                    ],
                },
            ],

            '/software-development-practices/': [
                {
                    text: 'Software Development Practices',
                    link: '/software-development-practices/',
                    items: [
                        {
                            text: 'Development Strategy',
                            link: '/software-development-practices/development-strategy',
                        },
                        {
                            text: 'Lean MVP and Vertical Slices',
                            link: '/software-development-practices/lean-mvp-vertical-slice-development',
                        },
                        {
                            text: 'Software Testing',
                            link: '/software-development-practices/testing/',
                            items: [
                                {
                                    text: 'Testing Infrastructure and Strategy',
                                    link: '/software-development-practices/testing/testing-infrastructure',
                                },
                            ],
                        },
                        {
                            text: 'Repository Organization',
                            link: '/software-development-practices/repository-organization/',
                            items: [
                                {
                                    text: 'Monorepo',
                                    link: '/software-development-practices/repository-organization/monorepo',
                                },
                            ],
                        },
                        {
                            text: 'Version Control',
                            link: '/software-development-practices/version-control/',
                            items: [
                                {
                                    text: 'Detached HEAD',
                                    link: '/software-development-practices/version-control/detached-head',
                                },
                            ],
                        },
                    ],
                },
            ],

            '/frontend-development/': [
                {
                    text: 'Frontend Development',
                    link: '/frontend-development/',
                    items: [
                        {
                            text: 'Browser Runtime',
                            link: '/frontend-development/browser-runtime/',
                            items: [
                                {
                                    text: 'Timers and Event Scheduling',
                                    link: '/frontend-development/browser-runtime/timers-and-event-scheduling',
                                },
                            ],
                        },
                        {
                            text: 'Offline Web Apps',
                            link: '/frontend-development/offline-web-apps/',
                        },
                        {
                            text: 'Rendering',
                            link: '/frontend-development/rendering/',
                            items: [
                                {
                                    text: 'Server and Client Rendering',
                                    link: '/frontend-development/rendering/server-and-client-rendering',
                                },
                                {
                                    text: 'SSR versus ISR',
                                    link: '/frontend-development/rendering/ssr-and-isr',
                                },
                                {
                                    text: 'Hydration',
                                    link: '/frontend-development/rendering/hydration',
                                },
                            ],
                        },
                        {
                            text: 'Routing and Interaction',
                            link: '/frontend-development/routing-and-interaction/',
                            items: [
                                {
                                    text: 'Post-Authentication Redirects',
                                    link: '/frontend-development/routing-and-interaction/post-authentication-redirects',
                                },
                            ],
                        },
                        {
                            text: 'Data Across Boundaries',
                            items: [
                                {
                                    text: 'Serialization',
                                    link: '/frontend-development/data-across-boundaries/serialization',
                                },
                            ],
                        },
                        {
                            text: 'State and Reactivity',
                            items: [
                                {
                                    text: 'Reactivity Mechanisms',
                                    link: '/frontend-development/state-and-reactivity/reactivity-mechanisms',
                                },
                            ],
                        },
                        {
                            text: 'Styling',
                            link: '/frontend-development/styling/',
                        },
                    ],
                },
            ],

            '/framework-tooling/': [
                {
                    text: 'Frameworks, Libraries, and Tooling',
                    link: '/framework-tooling/',
                    items: [
                        {
                            text: 'NestJS Dependency Injection',
                            link: '/framework-tooling/nestjs-dependency-injection',
                        },
                        {
                            text: 'TanStack Query',
                            link: '/framework-tooling/tanstack-query',
                        },
                        {
                            text: 'Frontend',
                            link: '/framework-tooling/frontend/',
                            items: [
                                {
                                    text: 'React',
                                    link: '/framework-tooling/frontend/react/',
                                    items: [
                                        {
                                            text: 'State and Updates',
                                            link: '/framework-tooling/frontend/react/state-and-updates',
                                        },
                                        {
                                            text: 'Rendering Model',
                                            link: '/framework-tooling/frontend/react/rendering-model',
                                        },
                                        {
                                            text: 'Context and External Stores',
                                            link: '/framework-tooling/frontend/react/context-and-external-stores',
                                        },
                                        {
                                            text: 'Effects and External Synchronization',
                                            link: '/framework-tooling/frontend/react/effects-and-external-synchronization',
                                        },
                                        {
                                            text: 'Forms',
                                            link: '/framework-tooling/frontend/react/forms',
                                        },
                                        {
                                            text: 'Function Identity and Closures',
                                            link: '/framework-tooling/frontend/react/function-identity-and-closures',
                                        },
                                        {
                                            text: 'Debouncing',
                                            link: '/framework-tooling/frontend/react/debouncing',
                                        },
                                        {
                                            text: 'Performance',
                                            link: '/framework-tooling/frontend/react/performance',
                                        },
                                        {
                                            text: 'Strict Mode',
                                            link: '/framework-tooling/frontend/react/strict-mode',
                                        },
                                        {
                                            text: 'Stale Response Races',
                                            link: '/framework-tooling/frontend/react/stale-response-races',
                                        },
                                    ],
                                },
                                {
                                    text: 'React Application Delivery',
                                    link: '/framework-tooling/frontend/react-application-delivery/',
                                    items: [
                                        {
                                            text: 'Next.js vs React with Vite',
                                            link: '/framework-tooling/frontend/react-application-delivery/nextjs-vs-react-with-vite',
                                        },
                                    ],
                                },
                                {
                                    text: 'Next.js',
                                    link: '/framework-tooling/frontend/nextjs/notes',
                                },
                                {
                                    text: 'Vue',
                                    link: '/framework-tooling/frontend/vue/notes',
                                },
                            ],
                        },
                        {
                            text: 'Cross-Platform UI',
                            link: '/framework-tooling/cross-platform-ui/',
                            items: [
                                {
                                    text: 'Flutter',
                                    link: '/framework-tooling/cross-platform-ui/flutter',
                                },
                            ],
                        },
                    ],
                },
            ],

            '/miscellaneous/': [
                {
                    text: 'Miscellaneous Notes',
                    link: '/miscellaneous/',
                    items: [
                        {
                            text: 'General Programming',
                            link: '/miscellaneous/CS',
                        },
                        {
                            text: 'Legacy JavaScript Notes',
                            link: '/miscellaneous/JavaScript-notes',
                        },
                        {
                            text: 'TypeScript Learning Notes',
                            link: '/miscellaneous/TypeScript',
                        },
                        {
                            text: 'General Notes',
                            link: '/miscellaneous/general',
                        },
                        {
                            text: 'Technical Fixes and Solutions',
                            link: '/miscellaneous/technical-fixes-and-solutions',
                        },
                        {
                            text: 'Git',
                            items: [
                                {
                                    text: 'Git Notes',
                                    link: '/miscellaneous/git-space',
                                },
                                {
                                    text: 'Git Commands',
                                    link: '/miscellaneous/git-commands',
                                },
                            ],
                        },
                        {
                            text: 'AI',
                            items: [
                                {
                                    text: 'LLMs vs. AI Agents',
                                    link: '/miscellaneous/ai/llm-vs-ai-agent',
                                },
                            ],
                        },
                        {
                            text: 'Backend',
                            items: [
                                {
                                    text: 'Databases',
                                    link: '/miscellaneous/backend/databases',
                                },
                            ],
                        },
                        {
                            text: 'Linux',
                            items: [
                                {
                                    text: 'Linux General',
                                    link: '/miscellaneous/linux/linux-general',
                                },
                                {
                                    text: 'Docker',
                                    link: '/miscellaneous/linux/docker',
                                },
                                {
                                    text: 'PostgreSQL',
                                    link: '/miscellaneous/linux/postgresql',
                                },
                            ],
                        },
                    ],
                },
            ],
        }
    },
    pwa: {
        registerType: 'prompt',
        manifest: {
            id: '/',
            name: 'CS Wiki',
            short_name: 'CS Wiki',
            description: 'A practical knowledge base for computer science and software development.',
            start_url: '/',
            scope: '/',
            display: 'standalone',
            theme_color: '#1b1b1f',
            background_color: '#1b1b1f',
            icons: [
                {
                    src: '/pwa-icon.svg',
                    sizes: 'any',
                    type: 'image/svg+xml',
                    purpose: 'any maskable',
                },
            ],
        },
        workbox: {
            cleanupOutdatedCaches: true,
            globPatterns: ['**/*.{css,html,ico,js,json,svg,webmanifest,woff2}'],
            maximumFileSizeToCacheInBytes: 12 * 1024 * 1024,
            navigateFallback: null,
        },
    },
}))
