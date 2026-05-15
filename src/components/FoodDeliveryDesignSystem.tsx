/**
 * Food Delivery Agentic Design System
 * Font: Helvetica Neue Normal
 * Primary: #22C55E  Secondary: #FACC15  Error: #EF4444
 *
 * Atoms → Molecules → Organisms
 * Every component is agentic-ready via data-agent-* attributes.
 */

import React, { forwardRef } from 'react';
import {
  Loader2,
  Search,
  Mic,
  Clock,
  Gift,
  Star,
  ChevronDown,
  ShoppingBag,
  Home,
  Tag,
  Bell,
  User,
  ArrowLeft,
  Share2,
  Heart,
  X,
  Phone,
  MessageCircle,
  Check,
  Plus,
  AlertCircle,
  CheckCircle,
  Info,
  UtensilsCrossed,
} from 'lucide-react';
import type { AgenticBaseProps, AgentContext } from '../types/agentic';

// ─────────────────────────────────────────────────────────────────────────────
// ATOMS
// ─────────────────────────────────────────────────────────────────────────────

// Spinner ─────────────────────────────────────────────────────────────────────
export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'white' | 'gray';
  className?: string;
}
export const Spinner = ({ size = 'md', color = 'green', className = '' }: SpinnerProps) => {
  const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8' };
  const colors = { green: 'text-green-500', white: 'text-white', gray: 'text-gray-400' };
  return (
    <Loader2
      className={`animate-spin ${sizes[size]} ${colors[color]} ${className}`}
    />
  );
};

// SkeletonLoader ──────────────────────────────────────────────────────────────
export interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  className?: string;
}
export const SkeletonLoader = ({
  width = 'w-full',
  height = 'h-4',
  rounded = 'xl',
  className = '',
}: SkeletonLoaderProps) => (
  <div
    className={`animate-pulse bg-gray-200 rounded-${rounded} ${width} ${height} ${className}`}
  />
);

// DotLoader ───────────────────────────────────────────────────────────────────
export const DotLoader = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center gap-1.5 ${className}`}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="h-2 w-2 rounded-full bg-green-500 animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

// ProgressBar ─────────────────────────────────────────────────────────────────
export type ProgressStatus = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface ProgressBarProps {
  value?: number;
  status?: ProgressStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
}
export const ProgressBar = ({
  value,
  status = 'default',
  size = 'md',
  showLabel = false,
  label,
  className = '',
}: ProgressBarProps) => {
  const isIndeterminate = status === 'loading' || value === undefined;
  const clampedValue = Math.min(100, Math.max(0, value ?? 0));
  const heights = { sm: 'h-1', md: 'h-2', lg: 'h-3' };
  const fills: Record<ProgressStatus, string> = {
    default: 'bg-gray-400',
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-400',
    info: 'bg-blue-500',
    loading: 'bg-green-500',
  };
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {(label || showLabel) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs font-medium text-gray-600">{label}</span>}
          {showLabel && !isIndeterminate && (
            <span className="text-xs text-gray-500">{clampedValue}%</span>
          )}
        </div>
      )}
      <div className={`relative w-full overflow-hidden rounded-full bg-gray-100 ${heights[size]}`}>
        {isIndeterminate ? (
          <div className={`absolute top-0 h-full rounded-full ${fills[status]} food-progress-indeterminate`} />
        ) : (
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${fills[status]}`}
            style={{ width: `${clampedValue}%` }}
          />
        )}
      </div>
    </div>
  );
};

// ProgressCircle ──────────────────────────────────────────────────────────────
export interface ProgressCircleProps {
  value?: number;
  status?: ProgressStatus;
  size?: 'sm' | 'md' | 'lg';
  strokeWidth?: number;
  showValue?: boolean;
  className?: string;
}
export const ProgressCircle = ({
  value,
  status = 'default',
  size = 'md',
  strokeWidth,
  showValue = false,
  className = '',
}: ProgressCircleProps) => {
  const isIndeterminate = status === 'loading' || value === undefined;
  const clampedValue = Math.min(100, Math.max(0, value ?? 0));
  const dims = { sm: 32, md: 48, lg: 64 };
  const defaultSW = { sm: 3, md: 4, lg: 5 };
  const dim = dims[size];
  const sw = strokeWidth ?? defaultSW[size];
  const r = (dim - sw) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (clampedValue / 100) * circumference;
  const strokes: Record<ProgressStatus, string> = {
    default: '#9CA3AF',
    success: '#22C55E',
    error: '#EF4444',
    warning: '#FACC15',
    info: '#3B82F6',
    loading: '#22C55E',
  };
  const textSizes = { sm: 'text-[8px]', md: 'text-[10px]', lg: 'text-xs' };
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: dim, height: dim }}
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        width={dim}
        height={dim}
        viewBox={`0 0 ${dim} ${dim}`}
        className={isIndeterminate ? 'animate-spin' : '-rotate-90'}
      >
        <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={sw} />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke={strokes[status]}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={
            isIndeterminate
              ? `${circumference * 0.25} ${circumference * 0.75}`
              : `${circumference} ${circumference}`
          }
          strokeDashoffset={isIndeterminate ? 0 : offset}
          style={!isIndeterminate ? { transition: 'stroke-dashoffset 0.5s ease' } : undefined}
        />
      </svg>
      {showValue && !isIndeterminate && (
        <span
          className={`absolute font-semibold text-gray-700 ${textSizes[size]}`}
          style={{ fontFamily: 'var(--food-font)' }}
        >
          {clampedValue}%
        </span>
      )}
    </div>
  );
};

