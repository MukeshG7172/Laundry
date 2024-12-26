import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
    const session = await auth();
    const user = session?.user;
    if (user) {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            const response = await fetch(`${baseUrl}/api/user`, {
                method: "POST",
                header: "Content-Type: application/json",
                body: JSON.stringify({
                    email: user.email,
                    name: user.name,
                })
            })

            if (!response.ok) {
                console.log("Error creating user")
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            redirect("/list")
        }
    }
    return (
        <form
            action={async () => {
                "use server";
                await signIn("google");
            }}
        >
            <button type="submit">Sign in with Google</button>
        </form>
    );
}