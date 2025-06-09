# 🎓 **Beginner's Guide: Building AuthContext and Hooks**

A complete guide to understanding and building authentication in React using Context API and custom hooks.

## 📚 **What is React Context?**

Think of React Context like a **"global state container"** that lets you share data across your entire app without passing props down through every component.

```typescript
// ❌ Without Context - "Prop Drilling"
<App>
  <Header user={user} />           // Pass user down
  <Main user={user} />             // Pass user down  
    <Dashboard user={user} />      // Pass user down
      <Profile user={user} />      // Finally use it!
</App>

// ✅ With Context - Direct Access
<App>
  <AuthProvider>                   // Provides user globally
    <Header />                     // Gets user from context
    <Main />
      <Dashboard />
        <Profile />                // Gets user from context
      </Dashboard>
    </Main>
  </AuthProvider>
</App>
```

## 🔧 **Step 1: Create the Context**

```typescript
// AuthContext.tsx
import React, { createContext, useContext } from 'react'

// 1. Define what data the context will hold
interface AuthState {
  user: User | null          // Current logged-in user
  isAuthenticated: boolean   // Are they logged in?
  isLoading: boolean        // Is auth check happening?
  error: string | null      // Any auth errors?
}

// 2. Define what actions the context will provide
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

// 3. Create the context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined)
```

**Why undefined?** Because if someone tries to use the context outside a Provider, we want it to fail clearly rather than have weird default values.

## 🏗️ **Step 2: Create the Provider Component**

The Provider is a component that:
1. **Holds the state** (user data, loading status, etc.)
2. **Provides methods** to change that state (login, logout, etc.)
3. **Wraps your app** to make everything available globally

```typescript
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Create state to hold all auth data
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,    // Start loading while we check if user is logged in
    error: null,
  })

  // 2. Helper functions to update state cleanly
  const setUser = (user: User | null) => {
    setState(prev => ({
      ...prev,               // Keep everything else the same
      user,                  // Update just the user
      isAuthenticated: !!user, // true if user exists, false if null
      isLoading: false,      // Done loading
    }))
  }

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }))
  }

  // 3. Create action functions
  const login = async (email: string, password: string) => {
    try {
      setError(null)                                    // Clear any old errors
      const response = await apiService.login(email, password) // Call API
      localStorage.setItem('token', response.token)     // Save token
      setUser(response.user)                           // Update state
      navigate('/dashboard')                           // Redirect user
    } catch (error) {
      setError('Login failed')                         // Show error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')                   // Clear token
    setUser(null)                                     // Clear user
    navigate('/')                                     // Go to home
  }

  // 4. Package everything to share
  const contextValue = {
    ...state,        // All the state data
    login,           // All the action functions
    logout,
    clearError: () => setError(null),
  }

  // 5. Provide the value to all children
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}
```

## 🪝 **Step 3: Create the Hook**

A custom hook makes it easy and safe to use the context:

```typescript
export const useAuth = () => {
  const context = useContext(AuthContext)
  
  // Safety check - make sure we're inside a Provider
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  
  return context
}
```

**Why this pattern?** It prevents bugs where you forget to wrap components in the Provider.

## 🔄 **Step 4: Understanding the Auth Flow**

Here's how authentication works step by step:

### **Registration Flow:**
```typescript
// 1. User fills form and clicks "Register"
const handleRegister = (formData) => {
  register(formData.username, formData.email, formData.password)
}

// 2. register() function runs
const register = async (username, email, password) => {
  setLoading(true)                                     // Show loading
  const response = await api.register(username, email, password) // Call backend
  localStorage.setItem('token', response.token)        // Save login token
  setUser(response.user)                              // Update global state
  navigate('/dashboard')                              // Redirect to app
}

// 3. Now entire app knows user is logged in!
```

### **Login Flow:**
```typescript
// 1. User enters email/password
const handleLogin = (email, password) => {
  login(email, password)  // Same process as register
}
```

