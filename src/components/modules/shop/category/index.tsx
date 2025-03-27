"use client";

import DeleteConfirmationModal from "@/components/ui/core/NMModal/DeleteConfirmationModal";
import NMTable from "@/components/ui/core/NMTable";
import { deleteCategory } from "@/services/category";
import { TCategory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import CreateCategoryModal from "./CreateCategoryModal";

type TCategoryProps = {
	categories: TCategory[];
};

const ManageCategories = ({ categories }: TCategoryProps) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [selectedItem, setSelectedItem] = useState<string | null>(null);

	const handleDelete = (data: TCategory) => {
		setSelectedId(data?._id);
		setSelectedItem(data?.name);
		setModalOpen(true);
	};

	const handleDeleteConfirm = async () => {
		try {
			if (selectedId) {
				const res = await deleteCategory(selectedId);
				console.log(res);
				if (res.success) {
					toast.success(res.message);
					setModalOpen(false);
				} else {
					toast.error(res.message);
				}
			}
		} catch (err: any) {
			console.error(err?.message);
		}
	};

	const columns: ColumnDef<TCategory>[] = [
		{
			accessorKey: "name",
			header: () => <div>Category Name</div>,
			cell: ({ row }) => (
				<div className="flex items-center space-x-3">
					<Image
						src={row.original.icon}
						alt={row.original.name}
						width={40}
						height={40}
						className="w-8 h-8 rounded-full"
					/>
					<span className="truncate">{row.original.name}</span>
				</div>
			),
		},
		{
			accessorKey: "isActive",
			header: () => <div>Status</div>,
			cell: ({ row }) => (
				<div>
					{row.original.isActive ? (
						<p className="text-green-500 bg-green-100 w-20 text-center px-3 rounded flex flex-col justify-center items-center border-2 border-green-300">
							Active
						</p>
					) : (
						<p className="text-red-500 bg-red-100 w-20 text-center px-3 rounded flex flex-col justify-center items-center border-2 border-red-300">
							Inactive
						</p>
					)}
				</div>
			),
		},
		{
			accessorKey: "action",
			header: () => <div>Action</div>,
			cell: ({ row }) => (
				<button
					title="Delete"
					className="text-red-500 cursor-pointer"
					onClick={() => handleDelete(row.original)}
				>
					<Trash className="w-5 h-5" />
				</button>
			),
		},
	];

	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold">Manage Categories</h1>
				<CreateCategoryModal
					isOpen={isCategoryModalOpen}
					onOpenChange={setIsCategoryModalOpen}
				/>
			</div>
			<NMTable data={categories} columns={columns} />
			<DeleteConfirmationModal
				name={selectedItem}
				isOpen={isModalOpen}
				onOpenChange={setModalOpen}
				onConfirm={handleDeleteConfirm}
			/>
		</div>
	);
};

export default ManageCategories;
