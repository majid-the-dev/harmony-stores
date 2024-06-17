import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";

const OrderActionDropdown = ({ order }) => {
  return (
    <DropdownMenu className="overflow-visible">
        <DropdownMenuTrigger className="flex items-center justify-center text-sm font-medium outline-none">
        <BsThreeDotsVertical className="text-gray-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 mr-6">
      <DropdownMenuItem>
        <Link href={`/admin/orders/${order._id}`} className="w-full text-xs">
            View
        </Link>
      </DropdownMenuItem>
      {/* <DropdownMenuItem>
        <Link href={`/admin/orders/${order._id}/edit`} className="w-full text-xs">
            Edit
        </Link>
      </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

export default OrderActionDropdown;
