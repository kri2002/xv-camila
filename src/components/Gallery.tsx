'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { Stars } from '@/components/stars'

type Photo = {
  id: number
  src: string
  rotate: number
}

interface CardProps {
  photo: Photo
  isTop: boolean
  onRemove: (exitX: number) => void
  index: number
  total: number
  initialExitX?: number
}

const photos: Photo[] = [
  { id: 1, src: "/foto1.jpeg", rotate: -12 },
  { id: 2, src: "/foto.jpeg", rotate: 15 },
  { id: 3, src: "/foto1.jpeg", rotate: -8 },
  { id: 4, src: "/foto.jpeg", rotate: 10 },
  { id: 5, src: "/foto1.jpeg", rotate: -15 },
  { id: 6, src: "/foto.jpeg", rotate: 6 },
]

export function Gallery() {
  const [cards, setCards] = useState<Photo[]>(photos)
  const [exitPositions, setExitPositions] = useState<Record<number, number>>({})

  const removeCard = (id: number, exitX: number) => {
    setExitPositions((prev) => ({ ...prev, [id]: exitX }))
    setCards((prev) => prev.filter((card) => card.id !== id))
  }

  useEffect(() => {
    if (cards.length === 0) {
      const timer = setTimeout(() => {
        setCards(photos)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [cards])

  return (
    <section className="relative w-full overflow-hidden py-24 px-4 text-center min-h-[800px] flex flex-col items-center justify-center">
      
      <div className="bg-midnight from-midnight-light/40 via-midnight to-midnight absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))]" />
      <div className="absolute inset-0 z-0 opacity-70">
        <Stars />
      </div>
      
      <div className="relative z-10 mb-12">
        <h2 className="font-serif text-5xl md:text-6xl text-silver-gradient drop-shadow-lg mb-4">
          Galería
        </h2>
        <p className="text-silver-300 font-serif italic text-lg">
          Desliza las fotos para ver más
        </p>
      </div>

      <div className="relative z-10 w-full max-w-sm h-[500px] flex items-center justify-center">
        {cards.map((photo, index) => {
          const isTop = index === cards.length - 1
          
          return (
            <Card 
              key={photo.id} 
              photo={photo} 
              isTop={isTop} 
              onRemove={(exitX: number) => removeCard(photo.id, exitX)} 
              index={index}
              total={cards.length}
              initialExitX={exitPositions[photo.id]}
            />
          )
        })}
      </div>
    </section>
  )
}

function Card({ photo, isTop, onRemove, index, total, initialExitX }: CardProps) {
  const x = useMotionValue(0)
  
  const rotate = useTransform(x, [-200, 200], [photo.rotate - 15, photo.rotate + 15]) 
  const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const offset = info.offset.x
    if (Math.abs(offset) > 120) {
      const exitDirection = offset > 0 ? 1000 : -1000
      onRemove(exitDirection)
    }
  }
  const initialAnimation = initialExitX 
    ? { x: initialExitX, opacity: 0, scale: 1 }
    : { scale: 0.8, opacity: 0, x: 0 }

  return (
    <motion.div
      className="absolute top-0 cursor-grab active:cursor-grabbing"
      style={{
        zIndex: index,
        x: isTop ? x : 0,
        rotate: rotate, 
        opacity: isTop ? opacity : 1 - (total - 1 - index) * 0.1,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      
      initial={initialAnimation}
      
      animate={{ 
        scale: 1 - (total - 1 - index) * 0.05, 
        opacity: 1,
        y: (total - 1 - index) * 10,
        x: 0
      }}
      
      transition={{
        type: "spring", stiffness: 120, damping: 20
      }}
    >
      <div 
        className="relative p-3 rounded-lg shadow-2xl shadow-black/60 w-[300px] h-[420px] md:w-[350px] md:h-[480px]"
        style={{
          background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 20%, #94a3b8 45%, #475569 50%, #94a3b8 55%, #cbd5e1 80%, #f8fafc 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="w-full h-full bg-midnight-light overflow-hidden relative shadow-[inset_0_0_15px_rgba(0,0,0,0.6)] rounded-[2px] border border-black/20">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${photo.src})`,
              backgroundColor: '#1e293b' 
            }} 
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.div>
  )
}