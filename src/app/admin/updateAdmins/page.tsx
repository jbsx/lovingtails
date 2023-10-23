"use client";
import { ZodError, z } from "zod";
import { adminsSchema } from "@/app/utils/zodTypes";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";
import AdminDashboard from "@/app/components/AdminDashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const dynamic = "force-dynamic";

export default function UpdateAdmins() {
  const [admins, setAdmins] = useState<z.infer<typeof adminsSchema>[] | null>(
    null,
  );
  const [newAdmin, setNewAdmin] = useState("");

  useEffect(() => {
    fetch(process.env.URL + "/api/db/getAdmins")
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setAdmins(data.admins as z.infer<typeof adminsSchema>[]);
          });
        } else {
          toast.error("Internal Server Error");
        }
      })
      .catch(() => {
        toast.error("Couldn't reach server. Try again later.");
      });
  }, []);

  return (
    <div className="flex flex-col flex-wrap items-center p-4 md:w-full">
      <AdminDashboard />
      <ToastContainer position="bottom-right" autoClose={10_000} />
      {admins ? (
        <div className="flex flex-col gap-[10px] py-8 md:w-full">
          <h2 className="text-xl uppercase">Admins</h2>
          {admins.map((i, idx) => {
            return (
              <div
                key={i.email}
                className="flex justify-between items-center gap-[10px] border-2 border-[var(--accent-clr2)] p-2"
              >
                <div>{i.email}</div>
                <button
                  onClick={async () => {
                    const res = await fetch(
                      process.env.URL + "/api/db/deleteAdmin",
                      {
                        method: "POST",
                        body: JSON.stringify({ data: i }),
                      },
                    );
                    if (res.ok) {
                      const temp = [...admins];
                      temp.splice(idx, 1);
                      setAdmins(temp);
                      toast.success("Admin deleted");
                    } else {
                      const data = await res.json();
                      console.log(data.error);
                      toast.error("Error. Try again later");
                    }
                  }}
                  className="cursor-pointer text-[var(--accent-clr2)] w-fit hover:bg-[var(--accent-clr2)]
                    hover:text-white py-1 px-2 uppercase text-lg font-semibold border-[3px] border-[var(--accent-clr2)]
                    outline-none"
                >
                  Delete
                </button>
              </div>
            );
          })}
          <div className="flex gap-[10px] md:w-full">
            <input
              name="newAdmin"
              type="text"
              value={newAdmin}
              className="min-h-[40px] w-[80%] rounded outline-none p-[10px] text-base"
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
                  );
                  if (res.ok) {
                    res.json().then((data) => {
                      setAdmins([...admins, data.data]);
                      setNewAdmin("");
                      toast.success("Admin added");
                    });
                  } else {
                    toast.error("Error. Try again later");
                  }
                } catch (e) {
                  if (e instanceof ZodError) {
                    toast.error(
                      e.issues
                        .map((err) => {
                          return err.message;
                        })
                        .toString(),
                    );
                  } else {
                    toast.error("Error. Try again later");
                  }
                }
              }}
              className="cursor-pointer text-[var(--accent-clr2)] w-[20%] hover:bg-[var(--accent-clr2)]
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
