"use client";

import NMTable from "@/components/ui/core/NMTable";
import { TBrand } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import CreateBrandModal from "./CreateBrandModal";

type TBradProps = {
	brands: TBrand[];
};

const ManageBrands = ({ brands }: TBradProps) => {
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
			header: () => <div>Active Status</div>,
			cell: ({ row }) => (
				<div>
					{row.original.isActive ? (
						<p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
							True
						</p>
					) : (
						<p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
							False
						</p>
					)}
				</div>
			),
		},
		{
			accessorKey: "action",
			header: () => <div>Action</div>,
			cell: ({ row }) => (
				<button className="text-red-500 cursor-pointer" title="Delete">
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
		</div>
	);
};

export default ManageBrands;
