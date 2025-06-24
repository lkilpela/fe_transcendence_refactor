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

import { cn } from '@/utils/cn'

// ===== FOUNDATION =====
export const foundation = {
  // Spacing system
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
  },

  // Color system
  colors: {
    // App backgrounds
    bg: {
      primary:
        'bg-gradient-to-b from-[#1a1a2e] via-[#1c1c3a] to-[#000000] dark:bg-gradient-to-b dark:from-[#1a1a2e] dark:via-[#1c1c3a] dark:to-[#000000] bg-gradient-to-b from-gray-50 via-white to-gray-100',
      dark: 'bg-slate-900 dark:bg-slate-900 bg-gray-100',
      glass: 'bg-white/5 backdrop-blur-md dark:bg-white/5 bg-black/5',
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
      primary: 'text-white dark:text-white text-gray-900',
      secondary: 'text-gray-300 dark:text-gray-300 text-gray-600',
      muted: 'text-gray-400 dark:text-gray-400 text-gray-500',
    },

    // Semantic colors
    semantic: {
      success: 'text-green-400 dark:text-green-400 text-green-600',
      warning: 'text-yellow-400 dark:text-yellow-400 text-yellow-600',
      error: 'text-red-400 dark:text-red-400 text-red-600',
      info: 'text-blue-400 dark:text-blue-400 text-blue-600',
    },
  },

  // Typography system (consolidated)
  typography: {
    h1: 'text-4xl font-bold tracking-tight text-white dark:text-white text-gray-900 sm:text-5xl',
    h2: 'text-3xl font-bold tracking-tight text-white dark:text-white text-gray-900 sm:text-4xl',
    h3: 'text-2xl font-bold text-white dark:text-white text-gray-900 sm:text-3xl',
    body: 'text-base text-gray-300 dark:text-gray-300 text-gray-700 leading-relaxed',
    small: 'text-sm text-gray-400 dark:text-gray-400 text-gray-600',
    medium: 'text-base text-gray-300 dark:text-gray-300 text-gray-700',
    large: 'text-lg text-gray-300 dark:text-gray-300 text-gray-700',
    label:
      'block text-sm font-medium text-gray-300 dark:text-gray-300 text-gray-700',
  },

  // Interactive states (consolidated)
  states: {
    hover:
      'hover:bg-white/10 dark:hover:bg-white/10 hover:bg-black/5 transition-colors duration-200',
    focus:
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    disabled: 'disabled:opacity-50 disabled:pointer-events-none',
    loading: 'animate-pulse',
    visible: 'opacity-100',
    hidden: 'opacity-0',
    open: 'translate-x-0',
    closed: '-translate-x-full',
  },

  // Glass morphism effects
  glass: {
    light:
      'bg-white/5 backdrop-blur-sm border-white/10 dark:bg-white/5 dark:border-white/10 bg-black/5 border-black/10',
    medium:
      'bg-white/10 backdrop-blur-md border-white/20 dark:bg-white/10 dark:border-white/20 bg-black/10 border-black/20',
    strong:
      'bg-white/20 backdrop-blur-lg border-white/30 dark:bg-white/20 dark:border-white/30 bg-black/20 border-black/30',
  },
}

