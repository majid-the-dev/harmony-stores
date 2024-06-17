import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa6";
import { MdArrowDropDown } from "react-icons/md";

const ProfileNavigation = () => {
  const path = usePathname();

  return (
    <div>
      <div className="block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
            <span className="text-[16px] font-semibold whitespace-nowrap">
              Manage Your Profile
            </span>
            <span className="text-[12px]">
              <MdArrowDropDown className="text-2xl" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="block md:hidden w-screen mt-2 py-2">
            <DropdownMenuItem className="py-2">
              <Link
                href={"/profle"}
                className={`${
                  path === "/profile"
                    ? "text-black font-semibold text-sm"
                    : "text-gray-500 text-xs"
                } flex items-center gap-2.5`}
              >
                Account Information
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2">
              <Link
                href={"/profile/reset-password"}
                className={`${
                  path === "/profile/reset-password"
                    ? "text-black font-semibold text-sm"
                    : "text-gray-500 text-xs"
                } flex items-center gap-2.5`}
              >
                Reset Password
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2">
              <Link
                href={"/profile/orders"}
                className={`${
                  path === "/profile/orders"
                    ? "text-black font-semibold text-sm"
                    : "text-gray-500 text-xs"
                } flex items-center gap-2.5`}
              >
                My Orders
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem className="py-2">
              <Link
                href={"/profile/wishlist"}
                className={`${
                  path === "/profile/wishlist"
                    ? "text-black font-semibold text-sm"
                    : "text-gray-500 text-xs"
                } flex items-center gap-2.5`}
              >
                My Wishlist
              </Link>
            </DropdownMenuItem> */}
            {/* <DropdownMenuItem className="py-2">
              <Link
                href={"/profile/settings"}
                className={`${
                  path === "/profile/settings"
                    ? "text-black font-semibold text-sm"
                    : "text-gray-500 text-xs"
                } flex items-center gap-2.5`}
              >
                Settings
              </Link>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden md:block">
        <h1 className="text-[16px] font-semibold">Manage Your Profile</h1>

        <div className="flex flex-col gap-8 mt-11">
          <Link
            href={"/profile"}
            className={`${
              path === "/profile"
                ? "flex items-center gap-4 text-black font-semibold"
                : "text-gray-500"
            } text-xs whitespace-nowrap hover:font-semibold hover:translate-x-2 transition-all duration-300 ease-in-out`}
          >
            Account Information
            {path === "/profile" && <FaAngleRight className="mt-[2px]" />}
          </Link>
          <Link
            href={"/profile/reset-password"}
            className={`${
              path === "/profile/reset-password"
                ? "flex items-center gap-4 text-black font-semibold"
                : "text-gray-500"
            } text-xs hover:font-semibold hover:translate-x-2 transition-all duration-300 ease-in-out`}
          >
            Reset Password
            {path === "/profile/reset-password" && (
              <FaAngleRight className="mt-[2px]" />
            )}
          </Link>
          <Link
            href={"/profile/orders"}
            className={`${
              path === "/profile/orders"
                ? "flex items-center gap-4 text-black font-semibold"
                : "text-gray-500"
            } text-xs hover:font-semibold hover:translate-x-2 transition-all duration-300 ease-in-out`}
          >
            My Orders
            {path === "/profile/orders" && (
              <FaAngleRight className="mt-[2px]" />
            )}
          </Link>
          {/* <Link
            href={"/"}
            className="text-xs text-gray-500 hover:font-semibold hover:translate-x-2 transition-all duration-300 ease-in-out"
          >
            My Wishlist
          </Link> */}
          {/* <Link
            href={"/"}
            className="text-xs text-gray-500 hover:font-semibold hover:translate-x-2 transition-all duration-300 ease-in-out"
          >
            Settings
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileNavigation;
