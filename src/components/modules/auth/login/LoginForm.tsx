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
import { loginUser, reCaptchaTokenVerification } from "@/services/authServices";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { useUser } from "@/context/UserContext";

const LoginForm = () => {
	const { setIsLoading } = useUser();

	const form = useForm({
		resolver: zodResolver(loginSchema),
	});

	const [reCaptchaStatus, setReCaptchaStatus] = useState<boolean>(false);

	const router = useRouter();
	const searchParams = useSearchParams();
	const redirect = searchParams.get("redirectPath");

	const {
		formState: { isSubmitting },
	} = form;

	const handleReCaptcha = async (value: string | null) => {
		try {
			const res = await reCaptchaTokenVerification(value!);

			if (res?.success) {
				setReCaptchaStatus(true);
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			const res = await loginUser(data);
			setIsLoading(true);

			if (res?.success) {
				toast.success(res?.message);

				if (redirect) {
					router.push(redirect);
				} else {
					router.push("/");
				}
			} else {
				toast.error(res?.message);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md mx-auto w-full p-5 mt-10">
			<div className="flex items-center space-x-4 mb-8">
				<Logo />
				<div>
					<h1 className="text-xl font-semibold">Login</h1>
					<p className="font-extralight text-sm text-gray-600">Welcome back!</p>
				</div>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
					<div className="flex flex-col justify-center items-center w-full">
						<ReCAPTCHA
							sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string}
							onChange={handleReCaptcha}
						/>
					</div>
					<Button
						disabled={reCaptchaStatus ? false : true}
						type="submit"
						className="mt-5 cursor-pointer w-full"
					>
						{isSubmitting ? "Logging..." : "Login"}
					</Button>
				</form>
			</Form>
			<p className="text-sm text-gray-600 text-center my-3">
				Do not have any account?
				<Link href="/register" className="text-primary ml-1 hover:underline">
					Register
				</Link>
			</p>
		</div>
	);
};

export default LoginForm;
