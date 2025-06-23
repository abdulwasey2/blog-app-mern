// frontend/src/pages/EditPostPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostBySlug, updatePost, resetPostState } from '../features/posts/postSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/common/Spinner';
import axios from 'axios'; // 1. Import axios

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const MenuBar = ({ editor }) => {
    // ... MenuBar ka code waisa hi rahega ...
    if (!editor) return null;
    return (
        <div className="menu-bar" style={{ border: '1px solid #ddd', padding: '5px', marginBottom: '5px' }}>
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
        </div>
    );
};

const EditPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { post, loading, error } = useSelector((state) => state.posts);
  const { userInfo } = useSelector((state) => state.auth);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [featuredImage, setFeaturedImage] = useState(''); // 2. State for image
  const [uploading, setUploading] = useState(false); // 3. State for uploading

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  useEffect(() => {
    if (!post || post.slug !== slug) {
      dispatch(getPostBySlug(slug));
    } else {
      if (post.author._id !== userInfo._id) {
        toast.error("You are not authorized to edit this post.");
        navigate('/');
      } else {
        setTitle(post.title);
        setCategory(post.category);
        setFeaturedImage(post.featuredImage || ''); // 4. Set initial image
        if (editor && post.content) {
          editor.commands.setContent(post.content);
        }
      }
    }
    if (error) {
      toast.error(error);
      navigate('/');
    }
  }, [post, error, userInfo, navigate, editor, dispatch, slug]);

  // 5. File upload handler function
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);
      setFeaturedImage(data.image);
      setUploading(false);
      toast.success('Image uploaded successfully!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Image upload failed');
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = editor.getHTML();
    const postData = { title, content, category, featuredImage }; // 6. Add image to data
    const resultAction = await dispatch(updatePost({ slug, postData }));

    if (updatePost.fulfilled.match(resultAction)) {
      toast.success('Post updated successfully!');
      navigate(`/post/${resultAction.payload.slug}`);
    } else {
      toast.error(resultAction.payload || 'Failed to update post.');
    }
  };

  if (loading || !post || !editor) {
    return <Spinner />;
  }

  return (
    <div style={styles.container}>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* ... Title aur Category ke fields ... */}
        <div style={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input} required />
        </div>
        
        {/* 7. File Input Field */}
        <div style={styles.formGroup}>
            <label htmlFor="image">Featured Image</label>
            <input type="text" id="image" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} style={styles.input} />
            <input type="file" id="image-file" onChange={uploadFileHandler} style={{ marginTop: '10px' }} />
            {uploading && <Spinner />}
        </div>
        
        {/* 8. Image Preview */}
        {featuredImage && (
            <div style={styles.formGroup}>
                <label>Image Preview</label>
                <img src={`http://localhost:5000${featuredImage}`} alt="Preview" style={styles.previewImage} />
            </div>
        )}

        <div style={styles.formGroup}>
          <label>Content</label>
          <div style={{ border: '1px solid #ddd', borderRadius: '4px', minHeight: '250px' }}>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} style={{ padding: '10px' }} />
          </div>
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
};

// 9. Styles mein previewImage add karein
const styles = {
    container: { maxWidth: '800px', margin: 'auto' },
    form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    formGroup: { display: 'flex', flexDirection: 'column' },
    input: { padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' },
    button: { padding: '0.75rem', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' },
    previewImage: {
        marginTop: '1rem',
        maxWidth: '100%',
        maxHeight: '200px',
        objectFit: 'cover',
        borderRadius: '4px',
    }
};

export default EditPostPage;