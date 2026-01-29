import styled from 'styled-components';
import { Input } from 'components/Input';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
  min-width: 320px;

  @media (max-width: ${({ theme }) => theme.breakpointMD}) {
    min-width: auto;
    width: 100%;
    padding-top: 1em;
  }

  h3 {
    margin-bottom: 0.5em;
  }
`;

export const FormInput = styled(Input)`
  width: 100%;
  font-size: 14px;
`;

export const TextArea = styled.textarea`
  background: ${({ theme }) => theme.common.white};
  color: ${({ theme }) => theme.typography.color};
  border: 1px solid ${({ theme }) => theme.palette.grey.main};
  padding: 1em;
  border-radius: ${({ theme }) => theme.radius};
  font-family: Roboto, sans-serif;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
`;
