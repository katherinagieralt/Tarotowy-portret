#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// Tool schemas
const AnalyzeUISchema = z.object({
  framework: z.string().describe("Frontend framework (react, vue, angular, etc)"),
  currentIssues: z.array(z.string()).describe("List of current UI/UX issues"),
  targetAudience: z.string().optional().describe("Target user demographic"),
  designStyle: z.string().optional().describe("Desired design style (modern, minimal, corporate, etc)"),
});

const GenerateDesignTokensSchema = z.object({
  primaryColor: z.string().optional().describe("Primary brand color in hex format"),
  style: z.enum(["modern", "minimal", "corporate", "playful", "elegant"]).describe("Overall design style"),
  darkMode: z.boolean().optional().describe("Include dark mode tokens"),
});

const ImproveComponentSchema = z.object({
  componentCode: z.string().describe("Current component code"),
  framework: z.string().describe("Frontend framework being used"),
  improvements: z.array(z.string()).optional().describe("Specific improvements requested"),
  accessibility: z.boolean().optional().describe("Focus on accessibility improvements"),
});

const CreateComponentSchema = z.object({
  componentType: z.string().describe("Type of component (button, card, navbar, etc)"),
  framework: z.string().describe("Frontend framework to use"),
  variant: z.string().optional().describe("Component variant (primary, secondary, etc)"),
  responsive: z.boolean().optional().default(true).describe("Make component responsive"),
  props: z.record(z.any()).optional().describe("Component props/options"),
});

// Server setup
const server = new Server(
  {
    name: "ui-expert-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "analyze_ui",
        description: "Analyze current UI/UX and provide improvement recommendations",
        inputSchema: {
          type: "object",
          properties: {
            framework: { type: "string", description: "Frontend framework" },
            currentIssues: { 
              type: "array", 
              items: { type: "string" },
              description: "List of current UI/UX issues" 
            },
            targetAudience: { type: "string", description: "Target user demographic" },
            designStyle: { type: "string", description: "Desired design style" },
          },
          required: ["framework", "currentIssues"],
        },
      },
      {
        name: "generate_design_tokens",
        description: "Generate a comprehensive design token system",
        inputSchema: {
          type: "object",
          properties: {
            primaryColor: { type: "string", description: "Primary brand color" },
            style: { 
              type: "string", 
              enum: ["modern", "minimal", "corporate", "playful", "elegant"],
              description: "Overall design style" 
            },
            darkMode: { type: "boolean", description: "Include dark mode tokens" },
          },
          required: ["style"],
        },
      },
      {
        name: "improve_component",
        description: "Improve existing UI component with best practices",
        inputSchema: {
          type: "object",
          properties: {
            componentCode: { type: "string", description: "Current component code" },
            framework: { type: "string", description: "Frontend framework" },
            improvements: { 
              type: "array", 
              items: { type: "string" },
              description: "Specific improvements requested" 
            },
            accessibility: { type: "boolean", description: "Focus on accessibility" },
          },
          required: ["componentCode", "framework"],
        },
      },
      {
        name: "create_component", 
        description: "Create a new UI component with modern best practices",
        inputSchema: {
          type: "object",
          properties: {
            componentType: { type: "string", description: "Type of component" },
            framework: { type: "string", description: "Frontend framework" },
            variant: { type: "string", description: "Component variant" },
            responsive: { type: "boolean", description: "Make responsive" },
            props: { type: "object", description: "Component props" },
          },
          required: ["componentType", "framework"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    switch (name) {
      case "analyze_ui": {
        const parsed = AnalyzeUISchema.parse(args);
        return {
          content: [
            {
              type: "text",
              text: generateUIAnalysis(parsed),
            },
          ],
        };
      }

      case "generate_design_tokens": {
        const parsed = GenerateDesignTokensSchema.parse(args);
        return {
          content: [
            {
              type: "text", 
              text: generateDesignTokens(parsed),
            },
          ],
        };
      }

      case "improve_component": {
        const parsed = ImproveComponentSchema.parse(args);
        return {
          content: [
            {
              type: "text",
              text: improveComponent(parsed),
            },
          ],
        };
      }

      case "create_component": {
        const parsed = CreateComponentSchema.parse(args);
        return {
          content: [
            {
              type: "text",
              text: createComponent(parsed),
            },
          ],
        };
      }

      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${name}`
        );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid parameters: ${error.errors.map(e => `${e.path}: ${e.message}`).join(", ")}`
      );
    }
    throw error;
  }
});

