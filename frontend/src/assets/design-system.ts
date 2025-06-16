/**
 * 🎨 SIMPLIFIED DESIGN SYSTEM
 * 4-Layer Architecture: Foundation → Components → Patterns → Content
 * 
 * SIMPLIFIED ARCHITECTURE:
 * 1. FOUNDATION - Tokens, typography, states, glass effects
 * 2. COMPONENTS - Pre-composed UI elements  
 * 3. PATTERNS - Layouts, utilities, common combinations
 * 4. CONTENT - Copy, assets, static content
 */

import { cn } from "@/utils/cn"

// ===== FOUNDATION =====
export const foundation = {
  // Spacing system
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px  
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },

  // Color system
  colors: {
    // App backgrounds
    bg: {
      primary: 'bg-gradient-to-b from-[#1a1a2e] via-[#1c1c3a] to-[#000000]',
      dark: 'bg-slate-900',
      glass: 'bg-white/5 backdrop-blur-md',
    },
    
    // Interactive colors
    blue: {
      400: '#60a5fa',
      500: '#3b82f6', 
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    
    // Text colors
    text: {
      primary: 'text-white',
      secondary: 'text-gray-300',
      muted: 'text-gray-400',
    },
    
    // Semantic colors
    semantic: {
      success: 'text-green-400',
      warning: 'text-yellow-400',
      error: 'text-red-400',
      info: 'text-blue-400',
    },
  },

  // Typography system (consolidated)
  typography: {
    h1: 'text-4xl font-bold tracking-tight text-white sm:text-5xl',
    h2: 'text-3xl font-bold tracking-tight text-white sm:text-4xl', 
    h3: 'text-2xl font-bold text-white sm:text-3xl',
    body: 'text-base text-gray-300 leading-relaxed',
    small: 'text-sm text-gray-400',
    label: 'block text-sm font-medium text-gray-300',
  },

  // Interactive states (consolidated)
  states: {
    hover: 'hover:bg-white/10 transition-colors duration-200',
    focus: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    disabled: 'disabled:opacity-50 disabled:pointer-events-none',
    loading: 'animate-pulse',
    visible: 'opacity-100',
    hidden: 'opacity-0',
    open: 'translate-x-0',
    closed: '-translate-x-full',
  },

  // Glass morphism effects
  glass: {
    light: 'bg-white/5 backdrop-blur-sm border-white/10',
    medium: 'bg-white/10 backdrop-blur-md border-white/20',
    strong: 'bg-white/20 backdrop-blur-lg border-white/30',
  }
}

// ===== COMPONENTS =====
export const components = {
  // Button system
  button: {
    base: 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none',
    variants: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white border border-transparent focus:ring-blue-500',
      ghost: 'bg-transparent hover:bg-white/10 text-white border border-white/20 hover:border-white/30 backdrop-blur-sm',
    },
    sizes: {
      sm: 'px-3 py-2 text-sm rounded-md',
      md: 'px-4 py-2.5 text-sm rounded-lg', 
      lg: 'px-6 py-3 text-base rounded-lg',
    },
    loading: {
      spinner: 'h-4 w-4 animate-spin rounded-full border-b-2 border-current',
    }
  },

  // Card system
  card: {
    base: 'rounded-2xl transition-all duration-200',
    variants: {
      glass: cn(foundation.glass.light, 'hover:bg-white/10 hover:border-white/20'),
      solid: 'bg-slate-800 border border-slate-700 hover:bg-slate-700',
    },
    padding: {
      sm: 'p-4',
      md: 'p-6', 
      lg: 'p-8',
    }
  },

  // Input system
  input: {
    container: 'space-y-2',
    base: 'w-full transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400',
    
    variants: {
      default: cn(foundation.glass.light, 'text-white hover:border-white/30 focus:bg-white/10'),
      error: 'bg-white/5 border border-red-500 text-white focus:ring-red-500',
    },
    
    sizes: {
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    },
  },

  // Label system
  label: {
    base: 'block text-sm font-medium text-gray-300',
    form: 'block text-sm font-medium text-gray-300 text-left',
    required: 'ml-1 text-red-400',
  },

  // Checkbox system
  checkbox: {
    container: 'flex items-center text-sm text-white',
    input: 'h-4 w-4 rounded border-white/20 bg-white/5 text-blue-500 transition-colors duration-200',
    label: 'cursor-pointer font-medium',
  },

  // Divider system
  divider: {
    base: 'flex-1 border-t border-white/10',
    withText: 'relative flex items-center justify-center',
    textSpan: 'px-2 text-sm text-gray-400',
  },

  // UNUSED NEW FORM STRUCTURE - COMMENTED OUT ❌
  // form: {
  //   // Container and layout
  //   container: 'space-y-6',
  //   field: 'space-y-2',
    
  //   // Complete input styles
  //   input: cn(foundation.glass.light, 'w-full transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-white hover:border-white/30 focus:bg-white/10 px-4 py-3 text-base'),
    
  //   // Input variants
  //   inputError: 'w-full transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 bg-white/5 border border-red-500 text-white focus:ring-red-500 placeholder:text-gray-400 px-4 py-3 text-base',
    
  //   // Labels
  //   label: 'block text-sm font-medium text-gray-300 text-left',
  //   required: 'ml-1 text-red-400',
    
  //   // Checkbox
  //   checkbox: 'h-4 w-4 rounded border-white/20 bg-white/5 text-blue-500 transition-colors duration-200',
  //   checkboxContainer: 'flex items-center text-sm text-white',
  //   checkboxLabel: 'cursor-pointer font-medium',
    
  //   // Auth-specific complete styles
  //   auth: {
  //     card: 'mx-auto max-w-md p-8',
  //     header: 'mb-6 text-center',
  //     controls: 'flex items-center justify-between',
  //     footer: 'text-center',
  //     link: 'text-sm text-blue-400 hover:text-blue-300 transition-colors',
  //     fullWidth: 'w-full',
  //     icon: 'h-20 w-20 rounded-full border-2 border-white/20 shadow-lg',
  //   }
     // },

    // UNUSED NAV SYSTEM - COMMENTED OUT ❌
  // nav: {
  //   // Sidebar - complete styles
  //   sidebar: 'fixed left-0 top-0 z-50 h-full w-16 transition-transform duration-300 border-r border-white/10 bg-white/5 backdrop-blur-md',
  //   sidebarSolid: 'fixed left-0 top-0 z-50 h-full w-16 transition-transform duration-300 border-r border-white/10 bg-slate-800/90 border-slate-700',
    
  //   // Navigation container
  //   container: 'flex flex-col items-center space-y-4 py-6',
    
  //   // Nav buttons - complete styles
  //   button: 'group relative rounded-lg p-3 transition-colors text-gray-400 hover:bg-white/10 hover:text-white',
  //   buttonActive: 'group relative rounded-lg p-3 transition-colors bg-blue-600 text-white',
    
  //   // Tooltip
  //   tooltip: 'pointer-events-none fixed left-20 z-[9999] whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100',
    
  //   // Icon
  //   icon: 'h-6 w-6',
  // },
}

