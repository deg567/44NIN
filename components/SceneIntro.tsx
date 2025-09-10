"use client"

import StickySection from './StickySection'
import ScrollSequence from './ScrollSequence'

const FRAMES = [
  'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517960413843-0aee8e9fd1db?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517960413843-0aee8e9fd1db?q=80&w=2000&auto=format&fit=crop',
]

export default function SceneIntro() {
  return (
    <StickySection id="intro" height={250} topOffset={56} render={(p) => (
      <div className="relative h-[calc(100vh-56px)] bg-black">
        <ScrollSequence frames={FRAMES} progress={p} />
        <div className="relative z-10 h-full flex items-center">
          <div className="container">
            <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white">
              도시를 가르는 속도.
            </h2>
            <p className="mt-4 max-w-2xl text-neutral-200 text-lg">
              삼성역을 베이스로 한 러닝—스케줄과 코스를 시네마틱하게.
            </p>
          </div>
        </div>
      </div>
    )} />
  )
}

