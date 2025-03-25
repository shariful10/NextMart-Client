"use server";

import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const data = await res.json();
		return data;
	} catch (err: any) {
		return Error(err);
	}
};

export const loginUser = async (userData: FieldValues) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const data = await res.json();
		return data;
	} catch (err: any) {
		return Error(err);
	}
};
