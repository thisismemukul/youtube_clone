import React from 'react';
import styled from 'styled-components';
import { SPACING, SIZES } from '../constants';
const Container = styled.div`

  display: flex;
  gap: ${SPACING.s}px;
  margin-bottom: ${SIZES.extremeLarge}px;
`;
const Avatar = styled.img`
width: 36px;
height: 36px;
border-radius: 50%;
`;
const Details = styled.div`
display: flex;
flex-direction: column;
gap: ${SPACING.s}px;
color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
font-size: ${SIZES.font}px;
font-weight: 500;
`;
const Date = styled.span`
font-size: ${SIZES.small}px;
font-weight: 400;
color: ${({ theme }) => theme.textSoft};
margin-left: ${SPACING.xs}px;
`;
const Text = styled.span`
font-size: ${SIZES.body}px;
`;
const Comment = () => {
  return (
    <Container>
      <Avatar src='https://yt3.ggpht.com/k-_HJtdmP1EiG-ypRyZygN6UmyA9lpI0mR-BBkiDADVuGTAYSnMe4Wz6gv635JGeZWoBHrzXZpc=s88-c-k-c0x00ffffff-no-rj-mo' />
      <Details>
        <Name>Jonh Doe  <Date>2 hours ago</Date></Name>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Pellentesque euismod, nisi eu consectetur consectetur,
          nisl nisi consectetur nisl, eu consectetur nisl nisi euismod,
          nisl nisi consectetur nisl, eu consectetur nisl nisi euismod,
          nisl nisi consectetur nisl, eu consectetur nisl nisi euismod,
        </Text>
      </Details>
    </Container>
  )
}

export default Comment