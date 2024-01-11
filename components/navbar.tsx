import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "./mainNav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const stores = await prismadb.store.findMany({ where: { userId } });
  return (
    <nav className="border-b">
      <div className="flex items-center h-16 px-4">
        <StoreSwitcher items={stores} />
        <div>
          <MainNav className="mx-6" />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
