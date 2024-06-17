import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { SiTicktick } from "react-icons/si";
import { AiOutlineStop } from "react-icons/ai";
import EditCouponModal from "./EditCouponModal";
import DeleteCouponModal from "./DeleteCouponModal";
import DisableCouponModal from "./DisableCouponModal";
import EnableCouponModal from "./EnableCouponModal";

const CouponActionDropdown = ({ coupon, onCouponEdited, onDelete, onEnable, onDisable }) => {

    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isEnable, setIsEnable] = useState(false);
    const [isDisable, setIsDisable] = useState(false);

  return (
    <DropdownMenu className="overflow-visible">
        {isEdit && <EditCouponModal coupon={coupon} setIsEdit={setIsEdit} onCouponEdited={onCouponEdited}  />}
        {isDelete && <DeleteCouponModal setIsDelete={setIsDelete} onDelete={() => onDelete(coupon._id)} />}
        {isDisable && <DisableCouponModal coupon={coupon} setIsDisable={setIsDisable} onDisable={() => onDisable(coupon._id)} />}
        {isEnable && <EnableCouponModal coupon={coupon} setIsEnable={setIsEnable} onEnable={() => onEnable(coupon._id)} />}
      <DropdownMenuTrigger className="flex items-center justify-center text-sm font-medium outline-none">
        <BsThreeDotsVertical className="text-gray-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 mr-6">
        <DropdownMenuItem>
          <button onClick={() => {setIsEdit(true)}} className="w-full flex items-center gap-2.5 text-xs">
            <span className="">
              <FiEdit />
            </span>
            Edit
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button onClick={() => {setIsEnable(true)}} className="w-full flex items-center gap-2.5 text-xs">
            <span className="">
              <SiTicktick />
            </span>
            Enable
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem className="overflow-visible">
          <button onClick={() => {setIsDisable(true)}} className="w-full flex items-center gap-2.5 text-xs">
            <span className="">
              <AiOutlineStop />
            </span>
            Disable
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem className="overflow-visible">
          <button onClick={() => {setIsDelete(true)}} className="w-full flex items-center gap-2.5 text-xs">
            <span className="">
              <FiTrash2 />
            </span>
            Delete
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CouponActionDropdown;
