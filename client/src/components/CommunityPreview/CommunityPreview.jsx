import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../services/post";
import "./CommunityPreview.css";


export default function CommunityPreview() {
 
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await getPosts();

      // Show only first 3 newest posts
      setPosts(res.data.posts.slice(0, 3));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="section community-preview">
      <div className="community-preview__header">
        <div>
          <span className="section__eyebrow">From the community</span>
          <h2 className="section__title">Real people, real check-ins</h2>
        </div>
        <Link to="/community" className="btn btn--ghost">
          View community
        </Link>
      </div>

      <div className="community-preview__grid">
        {posts.map((post) => (
          <div key={post._id} className="community-card">
            <p className="community-card__text">"{post.content}"</p>
            <div className="community-card__footer">
              <span className="community-card__avatar"> {post.user?.name?.charAt(0).toUpperCase()}</span>
              <div>
                <p className="community-card__name">{post.user?.name}</p>
                <p className="community-card__tag"> {new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}