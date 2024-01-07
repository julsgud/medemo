import Image from 'next/image'
import { IntroSvg } from './components/IntroSvg/IntroSvg'
import { Section } from './components/Section/Section'

export default function Home() {
  return (
    <main>
      <Section className='bg-gradient-to-b from-[rgb(var(--section-one-top-rgb))] to-[rgb(var(--section-one-bottom-rgb))]'>
        <div className=" flex justify-center align-center h-full">
          <IntroSvg className="w-[500px]" />
        </div>
      </Section>
    </main>
  )
}