// ===== UTILS SYSTEM
export const utils = {
  // Sidebar spacing
  sidebarSpacing: (hasSidebar: boolean) => ({
    main: hasSidebar ? 'ml-16' : '',
    content: hasSidebar ? 'pl-16' : '',
  }),
}

// ===== FORMS SYSTEM
export const forms = {
  container: 'space-y-6',
  field: 'space-y-2',
  
  // Auth-specific styles
  auth: {
    card: 'mx-auto max-w-md p-8',
    header: 'mb-6 text-center',
    controls: 'flex items-center justify-between',
    footer: 'text-center',
    link: 'text-sm text-blue-400 hover:text-blue-300 transition-colors',
    fullWidth: 'w-full',
    icon: 'h-20 w-20 rounded-full border-2 border-white/20 shadow-lg',
    error: 'text-sm text-red-400',
  }
}

// ===== LAYOUTS SYSTEM
export const layouts = {
  // Hero section
  hero: {
    section: 'relative px-6 py-32 text-center',
    container: 'mx-auto max-w-screen-xl px-8',
    title: 'mb-6',
    subtitle: 'mb-4 text-xl',
    description: 'mb-8 text-lg',
    buttons: 'gap-4 sm:flex-row',
  },

  // Header section
  header: {
    base: 'relative z-10 border-b border-white/10 px-6 py-4',
    container: 'mx-auto flex max-w-6xl items-center justify-between',
    title: 'text-xl font-bold text-white',
  },

  // Footer section
  footer: {
    base: 'relative z-10 border-t border-white/10 px-6 py-8 text-center mt-auto',
    container: 'mx-auto max-w-6xl space-y-4',
    copyright: 'text-gray-400',
    developers: {
      container: 'space-y-3',
      row: 'flex items-center justify-center space-x-4',
      label: 'text-sm text-gray-500',
      link: 'text-gray-400 transition-colors hover:text-white',
    },
    tech: 'text-sm text-gray-500',
  },

  // Page structure
  page: {
    base: 'relative min-h-screen flex flex-col',
    main: 'relative z-10 flex-1 pb-16',
    sidebarWrapper: 'flex min-h-screen',
    loadingContainer: cn(
      'relative flex flex-1 items-center justify-center',
      'm-4 md:m-6 lg:m-8 xl:m-12',
      'min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)]',
      'lg:min-h-[calc(100vh-4rem)] xl:min-h-[calc(100vh-6rem)]',
      'overflow-hidden rounded-3xl border border-white/10',
      foundation.colors.bg.primary,
      'text-white'
    ),
    contentWrapper: cn(
      'relative z-10 flex w-full flex-col',
      'items-center justify-center',
      'p-4 md:p-6 lg:p-8'
    ),
  },

  // Pong background
  pong: {
    container: 'absolute inset-0 z-0',
  },

  // Sidebar
  sidebar: {
    base: 'fixed left-0 top-0 z-50 h-full w-16 transition-transform duration-300 border-r border-white/10',
    variants: {
      glass: 'backdrop-blur-md border-white/10',
      solid: 'bg-slate-800/90 border-slate-700',
    },
    nav: {
      container: 'flex flex-col items-center space-y-4 py-6',
      button: {
        base: 'group relative rounded-lg p-3 transition-colors',
        active: 'bg-blue-600 text-white',
        inactive: 'text-gray-400 hover:bg-white/10 hover:text-white',
      },
      icon: 'h-6 w-6',
      tooltip: 'pointer-events-none fixed left-20 z-[9999] whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100',
    },
  },

  // Grid layouts
  grid: {
    header: 'flex justify-between items-center mb-8',
    twoColumn: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    twoColumnWithMargin: 'grid grid-cols-1 md:grid-cols-2 gap-6 mt-6',
  },

  // UNUSED PATTERNS - COMMENTED OUT ❌
  // flex: {
  //   center: 'flex items-center justify-center',
  //   centerCol: 'flex flex-col items-center justify-center',
  //   between: 'flex items-center justify-between',
  //   stack: 'flex flex-col space-y-4',
  // },

  // container: {
  //   narrow: 'mx-auto max-w-md px-4',
  //   centered: 'mx-auto max-w-2xl px-6',
  //   wide: 'mx-auto max-w-6xl px-6',
  //   full: 'w-full',
  // },

  // // Section patterns - complete page sections
  // section: {
  //   // Header - complete layout
  //   header: 'relative z-10 border-b border-white/10 px-6 py-4',
  //   headerContainer: 'mx-auto flex max-w-6xl items-center justify-between',
  //   headerTitle: 'text-xl font-bold text-white',
    
  //   // Footer - complete layout
  //   footer: 'relative z-10 border-t border-white/10 px-6 py-8 text-center mt-auto',
  //   footerContainer: 'mx-auto max-w-6xl space-y-4',
  //   footerCopyright: 'text-gray-400',
    
  //   // Hero - complete hero section
  //   hero: 'relative px-6 py-32 text-center',
  //   heroContainer: 'mx-auto max-w-screen-xl px-8',
  //   heroTitle: 'mb-6',
  //   heroSubtitle: 'mb-4 text-xl',
  //   heroDescription: 'mb-8 text-lg',
  //   heroButtons: 'gap-4 sm:flex-row',
  // },

  // // Positioning utilities
  // position: {
  //   overlay: 'absolute inset-0',
  //   center: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  //   fixed: 'fixed inset-0',
  // },

  // // Responsive utilities
  // responsive: {
  //   hideOnMobile: 'hidden md:block',
  //   showOnMobile: 'block md:hidden',
  //   mobileStack: 'flex flex-col md:flex-row',
  // },

  // // Utility functions
  // utils: {
  //   sidebarOffset: (hasSidebar: boolean) => hasSidebar ? 'ml-16' : '',
  //   when: (condition: boolean, styles: string, fallback = '') => condition ? styles : fallback,
  //   loading: 'animate-pulse',
  // },

  // // Special page wrappers
  // special: {
  //   loadingContainer: cn(
  //     'relative flex flex-1 items-center justify-center',
  //     'm-4 md:m-6 lg:m-8 xl:m-12',
  //     'min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)]',
  //     'lg:min-h-[calc(100vh-4rem)] xl:min-h-[calc(100vh-6rem)]',
  //     'overflow-hidden rounded-3xl border border-white/10',
  //     foundation.colors.bg.primary,
  //     'text-white'
  //   ),

  //   contentWrapper: cn(
  //     'relative z-10 flex w-full flex-col',
  //     'items-center justify-center',
  //     'p-4 md:p-6 lg:p-8'
  //   ),
    
  //   sidebarWrapper: 'flex min-h-screen',
  //   main: 'relative z-10 flex-1 pb-16',
  // }
}


