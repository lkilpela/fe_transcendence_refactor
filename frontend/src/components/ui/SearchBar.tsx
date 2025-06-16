import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'
import { cn } from '@/utils/cn'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search...',
  className,
}) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="min-w-[200px]"
      />
      <Button type="submit">Search</Button>
    </form>
  )
}

export default SearchBar 