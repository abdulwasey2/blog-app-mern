// frontend/src/pages/PostDetailPage.js

// ... imports wese hi rahenge ...
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostBySlug, deletePost, resetPostState } from '../features/posts/postSlice';
import { fetchComments, resetCommentState } from '../features/comments/commentSlice';
import Spinner from '../components/common/Spinner';
import { toast } from 'react-toastify';
import formatDate from '../utils/formatDate';
import CommentList from '../features/comments/CommentList'; 
import AddCommentForm from '../features/comments/AddCommentForm';

const PostDetailPage = () => {
    // ... logic waisa hi rahega ...
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { post, loading: postLoading, error: postError } = useSelector((state) => state.posts);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (slug) {
        dispatch(getPostBySlug(slug));
        dispatch(fetchComments(slug));
        }
        if (postError) {
        toast.error(postError);
        }
        
        return () => {
        dispatch(resetPostState());
        dispatch(resetCommentState());
        };
    }, [dispatch, slug, postError]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
        const resultAction = await dispatch(deletePost(slug));
        if (deletePost.fulfilled.match(resultAction)) {
            toast.success('Post deleted successfully!');
            navigate('/');
        } else {
            toast.error(resultAction.payload || 'Failed to delete post.');
        }
        }
    };

    if (postLoading || !post) {
        return <Spinner />;
    }

    const isAuthor = userInfo && post.author && userInfo._id === post.author._id;

    return (
        <>
        <article style={styles.container}>
            {/* 1. Featured Image ko yahan dikhayein */}
            {post.featuredImage && post.featuredImage !== 'no-image.jpg' && (
            <img 
                src={`http://localhost:5000${post.featuredImage}`} 
                alt={post.title} 
                style={styles.featuredImage} 
            />
            )}

            <h1 style={styles.title}>{post.title}</h1>
            <p style={styles.meta}>
            By {post.author.name} in <strong>{post.category}</strong> on {formatDate(post.createdAt)}
            </p>
            
            {isAuthor && (
            <div style={styles.authorActions}>
                <Link to={`/edit-post/${post.slug}`} style={styles.editButton}>Edit</Link>
                <button onClick={handleDelete} style={styles.deleteButton}>Delete</button>
            </div>
            )}

            <div
            style={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>

        <hr style={styles.divider} />

        <section>
            {userInfo ? (
            <AddCommentForm postSlug={post.slug} />
            ) : (
            <p>Please <Link to="/login">log in</Link> to leave a comment.</p>
            )}
            <CommentList />
        </section>
        </>
    );
};

// 2. Styles mein featuredImage add karein
const styles = {
    container: { lineHeight: '1.8' },
    featuredImage: {
        width: '100%',
        maxHeight: '400px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '2rem',
    },
    title: { fontSize: '2.5rem', marginBottom: '1rem' },
    meta: { color: '#555', marginBottom: '1rem' },
    authorActions: { marginBottom: '2rem' },
    editButton: { textDecoration: 'none', padding: '0.5rem 1rem', background: '#f0ad4e', color: 'white', borderRadius: '5px', marginRight: '1rem' },
    deleteButton: { padding: '0.5rem 1rem', background: '#d9534f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    content: { fontSize: '1.1rem', color: '#333' },
    divider: { border: 'none', borderTop: '1px solid #eee', margin: '3rem 0' }
};

export default PostDetailPage;