### **Auto-Login on Page Refresh:**
```typescript
// When app starts, check if user was already logged in
useEffect(() => {
  const token = localStorage.getItem('token')
  if (token) {
    // User has a token, verify it's still valid
    apiService.setToken(token)
    const user = await apiService.getCurrentUser()
    setUser(user)  // They're still logged in!
  } else {
    setUser(null)  // No token, they're logged out
  }
}, [])
```

## 🛡️ **Step 5: Using Auth in Components**

### **In any component:**
```typescript
function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return <div>Please log in</div>
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

### **For protected routes:**
```typescript
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return <Navigate to="/login" />
  
  return children  // User is logged in, show the content
}
```

## 🎯 **Step 6: Wrapping Your App**

Finally, wrap your entire app with the Provider:

```typescript
// App.tsx
function App() {
  return (
    <AuthProvider>           {/* Everything inside can use auth */}
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
```

## 💡 **Key Concepts for Beginners**

### **1. State Management**
- Context holds **shared state** that many components need
- Use `useState` to manage that state in the Provider
- Create **helper functions** to update state cleanly

### **2. Side Effects**
- Use `useEffect` to check if user is logged in when app starts
- Handle **API calls** in async functions
- **localStorage** persists login between browser sessions

### **3. Error Handling**
- Always handle API failures gracefully
- Show meaningful error messages to users
- Clear errors when user tries again

### **4. Security**
- Store **JWT tokens** in localStorage for simple apps
- Always verify tokens are still valid
- Clear tokens completely on logout

## 🚀 **Common Patterns**

### **Loading States:**
```typescript
const { isLoading } = useAuth()
if (isLoading) return <Spinner />
```

### **Conditional Rendering:**
```typescript
const { isAuthenticated } = useAuth()
return (
  <div>
    {isAuthenticated ? <UserMenu /> : <LoginButton />}
  </div>
)
```

### **Error Display:**
```typescript
const { error, clearError } = useAuth()
return (
  <div>
    {error && (
      <div className="error">
        {error}
        <button onClick={clearError}>×</button>
      </div>
    )}
  </div>
)
```

## 🏗️ **Project Implementation**

Our current implementation follows this exact pattern:

### **File Structure:**
```
src/
├── components/
│   ├── features/
│   │   └── auth/
│   │       ├── AuthContext.tsx    # Context & Provider
│   │       ├── LoginForm.tsx      # Login UI
│   │       ├── RegisterForm.tsx   # Registration UI
│   │       └── index.ts           # Exports
│   └── layout/
│       └── ProtectedRoute.tsx     # Route protection
├── hooks/
│   └── useAuth.ts                 # Re-exports useAuth hook
├── services/
│   └── api.ts                     # API calls
└── app/
    ├── AppProviders.tsx           # Wraps app with AuthProvider
    └── AppRoutes.tsx              # Defines routes
```

### **Key Features:**
- ✅ **JWT Token Management** - Automatic storage and validation
- ✅ **Auto-Login** - Remembers users between sessions
- ✅ **Error Handling** - Graceful error display and recovery
- ✅ **Loading States** - Shows loading during auth operations
- ✅ **Protected Routes** - Automatic redirect for unauthorized access
- ✅ **TypeScript** - Full type safety throughout

### **Backend Integration:**
Our AuthContext connects to these backend endpoints:
- `POST /register` - User registration
- `POST /login` - User authentication
- `POST /logout` - User logout
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/google` - Google OAuth (planned)

This pattern gives you **global authentication state** that's easy to use anywhere in your app! 🎉

## 📖 **Further Reading**

- [React Context API Documentation](https://react.dev/learn/passing-data-deeply-with-context)
- [Custom Hooks Guide](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [JWT Authentication Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
- [React Router Protected Routes](https://reactrouter.com/en/main/examples/auth) 