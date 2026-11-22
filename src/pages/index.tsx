import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { seo } from '../seo'

export default function Landing() {
  return (
    <>
      <Seo {...seo} path="/" />
      <main data-testid="static-landing" className="min-h-screen overflow-hidden bg-[#b7ecff] text-[#17324d]">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6 sm:px-10">
          <header className="flex items-center justify-between rounded-2xl bg-white/85 px-5 py-4 shadow-sm backdrop-blur">
            <span className="font-display text-2xl font-extrabold tracking-tight">TinyTable</span>
            <Link to="/home" className="rounded-xl bg-[#ff9f1c] px-5 py-2.5 font-bold shadow-[0_4px_0_#d87800] hover:brightness-105">
              Open planner
            </Link>
          </header>
          <section className="grid flex-1 items-center gap-10 py-16 md:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-white/75 px-4 py-2 text-sm font-bold">A little help for busy teachers</p>
              <h1 className="font-display max-w-2xl text-5xl font-extrabold leading-[1.04] sm:text-7xl">
                An activity that fits your table, your kids, and your supplies.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#405b77]">
                Choose a theme, age, group size, and what you have on hand. Get clear steps, setup and cleanup tips, and a printable activity card.
              </p>
              <Link to="/home" className="mt-8 inline-flex rounded-xl bg-[#ff9f1c] px-7 py-4 text-lg font-extrabold shadow-[0_5px_0_#d87800] transition-transform hover:-translate-y-0.5">
                Plan an activity
              </Link>
            </div>
            <div className="rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-xl sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[.15em] text-[#55718b]">Your activity card</p>
              <h2 className="font-display mt-3 text-3xl font-extrabold">Watermelon Dot Art</h2>
              <div className="mt-5 flex flex-wrap gap-2 text-sm font-bold">
                <span className="rounded-full bg-[#ffe7a5] px-3 py-1.5">Age 3</span>
                <span className="rounded-full bg-[#d9f5e5] px-3 py-1.5">15 minutes</span>
                <span className="rounded-full bg-[#d9efff] px-3 py-1.5">Crayons + paper</span>
              </div>
              <ol className="mt-6 space-y-3 text-[#405b77]">
                <li><b className="mr-2 text-[#17324d]">1.</b>Draw a big watermelon slice.</li>
                <li><b className="mr-2 text-[#17324d]">2.</b>Use crayons to add red dots.</li>
                <li><b className="mr-2 text-[#17324d]">3.</b>Add green stripes for the rind.</li>
              </ol>
              <p className="mt-6 rounded-xl bg-[#fff6d6] p-4 text-sm text-[#5d512e]">Print the card or save it to your account to use again.</p>
            </div>
          </section>
          <footer className="pb-2 text-sm text-[#55718b]">Built for quick, practical classroom planning.</footer>
        </div>
      </main>
    </>
  )
}
