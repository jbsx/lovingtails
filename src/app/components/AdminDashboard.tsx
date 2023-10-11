import { useRouter } from "next/navigation";
import { MdHome } from "react-icons/md";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push("/admin");
      }}
      className="flex items-center gap-2 cursor-pointer text-[var(--accent-clr2)] w-fit hover:bg-[var(--accent-clr2)]
                 hover:text-white p-2 uppercase text-lg font-semibold border-[3px] border-[var(--accent-clr2)]
                 outline-none"
    >
      <MdHome />
      Admin Dashboard
    </button>
  );
}
