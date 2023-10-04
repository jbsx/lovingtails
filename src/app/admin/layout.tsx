export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex justify-center my-5 gap-[10px]">
        <a
          href="/admin/add"
          className="px-8 py-2 border-2 border-[var(--accent-clr2)] hover:bg-[var(--accent-clr2)] hover:text-white"
        >
          Add
        </a>
        <a
          href="/admin/update"
          className="px-8 py-2 border-2 border-[var(--accent-clr2)] hover:bg-[var(--accent-clr2)] hover:text-white"
        >
          Update
        </a>
        <a
          href="/admin/delete"
          className="px-8 py-2 border-2 border-[var(--accent-clr2)] hover:bg-[var(--accent-clr2)] hover:text-white"
        >
          Delete
        </a>
      </div>
      {children}
    </div>
  );
}
