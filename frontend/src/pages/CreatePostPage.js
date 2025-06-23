// frontend/src/pages/CreatePostPage.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../features/posts/postSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/common/Spinner';
import axios from 'axios'; // 1. Axios ko import karein

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const MenuBar = ({ editor }) => {
    // ... MenuBar ka code waisa hi rahega ...
    if (!editor) {
        return null;
    }

    return (
        <div className="menu-bar" style={{ border: '1px solid #ddd', padding: '5px', marginBottom: '5px' }}>
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>Bold</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>Italic</button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>Strike</button>
        <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>Paragraph</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>H1</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>H2</button>
        </div>
    );
};

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [featuredImage, setFeaturedImage] = useState(''); // 2. Image path ke liye state
  const [uploading, setUploading] = useState(false); // 3. Uploading state

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.posts);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  // 4. File upload handler function
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      
      // Hum yahan axiosInstance ke bajaye direct axios istemal kar rahe hain taake base URL poora milay
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

    if (!title || content === '<p></p>') {
      return toast.error('Title and content are required!');
    }

    // 5. featuredImage ko post data ke sath bhejein
    const resultAction = await dispatch(createPost({ title, content, category, featuredImage }));
    
    if (createPost.fulfilled.match(resultAction)) {
      const newPost = resultAction.payload;
      toast.success('Post created successfully!');
      navigate(`/post/${newPost.slug}`);
    } else {
      toast.error(error || 'Failed to create post.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Create a New Post</h1>
      {loading && <Spinner />}
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* ... Title aur Category ke fields wese hi rahenge ... */}
        <div style={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {/* 6. File Input Field */}
        <div style={styles.formGroup}>
            <label htmlFor="image">Featured Image</label>
            <input
                type="text"
                id="image"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="Enter image URL or upload"
                style={styles.input}
            />
            <input
                type="file"
                id="image-file"
                onChange={uploadFileHandler}
                style={{ marginTop: '10px' }}
            />
            {uploading && <Spinner />}
        </div>
        
        {/* 7. Image Preview */}
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
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

// 8. Styles mein previewImage add karein
const styles = {
    container: { maxWidth: '800px', margin: 'auto' },
    form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    formGroup: { display: 'flex', flexDirection: 'column' },
    input: { padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' },
    button: { padding: '0.75rem', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' },
    previewImage: {
        marginTop: '1rem',
        maxWidth: '100%',
        maxHeight: '200px',
        objectFit: 'cover',
        borderRadius: '4px',
    }
};

export default CreatePostPage;