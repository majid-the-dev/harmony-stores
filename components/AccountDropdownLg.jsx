import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { BsPerson } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { LuInbox } from "react-icons/lu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const AccountDropdownLg = () => {

  const { data: session, status, update } = useSession();  
  const { user } = session || {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 font-medium outline-none">
        <span className="gradient-bg text-white rounded-full text-[15px] md:text-lg p-1.5">
          <GoPerson />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-5 mr-6 p-4">
        <DropdownMenuLabel className="py-4">
          <div className="flex items-center gap-3">
            <p className="bg-black text-white text-xl rounded-lg p-2">{user.firstName[0]}{user.lastName[0]}</p>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-normal">{user.firstName} {user.lastName}</span>
              <span className="text-xs text-gray-500 font-light">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        {/* {session.status === "authenticated" ? (
          <DropdownMenuLabel className="flex items-center justify-center text-center rounded-sm p-0">
            <button onClick={() => signOut()} className="bg-default w-full rounded-sm py-2">
              SIGN OUT
            </button>
          </DropdownMenuLabel>
        ) : (
          <DropdownMenuLabel className="flex items-center justify-center text-center rounded-sm p-0">
            <Link
              href={"/auth/sign-in"}
              className="bg-default w-full rounded-sm py-2"
            >
              SIGN IN
            </Link>
          </DropdownMenuLabel>
        )} */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="animation py-2.5 mt-3 focus:bg-orange-100">
          <Link href={"/profile"} className="w-full text-gray-500 text-xs font-normal">
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="animation py-2.5 focus:bg-orange-100">
          <Link href={"/profile/orders"} className="text-gray-500 text-xs font-normal">
            My Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="animation py-2.5 focus:bg-orange-100">
          <Link href={"/profile/settings"} className="text-gray-500 text-xs font-normal">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-center mt-3 focus:bg-transparent">
          <button onClick={() => signOut()} className="w-full text-xs text-orange-500 font-medium">Sign Out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdownLg;
