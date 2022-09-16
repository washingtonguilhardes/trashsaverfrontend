import styled from '@emotion/styled';

import Box from '@mui/material/Box';

export const BoxScroll = styled(Box)<{ outerHeight?: string }>`
  height: calc(100vh - ${({ outerHeight = '198px' }) => outerHeight});
  overflow: auto;
  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-image: linear-gradient(180deg, #009be5 0%, #708ad4 99%);
    box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
  }
`;
