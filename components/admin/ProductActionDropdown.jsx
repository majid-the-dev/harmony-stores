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
import DeleteProductModal from "./DeleteProductModal";
import { useState } from "react";
import EditProductModal from "./EditProductModal";

const ProductActionDropdown = ({
  product,
  onDelete,
  onEdit,
  onProductEdited,
}) => {
  const [isModal, setIsModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <DropdownMenu className="overflow-visible">
      {isEdit && (
        <EditProductModal
          product={product}
          setIsEdit={setIsEdit}
          onProductEdited={onProductEdited}
        />
      )}
      {isModal && (
        <DeleteProductModal
          setIsModal={setIsModal}
          onDelete={() => onDelete(product._id)}
        />
      )}
      <DropdownMenuTrigger className="flex items-center justify-center text-sm font-medium outline-none">
        <BsThreeDotsVertical className="text-gray-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 mr-6">
        <DropdownMenuItem>
          <button
            onClick={() => {
              setIsEdit(true);
              onEdit(product);
            }}
            className="w-full flex items-center gap-2.5 text-xs"
          >
            <span className="">
              <FiEdit />
            </span>
            Edit
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem className="overflow-visible">
          <button
            onClick={() => setIsModal(true)}
            className="w-full flex items-center gap-2.5 text-xs"
          >
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

export default ProductActionDropdown;
