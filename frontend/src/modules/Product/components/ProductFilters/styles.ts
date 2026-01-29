import styled from 'styled-components';
import { Input } from 'components/Input';
import { Button } from 'components/Button';

export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8em;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpointMD}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterInput = styled(Input)`
  flex: 1;
  min-width: 150px;
  font-size: 14px;
  padding: 0.7em 1em;
`;

export const Select = styled.select`
  background: ${({ theme }) => theme.common.white};
  color: ${({ theme }) => theme.typography.color};
  border: 1px solid ${({ theme }) => theme.palette.grey.main};
  padding: 0.7em 1em;
  border-radius: ${({ theme }) => theme.radius};
  font-size: 14px;
  font-family: Roboto, sans-serif;
  cursor: pointer;
`;

export const PriceGroup = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;

  span {
    color: #949494;
  }

  input {
    width: 120px;
  }

  @media (max-width: ${({ theme }) => theme.breakpointMD}) {
    input {
      width: 100%;
      flex: 1;
    }
  }
`;

export const ClearButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.palette.grey.main};
  padding: 0.7em 1em;
  border-radius: ${({ theme }) => theme.radius};
  font-size: 14px;
  font-family: Roboto, sans-serif;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.palette.grey.main};
  }
`;

export const ApplyButton = styled(Button)`
  display: none;
  width: 100%;
  margin-top: 0.5em;

  @media (max-width: ${({ theme }) => theme.breakpointMD}) {
    display: block;
  }
`;
