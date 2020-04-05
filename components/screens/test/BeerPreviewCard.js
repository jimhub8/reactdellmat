import React from 'react';
import glamorous from 'glamorous-native';

// app theme colors
// import { colors } from '../../../config/theme';

// components
// import Title from '../../../config/Title';
import ContainedImage from '../../../config/ContainedImage';
import { Text } from 'react-native';

const CardContainer = glamorous.view((props, theme) => ({
  height: 160,
  width: '85%',
  left: '7.5%',
  justifyContent: 'space-around'
}));

const CardImageContainer = glamorous.view((props, theme) => ({
  flex: 1,
  alignItems: 'stretch'
}));

const BeerNameContainer = glamorous.view((props, theme) => ({
  height: '30%',
  backgroundColor: '#007aff',
  justifyContent: 'center'
}));

const BeerPreviewCard = ({ name, imageUrl }) => {
  return (
    <CardContainer>
      <CardImageContainer>
        <ContainedImage source={{ uri: imageUrl }} />
      </CardImageContainer>
      <BeerNameContainer>
        <Text>
          Test
        </Text>
      </BeerNameContainer>
    </CardContainer>
  );
};

export default BeerPreviewCard;