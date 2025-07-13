export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#ff9ec6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading chat...</p>
      </div>
    </div>
  )
}
