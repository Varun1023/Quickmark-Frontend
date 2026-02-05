import Link from "next/link";

export default function ActionCard({
  title,
  description,
  href,
  primary = false,
}) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300
        ${
          primary
            ? "bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl"
            : "bg-white text-slate-800 border border-slate-200 shadow-sm hover:shadow-md"
        }`}
    >
      {/* Decorative glow for primary */}
      {primary && (
        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
      )}

      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="text-lg font-semibold tracking-tight">
          {title}
        </h3>

        <p
          className={`text-sm leading-relaxed ${
            primary ? "text-white/80" : "text-slate-500"
          }`}
        >
          {description}
        </p>

        {/* CTA hint */}
        <span
          className={`mt-4 inline-flex items-center gap-1 text-sm font-medium transition
            ${
              primary
                ? "text-white group-hover:translate-x-1"
                : "text-indigo-600 group-hover:translate-x-1"
            }`}
        >
          Continue →
        </span>
      </div>
    </Link>
  );
}
