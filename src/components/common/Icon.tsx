import {
  Award,
  Boxes,
  Crosshair,
  Gem,
  Gift,
  HeartHandshake,
  Layers,
  PenTool,
  Printer,
  ScanLine,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '../../utils/cn'

const icons: Record<string, LucideIcon> = {
  award: Award,
  boxes: Boxes,
  crosshair: Crosshair,
  gem: Gem,
  gift: Gift,
  'heart-handshake': HeartHandshake,
  layers: Layers,
  'pen-tool': PenTool,
  printer: Printer,
  'scan-line': ScanLine,
  sparkles: Sparkles,
}

type IconProps = {
  name: string
  size?: number
  className?: string
}

export function Icon({ name, size = 20, className }: IconProps) {
  const Component = icons[name] ?? Sparkles
  return <Component size={size} className={cn('shrink-0', className)} aria-hidden="true" />
}
