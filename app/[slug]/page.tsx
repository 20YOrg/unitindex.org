import directus from "@/lib/directus";

import { readItem } from "@directus/sdk";

import { notFound } from "next/navigation";

async function getPage(slug: string) {
    try {
        const page = await directus.request(readItem('Pages', slug));
        return page;
    } catch (error) {
        notFound();
    }
}

export default async function DynamicPage({ params }: { params: { slug: string } }){
    const page = await getPage(params.slug);
    return (
        <div>
            <h1>{page.title}</h1>
            <div dangerouslySetInnerHTML={{__html: page.description }}></div>
        </div>
    )
}