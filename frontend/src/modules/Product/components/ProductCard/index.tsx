import { Product } from "modules/Product/types";
import {
  CardContainer,
  ImageContainer,
  Info,
  TextGroup,
  Category,
  PriceBadge,
} from "./styles";
import { useMemo } from "react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const price = useMemo(
    () =>
      product.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    [],
  );
  
  return (
    <CardContainer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <ImageContainer>
        <img src={product.image} alt={product.name} loading="lazy" />
      </ImageContainer>
      <Info>
        <TextGroup>
          <h3>{product.name}</h3>
          <Category>{product.category}</Category>
        </TextGroup>
        <PriceBadge>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {price}
        </PriceBadge>
      </Info>
    </CardContainer>
  );
};
