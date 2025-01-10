"use server";
import { requireUser } from "./utils/requireUser";
import { parseWithZod } from "@conform-to/zod";
import prisma from "./utils/db";
import { PostSchema, SiteCreationSchema, SiteSchema } from "./utils/zodSchemas"
import { redirect } from "next/navigation";
export async function createSiteAction(prevState: any, formData: FormData){
    const user = await requireUser();
    const submission=await parseWithZod(formData,{
        schema:SiteCreationSchema({
          async isSubdirectoryUnique(){
            const exisitngSubDirectory = await prisma.site.findUnique({
              where: {
                subdirectory: formData.get("subdirectory") as string,
              },
            });
            return !exisitngSubDirectory;
          }
        }),
        async:true
    });
    if(submission.status!=="success"){
        return submission.reply();
    }
    await prisma.site.create({
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

export async function editPostActions(prevState:any,formData:FormData){
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: PostSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  await prisma.post.update({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
    },
  });
  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function deletePost(formData: FormData) {
  const user = await requireUser();

  await prisma.post.delete({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function updateImage(formData: FormData) {
  const user = await requireUser();

  await prisma.site.update({
    where: {
      userId: user.id,
      id: formData.get("siteId") as string,
    },
    data: {
      imageUrl: formData.get("imageUrl") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function deleteSite(formData: FormData) {
  const user = await requireUser();

   await prisma.site.delete({
    where: {
      userId: user.id,
      id: formData.get("siteId") as string,
    },
  });

  return redirect("/dashboard/sites");
}