// Helper functions
function generateUIAnalysis(params: z.infer<typeof AnalyzeUISchema>): string {
  const { framework, currentIssues, targetAudience, designStyle } = params;
  
  return `# UI/UX Analysis Report

## Current Framework: ${framework}

## Identified Issues:
${currentIssues.map(issue => `- ${issue}`).join('\n')}

## Recommendations:

### 1. Design System Implementation
- Create a comprehensive design token system
- Implement consistent spacing, typography, and color scales
- Use CSS custom properties for easy theming

### 2. Component Architecture
- Refactor into smaller, reusable components
- Implement proper component composition patterns
- Add loading and error states

### 3. Accessibility Improvements
- Ensure WCAG 2.1 AA compliance
- Add proper ARIA labels and roles
- Implement keyboard navigation
- Ensure sufficient color contrast

### 4. Performance Optimization
- Implement lazy loading for heavy components
- Use React.memo() or equivalent for expensive renders
- Optimize bundle size with code splitting

### 5. Responsive Design
- Mobile-first approach
- Use modern CSS Grid and Flexbox
- Implement fluid typography and spacing

${targetAudience ? `\n### Target Audience Considerations:\n- ${targetAudience}` : ''}
${designStyle ? `\n### Design Style Direction:\n- ${designStyle}` : ''}`;
}

function generateDesignTokens(params: z.infer<typeof GenerateDesignTokensSchema>): string {
  const { primaryColor = '#3b82f6', style, darkMode } = params;
  
  const tokens = {
    modern: {
      borderRadius: { sm: '0.375rem', md: '0.5rem', lg: '0.75rem', xl: '1rem' },
      shadow: { sm: '0 1px 2px rgba(0,0,0,0.05)', md: '0 4px 6px rgba(0,0,0,0.07)', lg: '0 10px 15px rgba(0,0,0,0.1)' },
    },
    minimal: {
      borderRadius: { sm: '0', md: '0', lg: '0', xl: '0' },
      shadow: { sm: 'none', md: '0 1px 0 rgba(0,0,0,0.1)', lg: '0 1px 0 rgba(0,0,0,0.1)' },
    },
    corporate: {
      borderRadius: { sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.625rem' },
      shadow: { sm: '0 1px 3px rgba(0,0,0,0.12)', md: '0 4px 6px rgba(0,0,0,0.15)', lg: '0 10px 20px rgba(0,0,0,0.15)' },
    },
    playful: {
      borderRadius: { sm: '0.75rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
      shadow: { sm: '0 4px 6px rgba(0,0,0,0.1)', md: '0 8px 12px rgba(0,0,0,0.15)', lg: '0 16px 24px rgba(0,0,0,0.2)' },
    },
    elegant: {
      borderRadius: { sm: '0.125rem', md: '0.25rem', lg: '0.375rem', xl: '0.5rem' },
      shadow: { sm: '0 2px 4px rgba(0,0,0,0.06)', md: '0 4px 8px rgba(0,0,0,0.08)', lg: '0 8px 16px rgba(0,0,0,0.1)' },
    },
  };

  const selectedTokens = tokens[style];

  return `export const designTokens = {
  colors: {
    primary: {
      50: '${lightenColor(primaryColor, 0.95)}',
      100: '${lightenColor(primaryColor, 0.9)}',
      200: '${lightenColor(primaryColor, 0.8)}',
      300: '${lightenColor(primaryColor, 0.6)}',
      400: '${lightenColor(primaryColor, 0.3)}',
      500: '${primaryColor}',
      600: '${darkenColor(primaryColor, 0.1)}',
      700: '${darkenColor(primaryColor, 0.2)}',
      800: '${darkenColor(primaryColor, 0.3)}',
      900: '${darkenColor(primaryColor, 0.4)}',
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    success: {
      50: '#ecfdf5',
      500: '#10b981',
      600: '#059669',
    },
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706',
    },
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
    },
  },
  
  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      mono: 'ui-monospace, "Cascadia Mono", "Roboto Mono", monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },
  
  borderRadius: ${JSON.stringify(selectedTokens.borderRadius, null, 2).replace(/"/g, "'")},
  
  boxShadow: ${JSON.stringify(selectedTokens.shadow, null, 2).replace(/"/g, "'")},
  
  transitions: {
    fast: '150ms ease-in-out',
    base: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
${darkMode ? `
  
  dark: {
    colors: {
      background: '#0f172a',
      surface: '#1e293b',
      surfaceHover: '#334155',
      text: '#f1f5f9',
      textMuted: '#94a3b8',
      border: '#334155',
    },
  },` : ''}
};

// CSS custom properties
export const cssVariables = \`
:root {
  /* Colors */
  --color-primary: \${designTokens.colors.primary[500]};
  --color-primary-hover: \${designTokens.colors.primary[600]};
  
  /* Typography */
  --font-sans: \${designTokens.typography.fontFamily.sans};
  --font-mono: \${designTokens.typography.fontFamily.mono};
  
  /* Spacing */
  --space-1: \${designTokens.spacing[1]};
  --space-2: \${designTokens.spacing[2]};
  --space-3: \${designTokens.spacing[3]};
  --space-4: \${designTokens.spacing[4]};
  
  /* Shadows */
  --shadow-sm: \${designTokens.boxShadow.sm};
  --shadow-md: \${designTokens.boxShadow.md};
  --shadow-lg: \${designTokens.boxShadow.lg};
  
  /* Transitions */
  --transition-fast: \${designTokens.transitions.fast};
  --transition-base: \${designTokens.transitions.base};
}\`;`;
}

function improveComponent(params: z.infer<typeof ImproveComponentSchema>): string {
  const { componentCode, framework, improvements = [], accessibility } = params;
  
  // This is a simplified example - in a real implementation, 
  // you'd parse and analyze the component code
  return `# Component Improvement Suggestions

## Original Component:
\`\`\`${framework}
${componentCode}
\`\`\`

## Improvements:

### 1. Performance Optimizations
- Add React.memo() wrapper to prevent unnecessary re-renders
- Use useCallback for event handlers
- Implement lazy loading for heavy dependencies

### 2. Accessibility Enhancements
${accessibility ? `- Add proper ARIA labels and roles
- Ensure keyboard navigation support
- Implement focus management
- Add screen reader announcements` : '- Consider adding ARIA labels for better accessibility'}

### 3. Code Quality
- Extract magic numbers into constants
- Add proper TypeScript types
- Implement error boundaries
- Add loading and error states

### 4. Styling Improvements
- Use CSS modules or styled-components for scoped styles
- Implement responsive design with mobile-first approach
- Add hover and focus states
- Use CSS custom properties for theming

### 5. Best Practices
- Add prop validation
- Implement proper component composition
- Use semantic HTML elements
- Add unit tests

${improvements.length > 0 ? `\n### Requested Improvements:\n${improvements.map(imp => `- ${imp}`).join('\n')}` : ''}`;
}

function createComponent(params: z.infer<typeof CreateComponentSchema>): string {
  const { componentType, framework, variant = 'primary', responsive = true, props = {} } = params;
  
  // Generate component based on framework
  if (framework.toLowerCase() === 'react') {
    return generateReactComponent(componentType, variant, responsive, props);
  } else if (framework.toLowerCase() === 'vue') {
    return generateVueComponent(componentType, variant, responsive, props);
  } else {
    return `# ${componentType} Component

Framework: ${framework}
Variant: ${variant}
Responsive: ${responsive}

## Implementation Guide:

1. Create component structure
2. Add styling with design tokens
3. Implement interactivity
4. Add accessibility features
5. Test across devices

Note: Specific implementation depends on ${framework} best practices.`;
  }
}

function generateReactComponent(type: string, variant: string, responsive: boolean, props: any): string {
  const componentName = type.charAt(0).toUpperCase() + type.slice(1);
  
  return `import React from 'react';
import { cn } from '@/lib/utils';

interface ${componentName}Props {
  children?: React.ReactNode;
  className?: string;
  variant?: '${variant}' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

export const ${componentName}: React.FC<${componentName}Props> = ({
  children,
  className,
  variant = '${variant}',
  size = 'md',
  disabled = false,
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    ${variant}: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:ring-neutral-500',
    outline: 'border border-neutral-300 bg-transparent hover:bg-neutral-50 focus-visible:ring-neutral-500',
  };
  
  const sizes = {
    sm: 'h-9 px-3 text-sm rounded-md',
    md: 'h-10 px-4 text-base rounded-lg',
    lg: 'h-12 px-6 text-lg rounded-lg',
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        ${responsive ? "'responsive-padding'" : ''},
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Usage example:
// <${componentName} variant="${variant}" size="md" onClick={() => console.log('Clicked!')}>
//   Click me
// </${componentName}>`;
}

function generateVueComponent(type: string, variant: string, responsive: boolean, props: any): string {
  return `<template>
  <button
    :class="[baseClasses, variantClasses, sizeClasses, { 'responsive-padding': ${responsive} }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: '${variant}' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: '${variant}',
  size: 'md',
  disabled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const baseClasses = 'inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const variantClasses = computed(() => ({
  '${variant}': 'bg-primary-600 text-white hover:bg-primary-700',
  'secondary': 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
  'outline': 'border border-neutral-300 bg-transparent hover:bg-neutral-50',
}[props.variant]));

const sizeClasses = computed(() => ({
  'sm': 'h-9 px-3 text-sm rounded-md',
  'md': 'h-10 px-4 text-base rounded-lg',
  'lg': 'h-12 px-6 text-lg rounded-lg',
}[props.size]));

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style scoped>
.responsive-padding {
  @media (max-width: 640px) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}
</style>`;
}

// Helper color functions
function lightenColor(color: string, amount: number): string {
  // Simple color lightening - in production use a proper color library
  return color + Math.round(amount * 100).toString(16);
}

function darkenColor(color: string, amount: number): string {
  // Simple color darkening - in production use a proper color library
  return color + Math.round((1 - amount) * 100).toString(16);
}

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("UI Expert MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});