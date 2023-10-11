"use client";
import { z } from "zod";
import { adminsSchema } from "@/app/utils/zodTypes";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";
import AdminDashboard from "@/app/components/AdminDashboard";

export default function UpdateAdmins() {
  const [admins, setAdmins] = useState<z.infer<typeof adminsSchema>[] | null>(
    null,
  );
  const [selected, setSelected] = useState<z.infer<typeof adminsSchema>[]>([]);
  const [newAdmin, setNewAdmin] = useState("");

  useEffect(() => {
    fetch(process.env.URL + "/api/db/getAdmins").then((res) =>
      res.json().then((data) => {
        setAdmins(data.admins as z.infer<typeof adminsSchema>[]);
      }),
    );
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <AdminDashboard />
      {admins ? (
        <div className="flex flex-col gap-[10px] py-8">
          <h2 className="text-xl uppercase">Admins</h2>
          {admins.map((i, idx) => {
            return (
              <div
                key={i.email}
                className="flex gap-[10px] border-2 border-[var(--accent-clr2)] p-2 m-1"
              >
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelected([...selected, { email: i.email }]);
                    } else {
                      const temp = [...selected];
                      temp.splice(idx, 1);
                      setSelected(temp);
                    }
                  }}
                  className="w-[25px]"
                ></input>
                <div>{i.email}</div>
              </div>
            );
          })}
          {selected.length > 0 && (
            <button
              onClick={async () => {
                const res = await fetch(
                  process.env.URL + "/api/db/deleteAdmin",
                  {
                    method: "POST",
                    body: JSON.stringify({ data: selected }),
                  },
                ).then((res) => res.json());
                //TODO
                console.log(res);
              }}
              className="cursor-pointer text-[var(--accent-clr2)] w-fit hover:bg-[var(--accent-clr2)]
                    hover:text-white p-2 uppercase text-lg font-semibold border-[3px] border-[var(--accent-clr2)]
                    outline-none"
            >
              Delete Selected
            </button>
          )}
          <div className="flex gap-[10px]">
            <input
              name="newAdmin"
              type="text"
              className="min-h-[40px] rounded outline-none p-[10px] text-base"
              onChange={(e) => {
                setNewAdmin(e.target.value);
              }}
            ></input>
            <button
              onClick={async () => {
                try {
                  const parsedVal = adminsSchema.parse({ email: newAdmin });
                  const res = await fetch(
                    process.env.URL + "/api/db/addAdmin",
                    {
                      method: "POST",
                      body: JSON.stringify(parsedVal),
                    },
                  ).then((res) => res.json());
                  //TODO
                  console.log(res);
                } catch {
                  //display ERROR msg
                }
              }}
              className="cursor-pointer text-[var(--accent-clr2)] w-fit hover:bg-[var(--accent-clr2)]
                    hover:text-white p-2 px-4 uppercase text-lg font-semibold border-[3px] border-[var(--accent-clr2)]
                    outline-none"
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
}
