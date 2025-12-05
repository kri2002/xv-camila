'use client'

import { motion, Variants } from 'framer-motion'
import { Church, Wine, Music, PartyPopper, CalendarClock } from 'lucide-react'
import { Stars } from '@/components/stars'

const events = [
  {
    id: 1,
    time: "04:00 PM",
    title: "Ceremonia Religiosa",
    icon: Church,
  },
  {
    id: 2,
    time: "05:00 PM",
    title: "Recepción",
    icon: CalendarClock,
  },
  {
    id: 3,
    time: "06:00 PM",
    title: "Brindis",
    icon: Wine,
  },
  {
    id: 4,
    time: "07:00 PM",
    title: "Vals",
    icon: Music,
  },
  {
    id: 5,
    time: "08:00 PM",
    title: "Fiesta",
    icon: PartyPopper,
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" } 
  },
}

const lineVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: { 
    scaleY: 1, 
    opacity: 1, 
    transition: { duration: 0.5, ease: "easeInOut" } 
  }
}

export function Itinerary() {
  return (
    <section className="relative w-full overflow-hidden px-6 py-24 text-center">
      
      <div className="bg-midnight from-midnight-light/40 via-midnight to-midnight absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))]" />
      <div className="absolute inset-0 z-0 opacity-70">
        <Stars />
      </div>
      <div className="via-silver-300/10 absolute top-0 left-1/2 z-10 h-px w-1/3 -translate-x-1/2 bg-linear-to-r from-transparent to-transparent" />

      <div className="relative z-10 container mx-auto max-w-2xl flex flex-col items-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 font-serif text-5xl md:text-6xl text-silver-gradient drop-shadow-lg"
        >
          Itinerario
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="flex flex-col items-center w-full"
        >
          {events.map((event, index) => {
            const isLast = index === events.length - 1
            const Icon = event.icon

            return (
              <div key={event.id} className="flex flex-col items-center w-full">
                
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-silver-400/20 blur-lg rounded-full group-hover:bg-silver-400/30 transition-all duration-500" />
                    <div className="relative bg-midnight border border-silver-400/30 p-4 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                      <Icon strokeWidth={1} className="w-8 h-8 text-silver-200" />
                    </div>
                  </div>

                  <div className="flex flex-col items-center mt-2">
                    <span className="font-serif text-2xl font-bold text-white tracking-wider drop-shadow-md">
                      {event.time}
                    </span>
                    <span className="font-serif text-xl italic text-silver-300">
                      {event.title}
                    </span>
                  </div>
                </motion.div>

                {!isLast && (
                  <motion.div 
                    variants={lineVariants} 
                    className="from-silver-300/50 via-silver-300/20 to-transparent mx-auto my-4 h-16 w-px origin-top bg-linear-to-b" 
                  />
                )}
              </div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}