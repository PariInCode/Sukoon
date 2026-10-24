import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../services/post";

export default function CommunityPreview() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await getPosts();
      setPosts(res.data.posts.slice(0, 3));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#a78bfa] mb-1">
            From the community
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#2d2a3d]">
            Real people, real check-ins
          </h2>
        </div>
        <Link
          to="/community"
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#7a7488] border border-black/[0.08] bg-white hover:border-[#a78bfa]/40 transition"
        >
          View community
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-[18px] border border-black/[0.06] p-7 shadow-[0_12px_30px_-20px_rgba(167,139,250,0.3)] flex flex-col justify-between"
          >
            <p className="text-sm leading-relaxed text-[#2d2a3d] mb-6">
              "{post.content}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#f472b6] flex items-center justify-center text-white text-sm font-semibold shrink-0">
                {post.user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2d2a3d] leading-tight">
                  {post.user?.name}
                </p>
                <p className="text-xs text-[#7a7488] mt-0.5">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}