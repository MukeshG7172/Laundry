import { auth, signOut } from "@/auth";
import RemainderPage from "../components/RemainderPage";
import { redirect } from "next/navigation";

export default async function ListPage() {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        redirect("/login");
    }

    return (
        <>
          <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
            <h1 className="text-2xl font-bold text-gray-800">Remainder</h1>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg shadow hover:bg-red-600 transition-all duration-200"
              >
                Sign Out
              </button>
            </form>
          </div>
      
          <div className="p-4">
            <RemainderPage user={user} />
          </div>
        </>
      );
      
}