// ===== COMPONENTS =====
export const components = {
  // Button system
  button: {
    base: 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none',
    variants: {
      primary:
        'bg-blue-600 hover:bg-blue-700 text-white border border-transparent focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white',
      ghost:
        'bg-transparent hover:bg-white/10 text-white border border-white/20 hover:border-white/30 backdrop-blur-sm dark:bg-transparent dark:hover:bg-white/10 dark:text-white dark:border-white/20 dark:hover:border-white/30 bg-transparent hover:bg-black/10 text-gray-900 border-gray-300 hover:border-gray-400',
    },
    sizes: {
      sm: 'px-3 py-2 text-sm rounded-md',
      md: 'px-4 py-2.5 text-sm rounded-lg',
      lg: 'px-6 py-3 text-base rounded-lg',
    },
    loading: {
      spinner: 'h-4 w-4 animate-spin rounded-full border-b-2 border-current',
    },
    danger:
      'text-red-400 hover:text-red-300 dark:text-red-400 dark:hover:text-red-300 text-red-600 hover:text-red-700',
  },

  // Card system
  card: {
    base: 'rounded-2xl transition-all duration-200',
    variants: {
      glass: cn(
        foundation.glass.light,
        'hover:bg-white/10 hover:border-white/20 dark:hover:bg-white/10 dark:hover:border-white/20 hover:bg-black/10 hover:border-black/20',
      ),
      solid:
        'bg-slate-800 border border-slate-700 hover:bg-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 bg-white border-gray-200 hover:bg-gray-50',
    },
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },

  // Input system
  input: {
    container: 'space-y-2',
    base: 'w-full transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-400 placeholder:text-gray-500',

    variants: {
      default: cn(
        foundation.glass.light,
        'text-white hover:border-white/30 focus:bg-white/10 dark:text-white dark:hover:border-white/30 dark:focus:bg-white/10 text-gray-900 hover:border-black/30 focus:bg-black/10',
      ),
      error:
        'bg-white/5 border border-red-500 text-white focus:ring-red-500 dark:bg-white/5 dark:border-red-500 dark:text-white dark:focus:ring-red-500 bg-red-50 border-red-500 text-red-900 focus:ring-red-500',
    },

    sizes: {
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    },
  },

  // Label system
  label: {
    base: 'block text-sm font-medium text-gray-300 dark:text-gray-300 text-gray-700',
    form: 'block text-sm font-medium text-gray-300 dark:text-gray-300 text-gray-700 text-left',
    required: 'ml-1 text-red-400 dark:text-red-400 text-red-600',
  },

  // Checkbox system
  checkbox: {
    container:
      'flex items-center text-sm text-white dark:text-white text-gray-900',
    input:
      'h-4 w-4 rounded border-white/20 bg-white/5 text-blue-500 transition-colors duration-200 dark:border-white/20 dark:bg-white/5 border-gray-300 bg-gray-50',
    label: 'cursor-pointer font-medium',
  },

  // Divider system
  divider: {
    base: 'flex-1 border-t border-white/10 dark:border-white/10 border-gray-200',
    withText: 'relative flex items-center justify-center',
    textSpan: 'px-2 text-sm text-gray-400 dark:text-gray-400 text-gray-600',
  },
}

// ===== UTILS SYSTEM
export const utils = {
  // Sidebar spacing
  sidebarSpacing: (hasSidebar: boolean) => ({
    main: hasSidebar ? 'ml-16' : '',
    content: hasSidebar ? 'pl-16' : '',
  }),
}

