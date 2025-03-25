"use client";

import Logo from "@/app/assets/Logo";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registrationSchema } from "./registerValidation";

const RegisterForm = () => {
	const form = useForm({
		resolver: zodResolver(registrationSchema),
	});

	const password = form.watch("password");
	const passwordConfirm = form.watch("passwordConfirm");

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log(data);
	};

	return (
		<div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md mx-auto w-full p-5 mt-10">
			<div className="flex items-center space-x-4 mb-8">
				<Logo />
				<div>
					<h1 className="text-xl font-semibold">Register</h1>
					<p className="font-extralight text-sm text-gray-600">
						Join us today and start your journey!
					</p>
				</div>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Name"
										{...field}
										value={field.value || ""}
									/>
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Email Address"
										{...field}
										value={field.value || ""}
									/>
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Password"
										{...field}
										value={field.value || ""}
									/>
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="passwordConfirm"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input type="password" {...field} value={field.value || ""} />
								</FormControl>

								{passwordConfirm && password !== passwordConfirm ? (
									<FormMessage>Password does not match</FormMessage>
								) : (
									<FormMessage />
								)}
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						disabled={!!passwordConfirm && password !== passwordConfirm}
						className="mt-5 cursor-pointer"
					>
						Register
					</Button>
				</form>
			</Form>
			<p className="text-sm text-gray-600 text-center my-3">
				Already have an account ?
				<Link href="/login" className="text-primary ml-1 hover:underline">
					Login
				</Link>
			</p>
		</div>
	);
};

export default RegisterForm;