// ===== CONTENT
export const content = {
  // Landing page content
  landing: {
    welcome: {
      title: 'Ping. Pong. Play!',
      subtitle: 'Level Up Your Ping Pong Skills',
      description: 'Smash, spin, and dominate the table. Prove you are the ultimate paddle master.',
    }
  },

  // UNUSED CONTENT - COMMENTED OUT ❌
  // // App branding
  // app: {
  //   name: 'Ping Pong Pro',
  //   tagline: 'Level Up Your Game',
  // },
  
  // // Page content
  // pages: {
  //   landing: {
  //     hero: {
  //       title: 'Ping. Pong. Play!',
  //       subtitle: 'Level Up Your Ping Pong Skills',
  //       description: 'Smash, spin, and dominate the table. Prove you are the ultimate paddle master.',
  //     }
  //   },
  //   auth: {
  //     signIn: { 
  //       title: 'Welcome back', 
  //       subtitle: 'Sign in to continue playing' 
  //     },
  //     signUp: { 
  //       title: 'Join the game', 
  //       subtitle: 'Create your account to start playing' 
  //     }
  //   }
  // },

  // // System messages
  // messages: {
  //   loading: 'Loading your game...',
  //   error: 'Something went wrong. Please try again.',
  //   success: 'Action completed successfully!',
  //   networkError: 'Check your connection and try again.',
  // }
}
 