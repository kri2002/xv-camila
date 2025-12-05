'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Stars } from '@/components/stars'

export function Hero() {
  
  const scrollToAccess = () => {
    const section = document.getElementById('acceso')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center px-4">
      
      <div className="absolute inset-0 z-0 bg-midnight bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-midnight-light/40 via-midnight to-midnight" />
      
      <div className="absolute inset-0 z-0 opacity-70">
        <Stars />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-6 z-10"
      >
        <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-silver-400 uppercase">
          Estás invitado a los XV de
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        className="z-10 text-silver-gradient font-serif text-8xl md:text-[10rem] leading-tight drop-shadow-2xl pb-4"
      >
        Jatziry
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-6 flex flex-col items-center gap-4 z-10"
      >
        <div className="h-16 w-px bg-linear-to-b from-silver-300 to-transparent" />
        <p className="font-serif text-3xl italic text-silver-300">
          27 de Diciembre
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-16 z-10"
      >
        <Button
          size="lg"
          onClick={scrollToAccess}
          className="bg-silver-ingot px-10 py-6 text-lg font-bold tracking-widest uppercase text-midnight transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="text-metal-pressed">
             OBTENER MI ACCESO
          </span>
        </Button>
      </motion.div>
    </section>
  )
}