// CardSkeleton ────────────────────────────────────────────────────────────────
export const CardSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`overflow-hidden rounded-2xl bg-white shadow-sm ${className}`}>
    <SkeletonLoader height="h-32" rounded="sm" />
    <div className="p-3 space-y-2">
      <SkeletonLoader height="h-4" width="w-3/4" />
      <SkeletonLoader height="h-3" width="w-1/2" />
      <SkeletonLoader height="h-3" width="w-1/3" />
    </div>
  </div>
);

// Badge ───────────────────────────────────────────────────────────────────────
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'trusted';
export interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}
export const Badge = ({
  variant = 'default',
  size = 'sm',
  children,
  className = '',
}: BadgeProps) => {
  const variants: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    trusted: 'bg-orange-50 text-orange-500 border border-orange-200',
  };
  const sizes = { sm: 'text-xs px-2 py-0.5', md: 'text-sm px-3 py-1' };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};

// VerifiedBadge ───────────────────────────────────────────────────────────────
export const VerifiedBadge = ({ className = '' }: { className?: string }) => (
  <span
    className={`inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 flex-shrink-0 ${className}`}
  >
    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
  </span>
);

// TrustedBadge ────────────────────────────────────────────────────────────────
export const TrustedBadge = ({ className = '' }: { className?: string }) => (
  <Badge variant="trusted" className={className}>
    <Heart className="h-3 w-3" />
    Trusted
  </Badge>
);

// StarRating ──────────────────────────────────────────────────────────────────
export interface StarRatingProps {
  rating: number;
  reviewCount?: number | string;
  size?: 'sm' | 'md';
  showCount?: boolean;
  className?: string;
}
export const StarRating = ({
  rating,
  reviewCount,
  size = 'sm',
  showCount = true,
  className = '',
}: StarRatingProps) => {
  const starSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  const filled = Math.round(rating);
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`${starSize} ${
              i < filled ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-gray-500">
          ({reviewCount ?? rating})
        </span>
      )}
    </div>
  );
};

// SearchInput ─────────────────────────────────────────────────────────────────
export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  onMicClick?: () => void;
  isListening?: boolean;
  className?: string;
}
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onMicClick, isListening = false, className = '', ...props }, ref) => (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm ${className}`}
    >
      <Search className="h-4 w-4 flex-shrink-0 text-gray-400" />
      <input
        ref={ref}
        className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
        style={{ fontFamily: 'var(--food-font, "Helvetica Neue", Helvetica, Arial, sans-serif)' }}
        {...props}
      />
      {onMicClick && (
        <button
          type="button"
          onClick={onMicClick}
          className={`flex-shrink-0 rounded-lg p-1.5 transition-colors ${
            isListening ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-green-500'
          }`}
          aria-label={isListening ? 'Stop listening' : 'Voice search'}
        >
          <Mic className="h-4 w-4" />
        </button>
      )}
    </div>
  )
);
SearchInput.displayName = 'SearchInput';

