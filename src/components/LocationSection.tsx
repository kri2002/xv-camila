'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Stars } from '@/components/stars'
import { Button } from '@/components/ui/button'

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-midnight-light text-silver-400 font-serif">
      Cargando mapa...
    </div>
  )
})

export function LocationSection() {
  const googleMapsLink = "https://goo.gl/maps/example" 

  return (
    <section className="relative w-full overflow-hidden px-6 py-24 text-center">
      
      {/* Fondos */}
      <div className="bg-midnight from-midnight-light/40 via-midnight to-midnight absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))]" />
      <div className="absolute inset-0 z-0 opacity-70">
        <Stars />
      </div>

      <div className="relative z-10 container mx-auto flex max-w-4xl flex-col items-center">
        
        {/* Títulos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-silver-gradient drop-shadow-lg mb-4">
            Ceremonia Religiosa
          </h2>
          <p className="text-silver-300 font-serif italic text-2xl">
            Guadalajara, Jalisco, México
          </p>
        </motion.div>

        {/* Mapa */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative p-1 rounded-lg w-full h-[400px] md:h-[500px] shadow-2xl shadow-black/60"
          style={{
            background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 20%, #94a3b8 45%, #475569 50%, #94a3b8 55%, #cbd5e1 80%, #f8fafc 100%)',
          }}
        >
          <div className="w-full h-full rounded-lg overflow-hidden border border-black/20 relative">
            <Map />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-1000" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 z-10"
        >
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-silver-ingot px-10 py-6 text-lg font-bold tracking-widest uppercase text-midnight hover:scale-105 transition-transform"
            >
              <span className="text-metal-pressed">
                Ver ubicación
              </span>
            </Button>
          </a>
        </motion.div>

      </div>
    </section>
  )
}