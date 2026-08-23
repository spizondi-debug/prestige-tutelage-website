import { useInView, usePrefersReducedMotion } from '../lib/motion.js'

/**
 * Reveal — content rises and fades in once, on entry.
 *
 * The content is always in the DOM and always readable: this only animates
 * opacity and transform, so search engines, screen readers and anyone with
 * reduced motion get the finished state with nothing hidden.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const [ref, seen] = useInView()
  const reduced = usePrefersReducedMotion()
  const on = seen || reduced

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'none' : 'translateY(18px)',
        transition: reduced
          ? 'none'
          : `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  )
}
