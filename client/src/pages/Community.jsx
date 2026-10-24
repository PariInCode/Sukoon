import { useState, useEffect } from "react";
import { getPosts, likePost, createPost, reportPost } from "../services/post";

const CATEGORIES = ["All", "Anxiety", "Student Life", "Work Stress", "Relationships", "Wins"];

const HELPLINE_CARD = (
  <div className="mt-3 rounded-xl bg-gradient-to-br from-[#a78bfa]/10 to-[#f472b6]/10 border border-[#a78bfa]/20 px-4 py-3">
    <p className="text-xs font-semibold text-[#2d2a3d] mb-1">💙 You're not alone</p>
    <p className="text-xs text-[#7a7488] leading-relaxed">
      If you or someone you know needs support right now:
    </p>
    <div className="mt-1.5 space-y-0.5">
      <p className="text-xs text-[#7a7488]">📞 <a href="tel:+919152987821" className="font-semibold text-[#f472b6]">iCall: 9152987821</a></p>
      <p className="text-xs text-[#7a7488]">📞 <a href="tel:+911860266345" className="font-semibold text-[#f472b6]">Vandrevala: 1860-2662-345</a></p>
      <p className="text-xs text-[#7a7488]">📞 <a href="tel:+912227546669" className="font-semibold text-[#f472b6]">AASRA: 91-22-27546669</a></p>
    </div>
  </div>
);

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [newPost, setNewPost] = useState("");
  const [reported, setReported] = useState({}); // track which posts user reported

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await getPosts();
      setPosts(res.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    try {
      await createPost({ content: newPost });
      setNewPost("");
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReport = async (postId) => {
    if (reported[postId]) return;
    try {
      await reportPost(postId);
      setReported((prev) => ({ ...prev, [postId]: true }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9fc] px-4 sm:px-6 py-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        {/* Main feed */}
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-[#2d2a3d] mb-1">Community</h1>
            <p className="text-sm text-[#7a7488]">
              A space to share, vent, and hear from people who get it.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition ${
                  activeCategory === cat
                    ? "text-white bg-gradient-to-br from-[#a78bfa] to-[#f472b6] shadow-[0_6px_14px_-4px_rgba(167,139,250,0.5)]"
                    : "text-[#7a7488] bg-white border border-black/[0.06] hover:border-[#a78bfa]/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* New post box */}
          <form
            onSubmit={handlePost}
            className="bg-white rounded-2xl border border-black/[0.06] p-4 mb-6 shadow-[0_10px_30px_-20px_rgba(167,139,250,0.3)]"
          >
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#f472b6] flex items-center justify-center text-white text-sm font-semibold shrink-0">
                Y
              </div>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share what's on your mind, anonymously if you want..."
                rows={2}
                className="flex-1 resize-none bg-[#faf9fc] rounded-xl px-3.5 py-2.5 text-sm text-[#2d2a3d] placeholder:text-[#a29cb3] outline-none focus:ring-2 focus:ring-[#a78bfa]/20"
              />
            </div>
            <div className="flex items-center justify-between mt-3 pl-12">
              <label className="flex items-center gap-1.5 text-xs text-[#7a7488]">
                <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-black/20 text-[#a78bfa]" />
                Post anonymously
              </label>
              <button
                type="submit"
                disabled={!newPost.trim()}
                className="px-5 py-2 rounded-xl text-white text-sm font-semibold bg-gradient-to-br from-[#a78bfa] to-[#f472b6] shadow-[0_6px_14px_-4px_rgba(167,139,250,0.55)] transition hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
              >
                Post
              </button>
            </div>
          </form>

          {/* Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className={`bg-white rounded-2xl border p-5 shadow-[0_10px_30px_-22px_rgba(167,139,250,0.3)] ${
                  post.isFlagged
                    ? "border-[#f472b6]/30"
                    : "border-black/[0.06]"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#f472b6] flex items-center justify-center text-white text-sm font-semibold">
                    {post.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#2d2a3d]">{post.user?.name}</p>
                    <p className="text-xs text-[#a29cb3]">
                      {post.user?.email} · {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {post.isFlagged && (
                    <span className="text-xs font-medium text-[#f472b6] bg-[#f472b6]/10 px-2.5 py-1 rounded-full">
                      💙 needs support
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#2d2a3d] leading-relaxed mb-4">{post.content}</p>

                {/* helpline card for flagged posts */}
                {post.isFlagged && HELPLINE_CARD}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-5 text-sm">
                    <button
                      onClick={() => toggleLike(post._id)}
                      className={`flex items-center gap-1.5 font-medium transition ${
                        post.liked ? "text-[#f472b6]" : "text-[#7a7488] hover:text-[#f472b6]"
                      }`}
                    >
                      <span>{post.liked ? "♥" : "♡"}</span>
                      {post.likes.length}
                    </button>
                    <button className="flex items-center gap-1.5 text-[#7a7488] font-medium hover:text-[#2d2a3d] transition">
                      <span>💬</span>
                      {post.comments.length}
                    </button>
                  </div>

                  {/* report button */}
                  <button
                    onClick={() => handleReport(post._id)}
                    disabled={reported[post._id]}
                    className={`text-xs transition ${
                      reported[post._id]
                        ? "text-[#a29cb3] cursor-default"
                        : "text-[#a29cb3] hover:text-[#f472b6]"
                    }`}
                  >
                    {reported[post._id] ? "Reported" : "Report"}
                  </button>
                </div>
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-16 text-sm text-[#a29cb3]">
                No posts in this category yet. Be the first to share.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar — unchanged */}
        <aside className="space-y-5 h-fit lg:sticky lg:top-6">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-5 shadow-[0_10px_30px_-22px_rgba(167,139,250,0.3)]">
            <h3 className="text-sm font-semibold text-[#2d2a3d] mb-3">Community guidelines</h3>
            <ul className="space-y-2 text-xs text-[#7a7488] leading-relaxed">
              <li>• Be kind — everyone here is figuring things out</li>
              <li>• No judgment, no unsolicited advice</li>
              <li>• Protect anonymity, yours and others'</li>
              <li>• Report anything that feels unsafe</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-black/[0.06] p-5 shadow-[0_10px_30px_-22px_rgba(167,139,250,0.3)]">
            <h3 className="text-sm font-semibold text-[#2d2a3d] mb-3">Trending this week</h3>
            <ul className="space-y-2.5">
              {["Exam anxiety", "Sleep struggles", "Setting boundaries", "Small wins"].map((topic) => (
                <li key={topic}>
                  <button className="text-xs text-[#7a7488] hover:text-[#f472b6] transition">
                    #{topic.replace(/\s/g, "")}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl p-5 bg-gradient-to-br from-[#a78bfa]/10 to-[#f472b6]/10 border border-[#a78bfa]/15">
            <p className="text-xs text-[#7a7488] leading-relaxed">
              In crisis and need to talk now?{" "}
              <a href="tel:+919152987821" className="font-semibold text-[#f472b6]">
                iCall: +91 9152987821
              </a>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}