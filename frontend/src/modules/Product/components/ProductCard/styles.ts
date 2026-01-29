import { motion } from 'framer-motion';
import styled from 'styled-components';

export const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.common.white};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  border: 1px solid ${({ theme }) => theme.palette.grey.main};

  &:hover {
    box-shadow: 0 8px 24px rgb(51 51 51 / 12%);
    transform: translateY(-2px);
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: #f0efeb;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  padding: 0.8em 1em;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.5em;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  h3 {
    font-size: 15px;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Category = styled.span`
  font-size: 12px !important;
  color: #949494;
`;

export const PriceBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 2px;
  background: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.contrastText} !important;
  font-size: 13px !important;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;

  svg {
    flex-shrink: 0;
  }
`;
