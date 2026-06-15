import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentationDetailPage } from "@/components/documentation/documentation-detail-page";
import { documentationPages, getDocumentationPage } from "@/lib/documentation/docs";

type DocumentationSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return documentationPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: DocumentationSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocumentationPage(slug);

  if (!page) {
    return {
      title: "Documentation | DocDoor",
    };
  }

  return {
    title: `${page.title} Documentation | DocDoor`,
    description: page.summary,
  };
}

export default async function DocumentationSlugPage({ params }: DocumentationSlugPageProps) {
  const { slug } = await params;
  const page = getDocumentationPage(slug);

  if (!page) {
    notFound();
  }

  return <DocumentationDetailPage page={page} />;
}
