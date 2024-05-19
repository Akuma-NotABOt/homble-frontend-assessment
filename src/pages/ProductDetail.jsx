import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Collapse, Button } from 'react-bootstrap';
import { useProduct } from '../hooks/useProducts'; // Adjust the import path as necessary
import Layout from './Layout';

const ProductDetail = () => {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const [openDescription, setOpenDescription] = useState(false);
  const [openAllergens, setOpenAllergens] = useState(false);
  const [openUsage, setOpenUsage] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <h1>{product.name}</h1>
      <p>Price: {product.selling_price}rs</p>

      <Button
        onClick={() => setOpenDescription(!openDescription)}
        aria-controls="description"
        aria-expanded={openDescription}
      >
        Description
      </Button>
      <Collapse in={openDescription}>
        <div id="description" className={`collapseContent ${openDescription ? 'show' : 'hidden'}`}>
          <p>{product.description}</p>
        </div>
      </Collapse>

      <Button
        onClick={() => setOpenAllergens(!openAllergens)}
        aria-controls="allergens"
        aria-expanded={openAllergens}
      >
        Allergen Information
      </Button>
      <Collapse in={openAllergens}>
        <div id="allergens" className={`collapseContent ${openAllergens ? 'show' : 'hidden'}`}>
          <p>{product.allergen_info}</p>
        </div>
      </Collapse>

      <Button
        onClick={() => setOpenUsage(!openUsage)}
        aria-controls="usage"
        aria-expanded={openUsage}
      >
        Usage Instructions
      </Button>
      <Collapse in={openUsage}>
        <div id="usage" className={`collapseContent ${openUsage ? 'show' : 'hidden'}`}>
          <p>{product.cooking_instruction}</p>
        </div>
      </Collapse>
    </Layout>
  );
};

export default ProductDetail;