// FilterChip ──────────────────────────────────────────────────────────────────
export interface FilterChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  className?: string;
}
export const FilterChip = forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ icon, label, isActive = false, className = '', ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'border-green-500 bg-green-500 text-white'
          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
      } ${className}`}
      {...props}
    >
      {icon && <span className="text-xs leading-none">{icon}</span>}
      {label}
    </button>
  )
);
FilterChip.displayName = 'FilterChip';

// DeliveryInfo ────────────────────────────────────────────────────────────────
export const DeliveryInfo = ({
  minutes,
  className = '',
}: {
  minutes: number | string;
  className?: string;
}) => (
  <span className={`inline-flex items-center gap-1 text-xs text-gray-500 ${className}`}>
    <Clock className="h-3 w-3 flex-shrink-0" />
    {minutes} Mins
  </span>
);

// FreeDeliveryBadge ───────────────────────────────────────────────────────────
export const FreeDeliveryBadge = ({ className = '' }: { className?: string }) => (
  <span className={`inline-flex items-center gap-1 text-xs text-gray-500 ${className}`}>
    <Gift className="h-3 w-3 flex-shrink-0" />
    Free Delivery
  </span>
);

// PriceTag ────────────────────────────────────────────────────────────────────
export interface PriceTagProps {
  price: number;
  size?: 'sm' | 'md' | 'lg';
  prefix?: string;
  className?: string;
}
export const PriceTag = ({
  price,
  size = 'md',
  prefix = '$',
  className = '',
}: PriceTagProps) => {
  const sizes = {
    sm: 'text-sm font-bold',
    md: 'text-xl font-bold',
    lg: 'text-3xl font-bold',
  };
  return (
    <span className={`${sizes[size]} text-gray-900 ${className}`}>
      <span className={size === 'lg' ? 'text-lg font-normal text-gray-500' : ''}>{prefix}</span>
      {price.toFixed(2)}
    </span>
  );
};

// ErrorState ──────────────────────────────────────────────────────────────────
export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}
export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Please try again later.',
  onRetry,
  className = '',
}: ErrorStateProps) => (
  <div
    className={`flex flex-col items-center justify-center gap-3 p-6 text-center ${className}`}
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
      <AlertCircle className="h-6 w-6 text-red-500" />
    </div>
    <div>
      <p className="font-semibold text-gray-900">{title}</p>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
    </div>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);

// InlineError (field-level validation message) ────────────────────────────────
export interface InlineErrorProps {
  message?: string;
  className?: string;
}
export const InlineError = ({ message, className = '' }: InlineErrorProps) => {
  if (!message) return null;
  return (
    <p className={`flex items-center gap-1 text-xs text-red-500 ${className}`}>
      <AlertCircle className="h-3 w-3 flex-shrink-0" />
      {message}
    </p>
  );
};

// InlineSuccess ───────────────────────────────────────────────────────────────
export const InlineSuccess = ({
  message,
  className = '',
}: {
  message?: string;
  className?: string;
}) => {
  if (!message) return null;
  return (
    <p className={`flex items-center gap-1 text-xs text-green-600 ${className}`}>
      <CheckCircle className="h-3 w-3 flex-shrink-0" />
      {message}
    </p>
  );
};

// EmptyState ──────────────────────────────────────────────────────────────────
export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message?: string;
  action?: React.ReactNode;
  className?: string;
}
export const EmptyState = ({
  icon,
  title,
  message,
  action,
  className = '',
}: EmptyStateProps) => (
  <div
    className={`flex flex-col items-center justify-center gap-3 p-8 text-center ${className}`}
  >
    {icon ? (
      <div className="text-4xl">{icon}</div>
    ) : (
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <UtensilsCrossed className="h-7 w-7 text-gray-400" />
      </div>
    )}
    <div>
      <p className="font-semibold text-gray-900">{title}</p>
      {message && <p className="mt-1 text-sm text-gray-500">{message}</p>}
    </div>
    {action}
  </div>
);

// ToastNotification ───────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'info' | 'warning';
export interface ToastNotificationProps {
  type?: ToastType;
  message: string;
  onDismiss?: () => void;
  className?: string;
}
export const ToastNotification = ({
  type = 'info',
  message,
  onDismiss,
  className = '',
}: ToastNotificationProps) => {
  const styles: Record<ToastType, { bg: string; icon: React.ReactNode }> = {
    success: { bg: 'bg-green-500', icon: <CheckCircle className="h-4 w-4" /> },
    error: { bg: 'bg-red-500', icon: <AlertCircle className="h-4 w-4" /> },
    warning: { bg: 'bg-yellow-400', icon: <AlertCircle className="h-4 w-4" /> },
    info: { bg: 'bg-blue-500', icon: <Info className="h-4 w-4" /> },
  };
  const { bg, icon } = styles[type];
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl ${bg} px-4 py-3 text-white shadow-lg ${className}`}
    >
      {icon}
      <p className="flex-1 text-sm font-medium">{message}</p>
      {onDismiss && (
        <button type="button" onClick={onDismiss} className="flex-shrink-0 hover:opacity-75">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

// NutritionRow ────────────────────────────────────────────────────────────────
export interface NutritionRowProps {
  calories: number;
  diameter?: string;
  portions?: number;
  className?: string;
}
export const NutritionRow = ({
  calories,
  diameter,
  portions,
  className = '',
}: NutritionRowProps) => (
  <div className={`flex gap-8 ${className}`}>
    <div>
      <p className="text-xs text-gray-400">Calories</p>
      <p className="font-semibold text-gray-800">
        {calories} Cal{' '}
        <span role="img" aria-label="fire">
          🔥
        </span>
      </p>
    </div>
    {(diameter || portions) && (
      <div>
        <p className="text-xs text-gray-400">Diameter / Portion</p>
        <p className="font-semibold text-gray-800">
          {diameter ?? '—'} / {portions ?? '—'} Slices{' '}
          <span role="img" aria-label="pizza">
            🍕
          </span>
        </p>
      </div>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// INPUTS
// ─────────────────────────────────────────────────────────────────────────────

// TextInput (general-purpose form field) ──────────────────────────────────────
export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>,
    AgenticBaseProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      successMessage,
      leftIcon,
      rightIcon,
      agentContext,
      agentId,
      onAgentMutate,
      className = '',
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(errorMessage);
    const hasSuccess = Boolean(successMessage);
    const borderColor = hasError
      ? 'border-red-400 focus-within:ring-red-300'
      : hasSuccess
      ? 'border-green-400 focus-within:ring-green-300'
      : 'border-gray-200 focus-within:ring-green-300';

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <div
          className={`flex items-center gap-2 rounded-2xl border bg-white/70 px-4 py-3 backdrop-blur-sm transition-all focus-within:ring-2 ${borderColor}`}
        >
          {leftIcon && (
            <span className="flex-shrink-0 text-gray-400">{leftIcon}</span>
          )}
          <input
            ref={ref}
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
            style={{
              fontFamily:
                'var(--food-font, "Helvetica Neue", Helvetica, Arial, sans-serif)',
            }}
            data-agent-id={agentId}
            data-agent-context={
              agentContext ? JSON.stringify(agentContext) : undefined
            }
            {...props}
          />
          {rightIcon && (
            <span className="flex-shrink-0 text-gray-400">{rightIcon}</span>
          )}
        </div>
        {helperText && !hasError && !hasSuccess && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
        <InlineError message={errorMessage} />
        <InlineSuccess message={successMessage} />
      </div>
    );
  }
);
TextInput.displayName = 'TextInput';

// ─────────────────────────────────────────────────────────────────────────────
// MOLECULES
// ─────────────────────────────────────────────────────────────────────────────

// SizeSelector ────────────────────────────────────────────────────────────────
export interface SizeSelectorProps {
  sizes?: string[];
  selectedSize?: string;
  onSizeChange?: (size: string) => void;
  className?: string;
}
export const SizeSelector = ({
  sizes = ['Small', 'Medium', 'Large'],
  selectedSize,
  onSizeChange,
  className = '',
}: SizeSelectorProps) => (
  <div className={`flex flex-wrap gap-2 ${className}`}>
    {sizes.map((size) => (
      <button
        key={size}
        type="button"
        onClick={() => onSizeChange?.(size)}
        className={`rounded-xl border-2 px-5 py-2 text-sm font-medium transition-all duration-200 ${
          selectedSize === size
            ? 'border-green-500 bg-green-500 text-white'
            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
        }`}
      >
        {size}
      </button>
    ))}
  </div>
);

// CarouselDots ────────────────────────────────────────────────────────────────
export interface CarouselDotsProps {
  count: number;
  activeIndex: number;
  onDotClick?: (index: number) => void;
  className?: string;
}
export const CarouselDots = ({
  count,
  activeIndex,
  onDotClick,
  className = '',
}: CarouselDotsProps) => (
  <div className={`flex items-center justify-center gap-1.5 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onDotClick?.(i)}
        aria-label={`Slide ${i + 1}`}
        className={`rounded-full transition-all duration-300 ${
          i === activeIndex ? 'h-2 w-4 bg-green-500' : 'h-2 w-2 bg-gray-300'
        }`}
      />
    ))}
  </div>
);

// SectionHeader ───────────────────────────────────────────────────────────────
export interface SectionHeaderProps {
  title: string;
  onMore?: () => void;
  className?: string;
}
export const SectionHeader = ({
  title,
  onMore,
  className = '',
}: SectionHeaderProps) => (
  <div className={`flex items-center justify-between ${className}`}>
    <h2 className="text-base font-bold text-gray-900">{title}</h2>
    {onMore && (
      <button
        type="button"
        onClick={onMore}
        className="text-sm text-gray-400 hover:text-gray-600 transition-colors tracking-widest"
        aria-label="See more"
      >
        •••
      </button>
    )}
  </div>
);

// HeroOrderCard ───────────────────────────────────────────────────────────────
export interface HeroOrderCardProps {
  image?: string;
  name: string;
  restaurant: string;
  price: number;
  deliveryMinutes?: number;
  isFreeDelivery?: boolean;
  onOrderTrack?: () => void;
  agentId?: string;
  className?: string;
}
export const HeroOrderCard = ({
  image,
  name,
  restaurant,
  price,
  deliveryMinutes = 15,
  isFreeDelivery = true,
  onOrderTrack,
  agentId,
  className = '',
}: HeroOrderCardProps) => (
  <div
    className={`relative overflow-hidden rounded-3xl bg-green-500 p-4 text-white shadow-lg ${className}`}
    data-agent-id={agentId}
  >
    <div className="flex items-center gap-3">
      {image && (
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="truncate font-bold text-base">{name}</p>
        <p className="truncate text-xs text-green-100">{restaurant}</p>
        <div className="mt-1.5 flex items-center gap-3">
          <DeliveryInfo minutes={deliveryMinutes} className="text-green-100" />
          {isFreeDelivery && <FreeDeliveryBadge className="text-green-100" />}
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-xl font-bold">${price}</p>
      </div>
    </div>
    {onOrderTrack && (
      <button
        type="button"
        onClick={onOrderTrack}
        className="ml-auto mt-3 flex w-fit items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
      >
        <ShoppingBag className="h-4 w-4" />
        Order Track
      </button>
    )}
  </div>
);

// FoodCard (menu item card) ────────────────────────────────────────────────────
export interface FoodCardProps extends AgenticBaseProps {
  image?: string;
  name: string;
  rating: number;
  reviewCount?: string;
  deliveryMinutes?: number;
  deliveryFeeText?: string;
  price: number;
  isInCart?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onAddToCart?: () => void;
  onClick?: () => void;
}
export const FoodCard = forwardRef<HTMLDivElement, FoodCardProps>(
  (
    {
      image,
      name,
      rating,
      reviewCount,
      deliveryMinutes = 15,
      deliveryFeeText = '$0 Delivery fee over $30',
      price,
      isInCart = false,
      isFavorite = false,
      onFavoriteToggle,
      onAddToCart,
      onClick,
      agentId,
      agentContext,
      onAgentMutate,
      className = '',
    },
    ref
  ) => (
    <div
      ref={ref}
      className={`overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer ${className}`}
      onClick={onClick}
      data-agent-id={agentId}
      data-agent-context={agentContext ? JSON.stringify(agentContext) : undefined}
    >
      <div className="relative">
        {image ? (
          <img src={image} alt={name} className="h-32 w-full object-cover" />
        ) : (
          <div className="h-32 w-full bg-gray-100 flex items-center justify-center">
            <UtensilsCrossed className="h-8 w-8 text-gray-300" />
          </div>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle?.();
          }}
          className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          />
        </button>
        <div className="absolute bottom-2 left-2 rounded-full bg-white/90 backdrop-blur-sm px-2 py-0.5">
          <DeliveryInfo minutes={deliveryMinutes} />
        </div>
      </div>
      <div className="p-3">
        <p className="truncate font-semibold text-sm text-gray-900">{name}</p>
        <StarRating rating={rating} reviewCount={reviewCount} className="mt-1" />
        <p className="mt-1 text-xs text-gray-500">{deliveryFeeText}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
            ${price.toFixed(2)}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onAgentMutate && agentContext) {
                onAgentMutate({ ...agentContext, action: 'add_to_cart', item: name });
              }
              onAddToCart?.();
            }}
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
              isInCart
                ? 'bg-green-500 text-white'
                : 'border-2 border-gray-200 text-gray-400 hover:border-green-500 hover:text-green-500'
            }`}
            aria-label={isInCart ? 'In cart' : 'Add to cart'}
          >
            {isInCart ? (
              <Check className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
);
FoodCard.displayName = 'FoodCard';

// StaffPickCard ───────────────────────────────────────────────────────────────
export interface StaffPickCardProps {
  image?: string;
  name: string;
  rating: number;
  price: number;
  deliveryMinutes?: number;
  onClick?: () => void;
  className?: string;
}
export const StaffPickCard = ({
  image,
  name,
  rating,
  price,
  deliveryMinutes = 15,
  onClick,
  className = '',
}: StaffPickCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`overflow-hidden rounded-2xl bg-white shadow-sm text-left transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
  >
    <div className="relative">
      {image ? (
        <img src={image} alt={name} className="h-36 w-full object-cover" />
      ) : (
        <div className="h-36 w-full bg-gray-100 flex items-center justify-center">
          <UtensilsCrossed className="h-8 w-8 text-gray-300" />
        </div>
      )}
      <div className="absolute bottom-2 left-2 rounded-full bg-white/90 backdrop-blur-sm px-2 py-0.5">
        <DeliveryInfo minutes={deliveryMinutes} />
      </div>
    </div>
    <div className="p-3">
      <p className="truncate font-semibold text-sm text-gray-900">{name}</p>
      <div className="mt-1 flex items-center justify-between">
        <StarRating rating={rating} />
        <span className="text-sm font-bold text-gray-900">${price.toFixed(2)}</span>
      </div>
    </div>
  </button>
);

// CartBar ─────────────────────────────────────────────────────────────────────
export interface CartBarProps {
  itemCount: number;
  totalPrice: number;
  onView?: () => void;
  agentId?: string;
  className?: string;
}
export const CartBar = ({
  itemCount,
  totalPrice,
  onView,
  agentId,
  className = '',
}: CartBarProps) => (
  <button
    type="button"
    onClick={onView}
    data-agent-id={agentId}
    className={`flex w-full items-center justify-between rounded-2xl bg-green-500 px-4 py-3 shadow-lg transition-opacity hover:opacity-95 active:scale-[0.99] ${className}`}
  >
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-white">View your cart</span>
      <span className="flex min-w-[1.25rem] items-center justify-center rounded-full bg-white/25 px-1.5 py-0.5 text-xs font-bold text-white">
        {itemCount}x
      </span>
    </div>
    <span className="font-bold text-white">${totalPrice.toFixed(2)}</span>
  </button>
);

// StatBadge ───────────────────────────────────────────────────────────────────
export interface StatBadgeProps {
  label: string;
  value: string;
  className?: string;
}
export const StatBadge = ({ label, value, className = '' }: StatBadgeProps) => (
  <div className={`flex flex-col items-center gap-0.5 ${className}`}>
    <span className="font-semibold text-sm text-gray-900">{value}</span>
    <span className="text-xs text-gray-500">{label}</span>
  </div>
);

// StatRow (restaurant stats) ──────────────────────────────────────────────────
export interface StatRowProps {
  priceRange?: string;
  satisfactionPercent?: number;
  deliveryMinutes?: number;
  className?: string;
}
export const StatRow = ({
  priceRange = '$10 - $100',
  satisfactionPercent = 95,
  deliveryMinutes = 15,
  className = '',
}: StatRowProps) => (
  <div
    className={`flex divide-x divide-gray-200 rounded-2xl bg-gray-50 py-3 ${className}`}
  >
    <StatBadge value={priceRange} label="Price Range" className="flex-1" />
    <StatBadge
      value={`${satisfactionPercent}%`}
      label="Satisfaction"
      className="flex-1"
    />
    <StatBadge
      value={`${deliveryMinutes} min`}
      label="Time Delivery"
      className="flex-1"
    />
  </div>
);

// TabFilter ───────────────────────────────────────────────────────────────────
export interface TabFilterItem {
  label: string;
  icon?: React.ReactNode;
}
export interface TabFilterProps {
  tabs: TabFilterItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}
export const TabFilter = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: TabFilterProps) => (
  <div className={`flex gap-1 overflow-x-auto pb-0.5 ${className}`}>
    {tabs.map(({ label, icon }) => (
      <button
        key={label}
        type="button"
        onClick={() => onTabChange(label)}
        className={`flex flex-shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
          activeTab === label
            ? 'border border-green-200 bg-green-50 text-green-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        {icon}
        {label}
      </button>
    ))}
  </div>
);

// ProductInfo ─────────────────────────────────────────────────────────────────
export interface ProductInfoProps {
  name: string;
  subtitle?: string;
  rating: number;
  reviewCount?: string | number;
  price: number;
  className?: string;
}
export const ProductInfo = ({
  name,
  subtitle,
  rating,
  reviewCount,
  price,
  className = '',
}: ProductInfoProps) => (
  <div className={className}>
    <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
    {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
    <StarRating
      rating={rating}
      reviewCount={reviewCount}
      size="md"
      className="mt-2"
    />
    <PriceTag price={price} size="lg" className="mt-3 block" />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ORGANISMS
// ─────────────────────────────────────────────────────────────────────────────

// AppHeader ───────────────────────────────────────────────────────────────────
export interface AppHeaderProps {
  avatarSrc?: string;
  deliveryAddress?: string;
  onAddressChange?: () => void;
  onCartPress?: () => void;
  cartItemCount?: number;
  agentId?: string;
  className?: string;
}
export const AppHeader = ({
  avatarSrc,
  deliveryAddress = 'Select Location',
  onAddressChange,
  onCartPress,
  cartItemCount = 0,
  agentId,
  className = '',
}: AppHeaderProps) => (
  <div
    className={`flex items-center gap-3 ${className}`}
    data-agent-id={agentId}
  >
    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm">
      {avatarSrc ? (
        <img src={avatarSrc} alt="User avatar" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-green-100">
          <User className="h-5 w-5 text-green-600" />
        </div>
      )}
    </div>
    <button
      type="button"
      onClick={onAddressChange}
      className="flex flex-1 flex-col items-center"
    >
      <span className="text-xs text-gray-500">Delivery To</span>
      <div className="flex items-center gap-1">
        <span className="max-w-[140px] truncate text-sm font-semibold text-gray-900">
          {deliveryAddress}
        </span>
        <ChevronDown className="h-3.5 w-3.5 flex-shrink-0 text-green-500" />
      </div>
    </button>
    <button
      type="button"
      onClick={onCartPress}
      className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm"
      aria-label={`Cart ${cartItemCount > 0 ? `(${cartItemCount} items)` : ''}`}
    >
      <ShoppingBag className="h-5 w-5 text-gray-700" />
      {cartItemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white">
          {cartItemCount}
        </span>
      )}
    </button>
  </div>
);

// BottomNavBar ────────────────────────────────────────────────────────────────
export type NavItemId = 'home' | 'offers' | 'notifications' | 'profile';

interface NavItem {
  id: NavItemId;
  label: string;
  icon: React.ReactNode;
}

export interface BottomNavBarProps {
  activeItem?: NavItemId;
  onNavigate?: (id: NavItemId) => void;
  agentId?: string;
  className?: string;
}
export const BottomNavBar = ({
  activeItem = 'home',
  onNavigate,
  agentId,
  className = '',
}: BottomNavBarProps) => {
  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { id: 'offers', label: 'Offers', icon: <Tag className="h-5 w-5" /> },
    {
      id: 'notifications',
      label: 'Notification',
      icon: <Bell className="h-5 w-5" />,
    },
    { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
  ];

  return (
    <nav
      className={`flex items-center border-t border-gray-100 bg-white/80 px-2 backdrop-blur-sm ${className}`}
      data-agent-id={agentId}
    >
      {navItems.map(({ id, label, icon }) => {
        const isActive = activeItem === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate?.(id)}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2 transition-colors ${
              isActive ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
            }`}
            data-nav-id={id}
            aria-current={isActive ? 'page' : undefined}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                isActive ? 'bg-green-100' : ''
              }`}
            >
              {icon}
            </div>
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

// ProductDetailHeader ─────────────────────────────────────────────────────────
export interface ProductDetailHeaderProps {
  restaurantLogo?: string;
  restaurantName: string;
  restaurantLabel?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onShare?: () => void;
  onClose?: () => void;
  agentId?: string;
  className?: string;
}
export const ProductDetailHeader = ({
  restaurantLogo,
  restaurantName,
  restaurantLabel = 'Food Store',
  isFavorite = false,
  onFavoriteToggle,
  onShare,
  onClose,
  agentId,
  className = '',
}: ProductDetailHeaderProps) => (
  <div
    className={`flex items-center gap-3 ${className}`}
    data-agent-id={agentId}
  >
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm">
      {restaurantLogo ? (
        <img
          src={restaurantLogo}
          alt={restaurantName}
          className="h-full w-full object-contain p-1"
        />
      ) : (
        <div className="h-full w-full rounded-xl bg-blue-600" />
      )}
    </div>
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-semibold text-gray-900">{restaurantName}</p>
      <p className="text-xs text-gray-500">{restaurantLabel}</p>
    </div>
    <div className="flex flex-shrink-0 items-center gap-2">
      {[
        {
          label: isFavorite ? 'Unlike' : 'Like',
          onClick: onFavoriteToggle,
          icon: (
            <Heart
              className={`h-4 w-4 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          ),
        },
        { label: 'Share', onClick: onShare, icon: <Share2 className="h-4 w-4 text-gray-600" /> },
        { label: 'Close', onClick: onClose, icon: <X className="h-4 w-4 text-gray-600" /> },
      ].map(({ label, onClick, icon }) => (
        <button
          key={label}
          type="button"
          onClick={onClick}
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
        >
          {icon}
        </button>
      ))}
    </div>
  </div>
);

// RestaurantProfileHeader ─────────────────────────────────────────────────────
export interface RestaurantProfileHeaderProps {
  heroImage?: string;
  logo?: string;
  name: string;
  isVerified?: boolean;
  isTrusted?: boolean;
  rating: number;
  reviewCount?: string;
  priceRange?: string;
  satisfactionPercent?: number;
  deliveryMinutes?: number;
  onBack?: () => void;
  onShare?: () => void;
  onMessage?: () => void;
  onCall?: () => void;
  agentId?: string;
  className?: string;
}
export const RestaurantProfileHeader = ({
  heroImage,
  logo,
  name,
  isVerified = false,
  isTrusted = false,
  rating,
  reviewCount,
  priceRange = '$10 - $100',
  satisfactionPercent = 95,
  deliveryMinutes = 15,
  onBack,
  onShare,
  onMessage,
  onCall,
  agentId,
  className = '',
}: RestaurantProfileHeaderProps) => (
  <div className={className} data-agent-id={agentId}>
    {/* Hero image */}
    <div className="relative h-44 overflow-hidden rounded-3xl bg-gray-200">
      {heroImage && (
        <img src={heroImage} alt={name} className="h-full w-full object-cover" />
      )}
      <div className="absolute inset-x-0 top-0 flex items-center gap-3 p-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm"
        >
          <ArrowLeft className="h-4 w-4 text-gray-700" />
        </button>
        <div className="flex flex-1 items-center gap-2 rounded-full bg-white/80 px-3 py-2 backdrop-blur-sm">
          <Search className="h-3.5 w-3.5 flex-shrink-0 text-gray-500" />
          <span className="text-sm text-gray-500">Search {name}</span>
        </div>
        <button
          type="button"
          onClick={onShare}
          aria-label="Share"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm"
        >
          <Share2 className="h-4 w-4 text-gray-700" />
        </button>
      </div>
    </div>

    {/* Profile block */}
    <div className="mt-4 px-1">
      <div className="flex items-start justify-between">
        <div className="-mt-8 h-16 w-16 overflow-hidden rounded-2xl border-2 border-white bg-white shadow-md">
          {logo ? (
            <img
              src={logo}
              alt={name}
              className="h-full w-full object-contain p-1"
            />
          ) : (
            <div className="h-full w-full rounded-xl bg-blue-600" />
          )}
        </div>
        {isTrusted && <TrustedBadge />}
      </div>

      <div className="mt-3 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-bold text-gray-900">{name}</h1>
            {isVerified && <VerifiedBadge />}
          </div>
          <StarRating
            rating={rating}
            reviewCount={reviewCount}
            size="md"
            className="mt-0.5"
          />
        </div>
        <div className="flex gap-2">
          {[
            { label: 'Message', onClick: onMessage, icon: <MessageCircle className="h-4 w-4 text-gray-600" /> },
            { label: 'Call', onClick: onCall, icon: <Phone className="h-4 w-4 text-gray-600" /> },
          ].map(({ label, onClick, icon }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <StatRow
        priceRange={priceRange}
        satisfactionPercent={satisfactionPercent}
        deliveryMinutes={deliveryMinutes}
        className="mt-4"
      />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// AGENTIC WRAPPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * AgentStatusBanner
 * Displayed when an AI agent is actively processing a task in the UI.
 */
export interface AgentStatusBannerProps {
  status: 'thinking' | 'success' | 'error' | 'idle';
  message?: string;
  className?: string;
}
export const AgentStatusBanner = ({
  status,
  message,
  className = '',
}: AgentStatusBannerProps) => {
  if (status === 'idle') return null;

  const config = {
    thinking: {
      bg: 'bg-gradient-to-r from-green-500 via-green-400 to-green-500 animate-pulse',
      icon: <DotLoader />,
      defaultMsg: 'Agent is thinking…',
    },
    success: {
      bg: 'bg-green-500',
      icon: <CheckCircle className="h-4 w-4 text-white" />,
      defaultMsg: 'Done!',
    },
    error: {
      bg: 'bg-red-500',
      icon: <AlertCircle className="h-4 w-4 text-white" />,
      defaultMsg: 'Agent encountered an error.',
    },
  };

  const { bg, icon, defaultMsg } = config[status];

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 text-white shadow ${bg} ${className}`}
      role="status"
      aria-live="polite"
    >
      {icon}
      <p className="text-sm font-medium">{message ?? defaultMsg}</p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// RE-EXPORTS (convenience — consumers can import everything from one place)
// ─────────────────────────────────────────────────────────────────────────────
export { default as FoodAppButton } from './FoodAppButton';
export type { FoodAppButtonProps, FoodAppButtonVariant } from './FoodAppButton';

export { default as CategoryPill } from './CategoryPill';
export type { CategoryPillProps } from './CategoryPill';

export { default as ToppingSelector } from './ToppingSelector';
export type { ToppingSelectorProps } from './ToppingSelector';

export { default as OrderButton } from './OrderButton';
export type { OrderButtonProps } from './OrderButton';