// ===== PATTERNS =====
export const patterns = {
  // Layout patterns
  flex: {
    row: 'flex items-center',
    rowBetween: 'flex items-center justify-between',
    rowGap: {
      sm: 'flex items-center gap-2',
      md: 'flex items-center gap-3',
      lg: 'flex items-center gap-4',
    },
  },
  spacing: {
    section: 'mt-6 space-y-3',
    stack: {
      sm: 'space-y-2',
      md: 'space-y-3',
      lg: 'space-y-4',
      xl: 'space-y-6',
    },
  },
  align: {
    right: 'text-right',
    left: 'text-left',
    center: 'text-center',
  },

  // Component patterns
  avatar: {
    sm: 'w-6 h-6 rounded-full border-2',
    md: 'w-8 h-8 rounded-full border-2',
    lg: 'w-12 h-12 rounded-full border-2',
    xl: 'h-20 w-20 rounded-full border-2',
  },
  button: {
    danger:
      'text-red-400 hover:text-red-300 dark:text-red-400 dark:hover:text-red-300 text-red-600 hover:text-red-700',
    back: 'flex items-center gap-2 text-white hover:text-gray-200 dark:text-white dark:hover:text-gray-200 text-gray-900 hover:text-gray-700',
    icon: 'p-2 rounded-lg transition-colors',
    iconDanger:
      'p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-500/20 text-red-600 hover:text-red-700 hover:bg-red-100',
  },
  message: {
    error: cn(
      foundation.typography.small,
      'text-red-400 dark:text-red-400 text-red-600',
    ),
  },

  // Form patterns
  form: {
    container: 'flex flex-col gap-2',
    label: foundation.typography.small,
    input: cn(
      foundation.glass.light,
      'p-2 rounded-lg text-white border border-white/20 focus:border-blue-500 focus:outline-none dark:text-white dark:border-white/20 dark:focus:border-blue-500 text-gray-900 border-gray-300 focus:border-blue-500',
    ),
    error: cn(
      foundation.typography.small,
      'text-red-400 dark:text-red-400 text-red-600',
    ),
  },

  // Settings page patterns
  settings: {
    // Container for settings page
    container:
      'w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-3 py-4 space-y-3',

    // Page title
    title: 'text-lg sm:text-xl font-bold text-white text-center mb-4',

    // Field containers
    fieldContainer: 'space-y-2',
    fieldWrapper: 'py-2',

    // Labels for form fields
    fieldLabel: 'block text-xs sm:text-sm text-gray-400',

    // Input fields (editing state)
    input:
      'w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-blue-500 focus:outline-none placeholder-gray-500',

    // Display fields (non-editing state)
    display:
      'w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm cursor-pointer hover:bg-gray-700 min-h-[2.25rem] flex items-center',

    // Message boxes
    messageError:
      'bg-red-900/50 border border-red-500 rounded px-3 py-2 text-red-300 text-xs sm:text-sm',
    messageSuccess:
      'bg-green-900/50 border border-green-500 rounded px-3 py-2 text-green-300 text-xs sm:text-sm',

    // Action buttons
    dangerButton:
      'w-full px-3 py-2 mt-4 bg-red-900/50 hover:bg-red-900/70 border border-red-500 rounded text-red-300 text-sm transition-colors min-h-[2.25rem]',
    dangerButtonInline:
      'w-full px-3 py-2 bg-red-900/50 hover:bg-red-900/70 border border-red-500 rounded text-red-300 text-sm transition-colors min-h-[2.25rem]',
    successButton:
      'w-full px-3 py-2 bg-green-700 hover:bg-green-600 rounded text-white text-sm transition-colors min-h-[2.25rem]',
    successButtonInline:
      'w-full px-3 py-2 mt-3 bg-green-700 hover:bg-green-600 rounded text-white text-sm transition-colors min-h-[2.25rem]',

    // Two-factor authentication specific
    qrContainer: 'p-4 text-center bg-gray-800 border border-gray-600 rounded',
    qrImage: 'w-32 h-32 mx-auto border border-gray-600 rounded',
    qrInput:
      'mt-3 text-center w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-blue-500 focus:outline-none placeholder-gray-500',
    qrMessage: 'text-xs text-center text-green-300',

    // Avatar upload specific
    avatarContainer: 'text-center space-y-3',
    avatarImage:
      'w-20 h-20 mx-auto rounded-full object-cover border-2 border-gray-600',
    avatarUploadWrapper: 'relative inline-block',
    avatarUploadInput:
      'absolute inset-0 w-full h-full opacity-0 cursor-pointer',
    avatarUploadButton:
      'px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm hover:bg-gray-700 transition-colors',
    avatarEditIcon:
      'absolute bottom-0 right-0 bg-gray-700 rounded-full p-1.5 cursor-pointer hover:bg-gray-600 transition-colors',
    avatarError: 'text-red-300 text-xs',
    avatarSuccess: 'text-green-300 text-xs',

    // Editable field specific
    editableFieldContainer: 'space-y-2',
    editableFieldHeader: 'flex items-center gap-2 mb-2',
    editableFieldIcon: 'text-white',
    editableFieldLabel: 'block text-sm font-medium text-gray-300',
    editableFieldInput: cn(
      foundation.glass.light,
      'w-full p-3 rounded-lg text-white border border-white/20 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder:text-gray-400',
    ),
    editableFieldDisplay: cn(
      foundation.glass.light,
      'p-3 rounded-lg border border-white/20 text-white',
    ),
    editableFieldActions: 'flex justify-end',
    editableFieldActionsGroup: 'flex items-center gap-2',
    editableFieldButtonEdit:
      'flex items-center gap-2 px-3 py-2 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 transition-all duration-200',
    editableFieldButtonSave:
      'flex items-center gap-2 px-3 py-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-500/20 transition-all duration-200',
    editableFieldButtonCancel:
      'flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-500/20 transition-all duration-200',
  },

  // Footer app preferences
  appPreferences: {
    container:
      'flex flex-col sm:flex-row gap-3 sm:gap-6 items-center justify-center mb-4',
    preference: 'flex items-center gap-2',
    label: 'text-xs text-gray-400',
    select:
      'px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:border-blue-500 focus:outline-none',
  },

  // Friend status button variants
  friendButton: {
    remove: 'w-full text-red-400 hover:text-red-300 hover:bg-red-500/20',
    cancel: 'w-full text-yellow-400 hover:text-yellow-300',
    deny: 'flex-1 text-red-400 hover:text-red-300 hover:bg-red-500/20',
    accept: 'flex-1',
    add: 'w-full',
  },

  // Modal patterns - Simple & Clean
  modal: {
    // Base overlay - covers entire screen
    overlay:
      'fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]',

    // Content container - more opaque for better readability
    content: cn(
      'bg-slate-800/95 backdrop-blur-lg border border-white/30',
      'rounded-xl p-6 mx-4 max-w-lg w-full max-h-[80vh] overflow-y-auto',
      'shadow-2xl relative z-[9999]',
    ),

    // Header - simple title area
    header: 'mb-4',
    title: foundation.typography.h3,
    subtitle: cn(foundation.typography.small, 'text-gray-300 mt-1'),

    // Body - main content area
    body: 'mb-6',

    // Footer - action buttons
    footer: 'flex gap-3 justify-end',

    // Player selection item - more opaque
    playerItem: cn(
      'flex items-center justify-between p-3 rounded-lg',
      'bg-slate-700/80 border border-white/20 hover:bg-slate-600/80',
      'transition-colors cursor-pointer',
    ),
    playerSelected: 'ring-2 ring-blue-500 bg-blue-500/20 border-blue-500/50',
  },

  // Feature-specific patterns
  match: {
    container: cn(
      'flex items-center justify-between p-4 rounded-lg',
      foundation.glass.light,
    ),
    icon: {
      base: 'text-xl',
      mode: {
        '1v1': foundation.colors.semantic.info,
        tournament: foundation.colors.semantic.warning,
      },
    },
    players: {
      container: 'flex items-center gap-3',
      list: 'flex items-center gap-2',
    },
  },
  stats: {
    grid: 'mt-6 grid grid-cols-2 gap-4',
    card: {
      base: cn(components.card.base, foundation.glass.light, 'p-4'),
      title: foundation.typography.small,
      value: foundation.typography.h3,
    },
  },
  select: {
    container: 'flex flex-col gap-2',
    label: foundation.typography.small,
    input: cn(
      foundation.glass.light,
      'p-2 rounded-lg text-white border border-white/20 focus:border-blue-500 focus:outline-none',
    ),
  },
  gameModeButton: {
    base: cn(
      'flex flex-col items-center justify-center p-6',
      foundation.glass.light,
      'hover:bg-white/15 border border-white/20 hover:border-white/30',
      'rounded-xl transition-all duration-200',
      'min-h-[180px] w-full',
    ),
    icon: cn('text-5xl mb-3', 'text-white'),
    title: cn('text-xl font-semibold text-white', 'mb-2'),
    players: cn('text-sm text-gray-300'),
  },

  // Top players patterns
  topPlayers: {
    grid: 'mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4',
    player: {
      container: 'text-center space-y-2',
      avatarWrapper: 'relative mx-auto w-fit',
      avatar: 'w-16 h-16 rounded-full border-2 border-white/20',
      crown: 'absolute -top-1 -right-1 text-lg',
      name: 'text-sm font-medium text-white truncate',
      percentage: 'text-lg font-bold text-green-400',
      record: 'text-xs text-gray-400',
    },
    empty: {
      container: 'text-center py-8',
      message: foundation.typography.body,
      subtitle: foundation.typography.small,
    },
    encouragement: {
      container: 'mt-4 text-center',
      message: foundation.typography.small,
    },
  },

  // Game patterns
  game: {
    container: cn('flex flex-col items-center w-full', 'space-y-6'),
    header: {
      container: cn(
        'flex items-center justify-between',
        'w-full max-w-[800px] mb-6',
      ),
      player: {
        container: 'flex items-center gap-3',
        info: (isRightAligned?: boolean) =>
          cn('flex flex-col gap-2', isRightAligned && 'items-end'),
      },
      matchInfo: 'flex flex-col items-center gap-2',
    },
    canvas: {
      wrapper: cn(
        'relative overflow-hidden',
        'w-[800px] h-[600px]',
        foundation.glass.light,
      ),
      element: 'block w-full h-full',
      message: {
        status: 'absolute top-8 left-1/2 -translate-x-1/2',
        result:
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4',
      },
    },
  },

  // Dropdown patterns
  dropdown: {
    container: cn(
      'absolute top-full right-0 mt-2 w-48',
      foundation.glass.medium,
      'border rounded-lg p-4',
    ),
    content: 'space-y-2',
    button: cn(
      'w-full flex items-center gap-3 px-3 py-2',
      'text-white rounded-lg transition-colors',
      foundation.states.hover,
    ),
    buttonDanger: cn(
      'w-full flex items-center gap-3 px-3 py-2',
      'text-red-400 hover:text-red-300 rounded-lg transition-colors',
      foundation.states.hover,
    ),
  },

  // Status indicator patterns
  status: {
    base: 'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
    variants: {
      online: 'bg-green-400',
      offline: 'bg-gray-400',
      away: 'bg-yellow-400',
      busy: 'bg-red-400',
    },
  },

  // Tournament bracket patterns
  tournament: {
    // Main bracket container
    bracket: {
      container: cn(
        foundation.glass.light,
        'rounded-3xl p-12 backdrop-blur-sm border border-white/20',
      ),
      title: {
        container: 'text-center mb-12',
        text: cn(foundation.typography.h1, 'text-white mb-4'),
        divider:
          'w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full',
      },
      rounds: {
        container: 'flex gap-16 justify-center items-center min-h-96',
        round: 'flex flex-col justify-center space-y-12',
        matches: 'space-y-16',
      },
    },

    // Round headers
    round: {
      header: 'text-center mb-8',
      badge: {
        base: 'inline-block px-6 py-3 rounded-full text-white font-bold text-xl',
        final: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
        semifinal: 'bg-gradient-to-r from-purple-500 to-purple-600',
        regular: 'bg-gradient-to-r from-blue-500 to-blue-600',
      },
    },

    // Player cards in bracket
    player: {
      base: cn(
        'flex items-center justify-between p-4 rounded-xl border-2 transition-all min-w-48',
      ),
      winner:
        'bg-green-500/30 border-green-400 text-green-100 shadow-lg shadow-green-500/20',
      loser: 'bg-red-500/20 border-red-400/50 text-red-200',
      pending: 'bg-white/10 border-white/30 text-white hover:bg-white/15',
      name: {
        base: foundation.typography.h3,
        winner: 'font-bold text-green-100',
        default: 'text-white',
      },
      score: {
        base: cn(
          foundation.typography.h2,
          'font-mono font-bold min-w-8 text-center',
        ),
        winner: 'text-green-200',
        loser: 'text-red-300',
        pending: 'text-gray-300',
      },
    },

    // Match components
    match: {
      container: 'space-y-4',
      players: 'space-y-2 relative',
      vsIndicator: {
        container: 'absolute -right-12 top-1/2 -translate-y-1/2',
        badge:
          'bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse',
      },
      button: cn(
        components.button.base,
        components.button.variants.primary,
        components.button.sizes.lg,
        'w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3',
      ),
      connector: {
        container: 'flex justify-end items-center',
        line: 'w-16 h-1 bg-gradient-to-r from-white/30 to-white/60 rounded-full',
        dot: 'w-4 h-4 bg-white/60 rounded-full ml-2',
      },
    },

    // Winner celebration
    winner: {
      container: 'min-h-screen flex items-center justify-center',
      content: 'text-center space-y-8 max-w-2xl',
      trophy: 'text-8xl mb-8',
      title: cn(foundation.typography.h1, 'text-6xl text-yellow-400'),
      subtitle: cn(foundation.typography.h2, 'text-4xl text-white'),
      champion: cn(
        foundation.typography.h1,
        'text-5xl text-yellow-300 font-bold',
      ),
      button: cn(
        components.button.base,
        components.button.variants.primary,
        components.button.sizes.lg,
        'mt-8 px-8 py-4 text-xl',
      ),
    },

    // Page layout
    page: {
      container: 'min-h-screen py-8',
      wrapper: 'max-w-7xl mx-auto px-8',
      header: {
        container: 'flex items-center justify-between mb-12',
        info: 'space-y-2',
        title: cn(foundation.typography.h1, 'text-4xl text-white'),
        round: cn(foundation.typography.h3, 'text-blue-400'),
        reset: 'text-red-400 hover:text-red-300',
      },
      progress: {
        container: 'text-center mt-8',
        text: cn(foundation.typography.body, 'text-gray-400'),
      },
    },
  },
} as const

