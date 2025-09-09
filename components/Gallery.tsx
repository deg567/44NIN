import gallery from '@/content/gallery.json'

type Photo = {
  src: string
  alt: string
  eventId?: string
  tags?: string[]
}

export default function Gallery() {
  const items = gallery as Photo[]
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {items.map((p, i) => (
        <figure key={`${p.src}-${i}`} className="aspect-square bg-neutral-100 flex items-center justify-center text-xs text-neutral-500">
          {/* 실제 이미지는 public/ 아래에 추가하면 됩니다. */}
          <span>{p.alt}</span>
        </figure>
      ))}
    </div>
  )
}

