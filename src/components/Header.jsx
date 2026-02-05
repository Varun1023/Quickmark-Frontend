export default function Header({ title, subtitle }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-slate-500 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}
