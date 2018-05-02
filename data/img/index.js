
function tagToImg(tag) {
  if(!tag) {
    return;
  }
  const loweCaseTag = tag.toLowerCase();
  switch (loweCaseTag) {
    case 'food':
      return img_1;
    case 'adult':
      return img_2;
    case 'Alcohol':
      return img_3;
    case 'sound':
      return img_4;

    default:
      return;
  }
}

export {
  tagToImg
};
