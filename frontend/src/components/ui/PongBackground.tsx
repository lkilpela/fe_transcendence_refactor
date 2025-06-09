import { layouts } from '@/assets/design-system'
import { cn } from '@/utils/cn'

const PongBackground = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className={cn(layouts.pong.container, 'overflow-hidden opacity-30')}
    >
      <source src="/docs/pong-background.webm" type="video/webm" />
      <source src="/docs/pong-background.mp4" type="video/mp4" />
      <p className="text-white/20">Pong background not supported</p>
    </video>
  )
}

export default PongBackground
