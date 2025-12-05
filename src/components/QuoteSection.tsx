'use client'

import { useState, useEffect } from 'react' // Importamos useEffect
import { motion, Variants, AnimatePresence } from 'framer-motion'
import { Shirt, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Stars } from '@/components/stars'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
}

const lineVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: { 
    scaleY: 1, 
    opacity: 1, 
    transition: { duration: 0.6 } 
  }
}

export function QuoteSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // NUEVO: Efecto para bloquear el scroll cuando el modal se abre
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden' // Congela el scroll
    } else {
      document.body.style.overflow = 'unset' // Restaura el scroll
    }

    // Limpieza: Asegura que el scroll vuelva si el componente se desmonta
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  return (
    <section className="relative w-full overflow-hidden px-6 py-20 text-center md:py-32">
      <div className="bg-midnight from-midnight-light/40 via-midnight to-midnight absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))]" />
      <div className="absolute inset-0 z-0 opacity-70">
        <Stars />
      </div>
      <div className="via-silver-300/10 absolute top-0 left-1/2 z-10 h-px w-1/3 -translate-x-1/2 bg-linear-to-r from-transparent to-transparent" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} 
        className="relative z-10 container mx-auto flex max-w-4xl flex-col items-center"
      >
        
        <div className="mb-24 flex flex-col items-center w-full">
          <motion.div variants={itemVariants} className="text-silver-400 mb-6 font-serif text-6xl leading-none">
            &ldquo;
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-silver-100 font-serif text-xl leading-relaxed tracking-wide italic drop-shadow-md md:text-3xl"
          >
            &quot;Dicen que la misión de un padre es prestarle sus alas a su hija hasta que ella aprenda a volar. Hoy, al ver que extiendes las tuyas, confirmo con el corazón en la mano que el tiempo vuela irremediablemente, pero tú eres mi prueba viviente de que el amor eterno existe. Vuela alto, mi niña, sabiendo que aunque conquistes el cielo, yo me quedaré aquí, firme, siendo tu raíz y tu refugio para siempre.&quot;
          </motion.p>

          <motion.div 
            variants={lineVariants} 
            className="from-silver-300 mx-auto my-8 h-16 w-px origin-top bg-linear-to-b to-transparent" 
          />

          <motion.p
            variants={itemVariants}
            className="text-silver-400 font-serif text-lg font-bold tracking-widest uppercase md:text-xl"
          >
            - Papá de Jatziry
          </motion.p>
        </div>

        <div className="flex max-w-2xl flex-col items-center gap-4 w-full">
          
          <motion.div variants={itemVariants} className="bg-silver-400/5 border-silver-400/10 mb-2 rounded-full border p-4">
            <Shirt strokeWidth={1} className="text-silver-300 h-10 w-10" />
          </motion.div>

          <motion.h3 variants={itemVariants} className="text-silver-200 font-serif text-3xl italic md:text-4xl">
            Código de vestimenta:
          </motion.h3>

          <motion.div variants={itemVariants} className="my-4 mb-8 flex flex-col gap-4">
            <span className="font-serif text-3xl font-bold tracking-[0.15em] text-white uppercase drop-shadow-lg">
              Formal
            </span>

            <span className="text-silver-200/90 border-silver-400/30 bg-silver-400/5 rounded-r-lg border-l-2 px-4 py-4 font-sans text-base leading-relaxed italic md:text-lg">
              &quot;Por políticas estrictas del recinto, no se permitirá el acceso a personas con
              mezclilla, tenis, gorras o ropa casual. Agradecemos su apoyo para cumplir con el
              reglamento del lugar.&quot;
            </span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              size="lg"
              className="bg-silver-ingot text-midnight shadow-silver-400/20 px-8 py-6 text-base font-bold tracking-widest uppercase shadow-lg md:text-lg transition-transform hover:scale-105 active:scale-95"
              onClick={openModal} 
            >
              <span className="text-metal-pressed">Ver ejemplo de vestimenta</span>
            </Button>
          </motion.div>

        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[2px] p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-xl bg-midnight border-2 border-silver-400/50 overflow-hidden shadow-[0_0_25px_rgba(192,192,192,0.2)]"
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 z-10 rounded-full bg-midnight-light/80 p-2 text-silver-300 hover:bg-silver-400/20 hover:text-white transition-colors"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>

              <div className="p-1 bg-silver-400/10">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-midnight-light">
                   <Image
                    src="/dresscode.jpg"
                    alt="Ejemplo de código de vestimenta formal"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}