import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  children: React.ReactNode
  className?: string
}

export function Button({ 
  children, 
  className = '', 
  variant = 'default', 
  size = 'default',
  onClick,
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    default: 'bg-[#1B5E20] text-white hover:bg-[#2E7D32] focus:ring-[#1B5E20]',
    outline: 'border-2 border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white',
    ghost: 'text-gray-600 hover:bg-gray-100'
  }
  
  const sizes = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1.5 text-xs',
    lg: 'px-6 py-3 text-base'
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}