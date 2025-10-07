const COLORS = [
  'bg-rose-200',
  'bg-amber-200',
  'bg-emerald-200',
  'bg-sky-200',
  'bg-violet-200',
  'bg-pink-200',
  'bg-lime-200',
  'bg-cyan-200',
  'bg-indigo-200',
]

export function colorByRoom(roomNumber: string) {
  if (!roomNumber) return 'bg-gray-100'
  let hash = 0
  for (let i = 0; i < roomNumber.length; i++) {
    hash = (hash * 31 + roomNumber.charCodeAt(i)) >>> 0
  }
  const idx = hash % COLORS.length
  return COLORS[idx]
}


