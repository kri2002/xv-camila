'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Users, Key, Ticket, X, Info } from 'lucide-react'
import { Stars } from '@/components/stars'
import { searchGuest, getTableById, TableData } from '@/data/tables'

export function AccessControl() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<{ name: string; tableId: number }[]>([])
  const [selectedResult, setSelectedResult] = useState<{ guestName: string; table: TableData } | null>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    if (value.length > 1) {
      const results = searchGuest(value)
      setSuggestions(results)
    } else {
      setSuggestions([])
    }
  }

  const handleSelect = (guestName: string, tableId: number) => {
    const tableData = getTableById(tableId)
    if (tableData) {
      setSelectedResult({ guestName, table: tableData })
      setQuery('')
      setSuggestions([])
    }
  }

  const handleReset = () => {
    setSelectedResult(null)
    setQuery('')
  }

  return (
    <section id="acceso" className="relative w-full min-h-[800px] overflow-hidden px-4 py-24 text-center flex flex-col items-center justify-center">
      
      <div className="bg-midnight from-midnight-light/40 via-midnight to-midnight absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))]" />
      <div className="absolute inset-0 z-0 opacity-70">
        <Stars />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-silver-gradient drop-shadow-lg mb-4 pb-2">
            Tu Acceso y Lugar
          </h2>
          <p className="text-silver-300 font-serif italic text-lg">
            Busca tu nombre para obtener tu pase de entrada
          </p>
        </motion.div>

        {/* --- BUSCADOR --- */}
        {!selectedResult && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md mx-auto"
          >
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-silver-400 group-focus-within:text-white transition-colors">
                <Search size={20} />
              </div>
              
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Escribe tu nombre completo..."
                className="w-full bg-midnight-light/50 border border-silver-400/30 text-white placeholder-silver-400/50 rounded-full py-4 pl-12 pr-6 outline-none focus:border-silver-200 focus:bg-midnight-light/80 transition-all font-serif tracking-wide shadow-lg shadow-black/20"
              />

              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-midnight border border-silver-400/20 rounded-xl overflow-hidden shadow-2xl z-50 max-h-60 overflow-y-auto custom-scrollbar"
                  >
                    {suggestions.map((s, i) => (
                      <li 
                        key={i}
                        onClick={() => handleSelect(s.name, s.tableId)}
                        className="px-6 py-3 text-left text-silver-200 hover:bg-silver-400/10 hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-0 font-sans"
                      >
                        {s.name}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col items-center gap-3 opacity-90"
            >
              <div className="flex items-center gap-2 text-silver-400 text-xs uppercase tracking-widest font-bold border-b border-silver-400/20 pb-1">
                <Info size={14} />
                <span>Importante</span>
              </div>
              
              <p className="text-silver-300 text-sm font-light max-w-xs leading-relaxed">
                Al encontrar tu lugar, toma una <strong className="text-white font-medium">captura de pantalla</strong> de tu ticket o memoriza tu <strong className="text-white font-medium">palabra clave</strong> para agilizar tu acceso en la entrada.
              </p>
            </motion.div>

          </motion.div>
        )}

        {/* --- TARJETA DE RESULTADO (TICKET) --- */}
        <AnimatePresence>
          {selectedResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="w-full max-w-lg mx-auto mt-4"
            >
              <div 
                className="relative rounded-lg p-1 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                style={{
                  background: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 45%, #f8fafc 100%)',
                }}
              >
                <div className="bg-midnight rounded-lg p-8 md:p-10 relative overflow-hidden border border-black/20">
                  
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Ticket size={150} className="text-white" />
                  </div>

                  <button 
                    onClick={handleReset}
                    className="absolute top-4 right-4 text-silver-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>

                  <div className="text-left mb-8 relative z-10">
                    <span className="text-xs font-bold text-silver-400 uppercase tracking-widest block mb-1">
                      Invitado
                    </span>
                    
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-silver-gradient pb-4 leading-relaxed">
                      {selectedResult.guestName}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
                    <div className="bg-silver-400/5 rounded-lg p-4 border border-silver-400/10 flex flex-col items-center justify-center text-center">
                      <span className="text-xs font-bold text-silver-400 uppercase tracking-widest mb-2">
                        Mesa Asignada
                      </span>
                      <span className="text-5xl font-serif text-white font-bold drop-shadow-md">
                        {selectedResult.table.id}
                      </span>
                    </div>

                    <div className="bg-silver-ingot rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-lg">
                      <div className="flex items-center gap-2 mb-2 opacity-70">
                        <Key size={14} className="text-midnight" />
                        <span className="text-xs font-bold text-midnight uppercase tracking-widest">
                          Acceso
                        </span>
                      </div>
                      <span className="text-xl md:text-2xl font-sans font-black text-midnight tracking-wider uppercase">
                        {selectedResult.table.keyword}
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4 border-b border-silver-400/20 pb-2">
                      <Users size={16} className="text-silver-300" />
                      <span className="text-sm font-bold text-silver-300 uppercase tracking-widest">
                        Tus Acompañantes
                      </span>
                    </div>
                    
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
                      {selectedResult.table.guests
                        .filter(name => name !== selectedResult.guestName)
                        .map((companion, idx) => (
                          <li key={idx} className="text-silver-400 text-sm font-light flex items-start gap-2">
                            <span className="text-silver-500 mt-1">•</span>
                            {companion}
                          </li>
                        ))
                      }
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-dashed border-silver-400/30 text-center">
                    <p className="text-xs text-silver-500 uppercase tracking-widest">
                      Presenta esta palabra clave en la entrada
                    </p>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}