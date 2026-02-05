export default function StatCard({ title, value }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      
      {/* Accent strip */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-purple-600" />

      {/* Content */}
      <div className="relative z-10">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-800">
          {value}
        </p>
      </div>

      {/* Hover glow */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-indigo-200/30 blur-3xl opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
}
