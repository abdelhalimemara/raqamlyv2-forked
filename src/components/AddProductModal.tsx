import React, { useState } from 'react';
import { supabase, ensureValidSession } from '../supabaseClient';

// ... (keep the existing imports and interface)

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAddProduct }) => {
  // ... (keep the existing state variables)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await ensureValidSession();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('User not authenticated');

      let imageUrl = '';
      if (image) {
        const { data: imageData, error: imageError } = await supabase.storage
          .from('product-images')
          .upload(`${user.id}/${Date.now()}_${image.name}`, image);

        if (imageError) throw imageError;

        const { data: publicUrl } = supabase.storage
          .from('product-images')
          .getPublicUrl(imageData.path);

        imageUrl = publicUrl.publicUrl;
      }

      const newProduct = {
        user_id: user.id,
        name,
        description,
        price: parseFloat(price),
        category,
        image_url: imageUrl,
      };

      const { data, error } = await supabase.from('products').insert([newProduct]);

      if (error) throw error;

      onAddProduct(data[0]);
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ... (keep the rest of the component code)
};

export default AddProductModal;