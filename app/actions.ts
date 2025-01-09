"use server";
import { requireUser } from "./utils/requireUser";
import { parseWithZod } from "@conform-to/zod";
import prisma from "./utils/db";
import { PostSchema, SiteCreationSchema, SiteSchema } from "./utils/zodSchemas"
import { redirect } from "next/navigation";
export async function createSiteAction(prevState: any, formData: FormData){
    const user = await requireUser();
    const submission=parseWithZod(formData,{
        schema:SiteSchema
    });
    if(submission.status!=="success"){
        return submission.reply();
    }
    const response = await prisma.site.create({
        data: {
          description: submission.value.description,
          name: submission.value.name,
          subdirectory: submission.value.subdirectory,
          userId: user.id,
        },
      });
      return redirect("/dashboard/sites");
}

export async function createPostAction(prevState:any,formData:FormData){
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: PostSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  await prisma.post.create({
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
      userId: user.id,
      siteId: formData.get("siteId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}