// ===== FORMS SYSTEM
export const forms = {
  container: patterns.spacing.stack.xl,
  field: patterns.spacing.stack.sm,

  // Auth-specific styles
  auth: {
    card: 'mx-auto max-w-md p-8',
    header: 'mb-6 text-center',
    iconContainer: 'mb-4 flex justify-center',
    subtitle: 'mt-2',
    controls: patterns.flex.rowBetween,
    footer: patterns.align.center,
    link: 'text-sm text-blue-400 hover:text-blue-300 transition-colors',
    fullWidth: 'w-full',
    icon: patterns.avatar.xl,
    error: 'text-sm text-red-400',
  },
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
    buttons: 'flex flex-col sm:flex-row gap-4 max-w-md mx-auto',
    buttonLink: 'flex-1',
  },

  // Header section
  header: {
    base: 'relative z-10 border-b border-white/10 dark:border-white/10 border-gray-200 px-6 py-4',
    container: 'flex items-center justify-center w-full relative',
    title:
      'text-xl font-bold text-white dark:text-white text-gray-900 text-center',
    userSection: 'absolute right-0 flex items-center gap-3',
    username: 'text-white dark:text-white text-gray-900 font-medium',
    logoutButton:
      'p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-500/20 text-red-600 hover:text-red-700 hover:bg-red-100',
  },

  // Footer section
  footer: {
    base: 'relative z-10 border-t border-white/10 dark:border-white/10 border-gray-200 px-6 py-8 text-center mt-auto',
    container: 'mx-auto max-w-6xl space-y-4',
    copyright: 'text-gray-400 dark:text-gray-400 text-gray-600',
    developers: {
      container: 'space-y-3',
      row: 'flex items-center justify-center space-x-4',
      label: 'text-sm text-gray-500 dark:text-gray-500 text-gray-600',
      link: 'text-gray-400 transition-colors hover:text-white dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-900',
    },
    tech: 'text-sm text-gray-500 dark:text-gray-500 text-gray-600',
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
      'text-white',
    ),
    contentWrapper: cn(
      'relative z-10 flex w-full flex-col',
      'items-center justify-center',
      'p-4 md:p-6 lg:p-8',
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
      tooltip:
        'pointer-events-none fixed left-20 z-[9999] whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100',
    },
  },

  // Grid layouts
  grid: {
    header: 'flex justify-between items-center mb-8',
    twoColumn: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    twoColumnWithMargin: 'grid grid-cols-1 md:grid-cols-2 gap-6 mt-6',
    gameModes: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  },
}

// ===== CONTENT
export const content = {
  // Landing page content
  landing: {
    welcome: {
      title: 'Ping. Pong. Play!',
      subtitle: 'Level Up Your Ping Pong Skills',
      description:
        'Smash, spin, and dominate the table. Prove you are the ultimate paddle master.',
    },
  },
}
