import { getAllBlogPosts } from "@/lib/blog";
import { CheckCircle2, AlertCircle, FileText, Search, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminSeoPage() {
  const posts = await getAllBlogPosts();

  let missingTitles = 0;
  let missingDescriptions = 0;
  let tooLongTitles = 0;
  let tooLongDescriptions = 0;

  const analyzedPosts = posts.map(post => {
    const title = (post.frontmatter.title as string) || '';
    const description = (post.frontmatter.description as string) || '';
    
    let status: 'OK' | 'WARNING' | 'ERROR' = 'OK';
    
    if (!title) {
      missingTitles++;
      status = 'ERROR';
    } else if (title.length > 60) {
      tooLongTitles++;
      status = 'WARNING';
    }

    if (!description) {
      missingDescriptions++;
      status = 'ERROR';
    } else if (description.length > 160) {
      tooLongDescriptions++;
      if (status !== 'ERROR') status = 'WARNING';
    } else if (description.length < 50) {
      if (status !== 'ERROR') status = 'WARNING';
    }

    return {
      ...post,
      titleLength: title.length,
      descLength: description.length,
      status
    };
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light text-stone-100">Panel SEO</h1>
        <p className="text-stone-400 mt-1">Sprawdź kondycję metadanych swoich artykułów i stron.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl">
          <div className="flex items-center gap-4 text-stone-400 mb-4">
            <FileText className="w-5 h-5 text-stone-500" />
            <h3 className="text-sm font-medium uppercase tracking-wider">Zindeksowane Wpisy</h3>
          </div>
          <p className="text-3xl font-light text-stone-100">{posts.length}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl">
          <div className="flex items-center gap-4 text-stone-400 mb-4">
            <AlertCircle className={`w-5 h-5 ${missingTitles > 0 ? 'text-red-500' : 'text-emerald-500'}`} />
            <h3 className="text-sm font-medium uppercase tracking-wider">Braki Tytułów</h3>
          </div>
          <p className={`text-3xl font-light ${missingTitles > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{missingTitles}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl">
          <div className="flex items-center gap-4 text-stone-400 mb-4">
            <Search className={`w-5 h-5 ${missingDescriptions > 0 ? 'text-red-500' : 'text-emerald-500'}`} />
            <h3 className="text-sm font-medium uppercase tracking-wider">Braki Opisów</h3>
          </div>
          <p className={`text-3xl font-light ${missingDescriptions > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{missingDescriptions}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl">
          <div className="flex items-center gap-4 text-stone-400 mb-4">
            <LinkIcon className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-medium uppercase tracking-wider">Zbyt długie meta</h3>
          </div>
          <p className="text-3xl font-light text-stone-100">{tooLongTitles + tooLongDescriptions}</p>
        </div>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-stone-800">
          <h2 className="text-lg font-medium text-stone-100">Kondycja Wpisów Blogowych</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-800 text-xs uppercase tracking-wider text-stone-500 bg-stone-950/50">
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Slug (URL)</th>
                <th className="p-4 font-medium">SEO Title</th>
                <th className="p-4 font-medium">Meta Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {analyzedPosts.map((post) => (
                <tr key={post.slug} className="hover:bg-stone-800/50 transition-colors">
                  <td className="p-4">
                    {post.status === 'OK' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {post.status === 'WARNING' && <AlertCircle className="w-5 h-5 text-amber-500" />}
                    {post.status === 'ERROR' && <AlertCircle className="w-5 h-5 text-red-500" />}
                  </td>
                  <td className="p-4 text-sm font-mono text-stone-400">
                    <Link href={`/kompendium-wiedzy/${post.slug}`} target="_blank" className="hover:text-amber-500 hover:underline">
                      /{post.slug}
                    </Link>
                  </td>
                  <td className="p-4">
                    <p className={`text-sm ${post.titleLength > 60 || post.titleLength === 0 ? 'text-red-400' : 'text-stone-300'}`}>
                      {post.frontmatter.title as string || 'Brak tytułu!'}
                    </p>
                    <p className="text-xs text-stone-500 mt-1">{post.titleLength} / 60 znaków</p>
                  </td>
                  <td className="p-4">
                    <p className={`text-sm line-clamp-2 ${post.descLength > 160 || post.descLength < 50 ? 'text-amber-400' : 'text-stone-300'}`}>
                      {post.frontmatter.description as string || 'Brak opisu!'}
                    </p>
                    <p className="text-xs text-stone-500 mt-1">{post.descLength} / 160 znaków</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
