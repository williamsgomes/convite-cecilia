export default function ConfirmacoesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-neutral-100 font-[system-ui,sans-serif] text-neutral-900">
      {children}
    </div>
  );
}
