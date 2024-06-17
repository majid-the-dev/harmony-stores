import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { BsPerson } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { LuInbox } from "react-icons/lu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const AccountDropdown = () => {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
        <IoPersonCircleOutline className="text-[27px]" />
        <span className="text-[12px]">
          <FaAngleDown />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 mr-6">
        {session ? (
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
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/"} className="flex items-center gap-2.5 text-sm">
            <span className="text-[18px]">
              <BsPerson />
            </span>
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/"} className="flex items-center gap-2.5 text-sm">
            <span className="text-[14px]">
              <LuInbox />
            </span>
            Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/"} className="flex items-center gap-2.5 text-sm">
            <span className="text-[14px]">
              <FaRegHeart />
            </span>
            Wishlist
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
