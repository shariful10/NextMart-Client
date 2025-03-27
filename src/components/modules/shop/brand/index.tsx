"use client";

import DeleteConfirmationModal from "@/components/ui/core/NMModal/DeleteConfirmationModal";
import NMTable from "@/components/ui/core/NMTable";
import { deleteBrand } from "@/services/brand";
import { TBrand } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import CreateBrandModal from "./CreateBrandModal";

type TBradProps = {
	brands: TBrand[];
};

const ManageBrands = ({ brands }: TBradProps) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [selectedItem, setSelectedItem] = useState<string | null>(null);

	const handleDelete = (data: TBrand) => {
		setSelectedId(data?._id);
		setSelectedItem(data?.name);
		setModalOpen(true);
	};

	const handleDeleteConfirm = async () => {
		try {
			if (selectedId) {
				const res = await deleteBrand(selectedId);
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

	const columns: ColumnDef<TBrand>[] = [
		{
			accessorKey: "name",
			header: () => <div>Brand Name</div>,
			cell: ({ row }) => (
				<div className="flex items-center space-x-3">
					<Image
						src={row.original.logo}
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
				<h1 className="text-xl font-bold">Manage Brands</h1>
				<CreateBrandModal />
			</div>
			<NMTable data={brands} columns={columns} />
			<DeleteConfirmationModal
				name={selectedItem}
				isOpen={isModalOpen}
				onOpenChange={setModalOpen}
				onConfirm={handleDeleteConfirm}
			/>
		</div>
	);
};

export default ManageBrands;
