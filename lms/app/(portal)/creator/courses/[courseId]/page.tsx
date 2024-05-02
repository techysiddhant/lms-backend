import { fetchCreatorCourse } from "@/actions/creator.actions";
import { Banner } from "@/components/banner";
import { IconBadge } from "@/components/icon-badge";
import { IndianRupee } from "lucide-react";
import {  LayoutDashboard, ListChecks } from "lucide-react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { fetchCategories } from "@/actions/user.actions";
import { ChaptersForm } from "./_components/chapters-form";
import { PriceForm } from "./_components/price-form";
import { Actions } from "./_components/actions";
import { ShortDescriptionForm } from "./_components/short-description";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  console.log(params);
  const course = await fetchCreatorCourse(params?.courseId);
  const categories = await fetchCategories();
  console.log("Categories :", categories);
  const requiredFields = [
    course?.title,
    course?.description,
    course?.imageUrl,
    course?.price,
    course?.categoryId,
    course?.chapters?.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course?.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course?.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course?.id} />
            <ShortDescriptionForm initialData={course} courseId={course?.id} />
            <DescriptionForm initialData={course} courseId={course?.id} />
            <ImageForm initialData={course} courseId={course?.id} />
            <CategoryForm
              initialData={course}
              courseId={course?.id}
              options={categories?.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChaptersForm initialData={course} courseId={course?.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={IndianRupee} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course?.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePage;
