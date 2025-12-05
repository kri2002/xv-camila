'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const TwinklingStar = () => {
  const [mounted, setMounted] = useState(false)
  const [cycle, setCycle] = useState(0)
  const [config, setConfig] = useState({
    top: 0,
    left: 0,
    size: 2,
    duration: 3,
    delay: 0
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfig({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5
      })
      setMounted(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  const handleAnimationComplete = () => {
    setConfig({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2 
    })
    setCycle(prev => prev + 1) 
  }

  if (!mounted) return null

  return (
    <motion.div
      key={`star-${cycle}`} 
      className="absolute bg-white rounded-full"
      style={{
        top: `${config.top}%`,
        left: `${config.left}%`,
        width: `${config.size}px`,
        height: `${config.size}px`,
        boxShadow: `0 0 ${config.size + 2}px ${config.size / 2}px rgba(255, 255, 255, 0.5)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0.5, 1, 0],
        scale: [0, 1, 1.2, 1, 0],
      }}
      transition={{
        duration: config.duration,
        ease: "easeInOut",
        delay: config.delay,
      }}
      onAnimationComplete={handleAnimationComplete}
    />
  )
}

const ShootingStar = () => {
  const [key, setKey] = useState(0)
  const [coords, setCoords] = useState({ startX: 0, startY: 0, endX: 0, endY: 0, rotate: 45 })
  const [delay, setDelay] = useState(0)

  const prepareAnimation = (isInitial = false) => {
    const side = Math.random() > 0.5 ? 'top' : 'left'
    
    let startX, startY, endX, endY, rotate

    if (side === 'top') {
      startX = Math.random() * 100
      startY = -5
      endX = startX + 20 + Math.random() * 20
      endY = startY + 40 + Math.random() * 20
      rotate = 45
    } else {
      startX = -5
      startY = Math.random() * 50 
      endX = startX + 40 + Math.random() * 20
      endY = startY + 20 + Math.random() * 20
      rotate = 30
    }

    setCoords({ startX, startY, endX, endY, rotate })
    // Frecuencia aumentada: entre 1 y 4 segundos de espera
    setDelay(isInitial ? Math.random() * 2 : Math.random() * 3 + 1) 
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      prepareAnimation(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      key={`shooting-${key}`}
      className="absolute h-px bg-linear-to-r from-transparent via-white to-transparent"
      style={{
        top: `${coords.startY}%`,
        left: `${coords.startX}%`,
        width: '80px',
        rotate: `${coords.rotate}deg`,
        boxShadow: '0 0 10px 1px rgba(255, 255, 255, 0.4)'
      }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
      animate={{ 
        x: 400,
        y: 400, 
        opacity: [0, 1, 1, 0], 
        scale: [0.5, 1, 0.5] 
      }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        delay: delay,
      }}
      onAnimationComplete={() => {
        prepareAnimation(false)
        setKey(prev => prev + 1)
      }}
    />
  )
}

export function Stars() {
  const starsArray = Array.from({ length: 50 })

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {starsArray.map((_, i) => (
        <TwinklingStar key={i} />
      ))}
      
      <ShootingStar />
      <ShootingStar />
      <ShootingStar />
    </div>
  )
}