import { getAllArkanaPosts } from "@/lib/arkany";
import { getAllBlogPosts } from "@/lib/blog";
import Link from "next/link";
import { FileText, Eye, Edit3 } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminContentPage() {
  const [arkana, blog] = await Promise.all([
    getAllArkanaPosts(),
    getAllBlogPosts()
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light text-stone-100">Treści (CMS)</h1>
        <p className="text-stone-400 mt-1">Zarządzaj wpisami na blogu i zawartością Wielkich Arkanów.</p>
        <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg max-w-3xl">
          <p className="text-sm text-amber-500">
            Wskazówka: Platforma używa plików MDX. W tej wersji panelu możesz podglądać opublikowane treści. Aby edytować treść na stałe, modyfikuj pliki w folderach <code>content/blog</code> i <code>content/arkany</code>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Arkana List */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden flex flex-col h-[600px]">
          <div className="p-6 border-b border-stone-800 flex justify-between items-center bg-stone-900 sticky top-0 z-10">
            <h2 className="text-lg font-medium text-stone-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-stone-400" /> 
              Wielkie Arkana ({arkana.length})
            </h2>
          </div>
          <div className="overflow-y-auto flex-1">
            <ul className="divide-y divide-stone-800">
              {arkana.map(post => (
                <li key={post.slug} className="p-4 hover:bg-stone-800/50 transition-colors flex items-center justify-between group">
                  <div>
                    <p className="text-stone-300 font-medium">{post.frontmatter.title as string}</p>
                    <p className="text-xs text-stone-500 font-mono mt-1">/content/arkany/{post.slug}.mdx</p>
                  </div>
                  <Link href={`/arkany/${post.slug}`} target="_blank" className="p-2 text-stone-500 hover:text-stone-200 hover:bg-stone-700 rounded transition-colors">
                    <Eye className="w-4 h-4" />
                  </Link>
                </li>
              ))}
              {arkana.length === 0 && (
                <li className="p-8 text-center text-stone-500">Brak plików.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Blog List */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden flex flex-col h-[600px]">
          <div className="p-6 border-b border-stone-800 flex justify-between items-center bg-stone-900 sticky top-0 z-10">
            <h2 className="text-lg font-medium text-stone-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-stone-400" /> 
              Kompendium Wiedzy ({blog.length})
            </h2>
          </div>
          <div className="overflow-y-auto flex-1">
            <ul className="divide-y divide-stone-800">
              {blog.map(post => (
                <li key={post.slug} className="p-4 hover:bg-stone-800/50 transition-colors flex items-center justify-between group">
                  <div>
                    <p className="text-stone-300 font-medium line-clamp-1">{post.frontmatter.title as string}</p>
                    <p className="text-xs text-stone-500 font-mono mt-1">/content/blog/{post.slug}.mdx</p>
                  </div>
                  <Link href={`/kompendium-wiedzy/${post.slug}`} target="_blank" className="p-2 text-stone-500 hover:text-stone-200 hover:bg-stone-700 rounded transition-colors flex-shrink-0 ml-4">
                    <Eye className="w-4 h-4" />
                  </Link>
                </li>
              ))}
              {blog.length === 0 && (
                <li className="p-8 text-center text-stone-500">Brak wpisów na blogu.</li>
              )}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
