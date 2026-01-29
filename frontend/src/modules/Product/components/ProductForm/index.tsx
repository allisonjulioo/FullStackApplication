import { useState } from 'react';
import { Button } from 'components/Button';
import { Product } from 'modules/Product/types';
import { Form, FormInput, TextArea } from './styles';

interface ProductFormProps {
  onSubmit: (product: Omit<Product, 'id'>) => void;
}

export const ProductForm = ({ onSubmit }: ProductFormProps) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const resetFields = () => {
    setName('');
    setPrice('');
    setDescription('');
    setImage('');
    setCategory('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !description || !image || !category) {
      return;
    }

    onSubmit({
      name,
      price: Number(price),
      description,
      image,
      category,
    });

    resetFields();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Novo Produto</h3>
      <FormInput
        placeholder="Nome do produto"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <FormInput
        placeholder="Categoria"
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      />
      <FormInput
        type="number"
        step="0.01"
        placeholder="Preço"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />
      <TextArea
        placeholder="Descrição"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <FormInput
        placeholder="URL da imagem"
        value={image}
        onChange={e => setImage(e.target.value)}
        required
      />
      <Button type="submit">Cadastrar</Button>
    </Form>
  );
};
