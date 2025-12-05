'use client'

import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { Stars } from '@/components/stars'

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  })

  useEffect(() => {
    const targetDate = new Date('2025-12-27T20:00:00').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
        horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutos: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        segundos: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const timeUnits = [
    { label: 'Días', value: timeLeft.dias },
    { label: 'Horas', value: timeLeft.horas },
    { label: 'Minutos', value: timeLeft.minutos },
    { label: 'Segundos', value: timeLeft.segundos },
  ]

  return (
    <section className="relative z-20 w-full">
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/foto.jpeg")' }}
        >
          <div className="from-midnight via-midnight/60 absolute inset-0 bg-linear-to-r to-transparent" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-silver-300 mb-2 font-serif text-2xl tracking-widest"
          >
            XV Años
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-7xl text-white drop-shadow-lg md:text-9xl"
          >
            Jatziry
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-silver-400 mt-4 flex flex-col gap-1"
          >
            <span className="text-xl tracking-widest">27 / 12 / 2025</span>
            <span className="text-lg italic">8:00 PM</span>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 w-full overflow-hidden py-12 md:py-16">
        <div className="bg-midnight from-midnight-light/40 via-midnight to-midnight absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))]" />

        <div className="absolute inset-0 z-0 opacity-70">
          <Stars />
        </div>

        <div className="via-silver-300/20 absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent to-transparent"></div>

        <div className="relative z-10 container mx-auto flex flex-wrap justify-center gap-6 px-4 md:gap-12">
          {timeUnits.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="bg-silver-ingot flex h-24 w-20 flex-col items-center justify-center rounded-sm border border-white/20 shadow-lg shadow-white/5 md:h-32 md:w-28">
                <span className="font-serif text-4xl font-bold text-[#0F172A] drop-shadow-sm md:text-6xl">
                  {item.value < 10 ? `0${item.value}` : item.value}
                </span>
              </div>

              <span className="text-silver-300 mt-4 text-xs font-bold tracking-[0.2em] uppercase md:text-sm">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
