import { Hero } from '@/components/hero'
import { Countdown } from '@/components/Countdown'
import { QuoteSection } from '@/components/QuoteSection'
import { Itinerary } from '@/components/Itinerary'
import { Gallery } from '@/components/Gallery'
import { LocationSection } from '@/components/LocationSection'
import { AccessControl } from '@/components/AccessControl'

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      <QuoteSection />
      <Itinerary />
      <Gallery />
      <LocationSection />
      <AccessControl/>
    </main>
  )
}
