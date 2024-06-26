"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
	price: number;
	courseId: string;
}

export const CourseEnrollButton = ({
	price,
	courseId,
}: CourseEnrollButtonProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const onClick = async () => {
		try {
			setIsLoading(true);

			const response = await axios.post(`/api/courses/${courseId}/checkout`);

			window.location.assign(response.data.url);
		} catch(error:any) {
			console.log(error?.response?.status)
			if(error?.response?.status == 401){
				toast.error("Sign In First to Buy the Course");
			}else{

				toast.error("Something went wrong")
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			onClick={onClick}
			disabled={isLoading}
			size="sm"
			className="w-full md:w-full"
		>
			Enroll for {formatPrice(price)}
		</Button>
	);
};
