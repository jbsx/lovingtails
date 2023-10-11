export default function Admin() {
  return (
    <div className="flex flex-wrap justify-center my-5 gap-[40px]">
      <div className="flex flex-col items-center border-2 border-[var(--accent-clr2)]">
        <h2 className="text-xl uppercase">Products</h2>
        <div className="flex flex-wrap justify-center p-3 gap-[10px]">
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
      </div>
      <div className="flex flex-col items-center border-2 border-[var(--accent-clr2)]">
        <h2 className="text-xl uppercase">Admin</h2>
        <div className="flex flex-wrap justify-center p-3 gap-[10px]">
          <a
            href={"/api/auth/signout"}
            className="px-8 py-2 border-2 border-[var(--accent-clr2)] hover:bg-[var(--accent-clr2)] hover:text-white"
          >
            Sign Out
          </a>
          <a
            href={"/admin/updateAdmins"}
            className="px-8 py-2 border-2 border-[var(--accent-clr2)] hover:bg-[var(--accent-clr2)] hover:text-white"
          >
            Update Admin List
          </a>
        </div>
      </div>
    </div>
  );
}
