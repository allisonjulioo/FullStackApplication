import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  z-index: 10;
`;

export const ModalBackdrop = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  min-height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`;

export const ModalBody = styled(motion.div)<{ $fullscreen?: boolean }>`
  position: absolute;
  padding: 3em 1em;
  border-radius: ${({ theme }) => theme.radius};
  background-color: ${({ theme }) => theme.common.white};
  z-index: 1;

  ${({ $fullscreen }) =>
    $fullscreen &&
    css`
      @media (max-width: ${({ theme }) => theme.breakpointMD}) {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 0;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
      }
    `}
`;

export const ModalClose = styled.button`
  position: absolute;
  right: 1em;
  top: 1em;
  z-index: 1;
  padding: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;
