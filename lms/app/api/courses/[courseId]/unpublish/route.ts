import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import {
	CustomSession,
	authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export async function PATCH(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const session: CustomSession | null = await getServerSession(authOptions);
		if (!session) {
			// return NextResponse.json("Unauthorized");
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (session?.user?.role !== "CREATOR") {
			// return NextResponse.json("Unauthorized");
			return new NextResponse("Unauthorized", { status: 401 });
		}
		const userId = session?.user?.id;

		const course = await db.course.findUnique({
			where: {
				id: params.courseId,
				userId: userId!,
			},
			include: {
				chapters: {
					include: {
						muxData: true,
					},
				},
			},
		});

		if (!course) {
			return new NextResponse("Not found", { status: 404 });
		}

		const unpublishedCourse = await db.course.update({
			where: {
				id: params.courseId,
				userId: userId!,
			},
			data: {
				isPublished: false,
			},
		});

		return NextResponse.json(unpublishedCourse);
	} catch (error) {
		console.log("[COURSE_ID_PUBLISH]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
