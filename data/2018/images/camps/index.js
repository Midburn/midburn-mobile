import _ from 'lodash';

export const CAMP_PLACEHOLDER = require('./../midburn_logo.png');


const IMAGES = {
  '/e751afa4-ed2a-44ec-b276-97c1eefae97a': require('./e751afa4-ed2a-44ec-b276-97c1eefae97a/coverUrl.jpg'),
  '/f1cea124-1d7d-4cc2-83d6-32acc2335182': require('./f1cea124-1d7d-4cc2-83d6-32acc2335182/coverUrl.jpg'),
  '/a3d73004-1cb8-40de-87f6-70b239c669b7': require('./a3d73004-1cb8-40de-87f6-70b239c669b7/coverUrl.jpg'),
  '/95c01d21-c5aa-4d07-b1f3-c64adcd34a27': require('./95c01d21-c5aa-4d07-b1f3-c64adcd34a27/coverUrl.jpg'),
  '/f2c0533f-1f03-4238-9a47-22fc1a803b7b': require('./f2c0533f-1f03-4238-9a47-22fc1a803b7b/coverUrl.jpg'),
  '/9d947a8b-cacf-4a43-b8f6-cd5347458e52': require('./9d947a8b-cacf-4a43-b8f6-cd5347458e52/coverUrl.jpg'),
  '/e8acd228-95c1-431a-95db-1a70679a1614': require('./e8acd228-95c1-431a-95db-1a70679a1614/coverUrl.jpg'),
  '/c5261ef4-b54a-47f0-8476-01e299879acc': require('./c5261ef4-b54a-47f0-8476-01e299879acc/coverUrl.jpg'),
  '/051a0bf3-36fc-4b37-ad83-34711e49e6a5': require('./051a0bf3-36fc-4b37-ad83-34711e49e6a5/coverUrl.jpg'),
  '/94bdf72d-649d-48ae-b09e-e13bdaf82dfa': require('./94bdf72d-649d-48ae-b09e-e13bdaf82dfa/coverUrl.jpg'),
  '/a7bf3174-727c-454d-87e6-cffdaa4184c3': require('./a7bf3174-727c-454d-87e6-cffdaa4184c3/coverUrl.jpg'),
  '/ea38295e-e363-4854-b49d-042ad71df6e3': require('./ea38295e-e363-4854-b49d-042ad71df6e3/coverUrl.jpg'),
  '/40095f70-154a-44f7-a4ef-9980fdd9b3c3': require('./40095f70-154a-44f7-a4ef-9980fdd9b3c3/coverUrl.jpg'),
  '/9a158765-98cd-4013-a8a4-8aa81ce277c7': require('./9a158765-98cd-4013-a8a4-8aa81ce277c7/coverUrl.jpg'),
  '/1f9dceb9-0ac5-4774-8a0f-98c6394a4018': require('./1f9dceb9-0ac5-4774-8a0f-98c6394a4018/coverUrl.jpg'),
  '/05ffd18b-1471-44c5-935d-8aed3e6053fd': require('./05ffd18b-1471-44c5-935d-8aed3e6053fd/coverUrl.jpg'),
  '/68563302-e4c3-412e-b460-1a6706e1adb6': require('./68563302-e4c3-412e-b460-1a6706e1adb6/coverUrl.jpg'),
  '/ab552f7a-ce9b-4f8c-96c8-2f086ee871d1': require('./ab552f7a-ce9b-4f8c-96c8-2f086ee871d1/coverUrl.jpg'),
  '/6a567cc6-1211-4c7e-8fb7-119339daadb2': require('./6a567cc6-1211-4c7e-8fb7-119339daadb2/coverUrl.jpg'),
  '/8e6c8f52-62c7-49ce-978f-be9b6a7682a8': require('./8e6c8f52-62c7-49ce-978f-be9b6a7682a8/coverUrl.jpg'),
  '/a15f4d1d-f895-49f6-8724-c3eb0bfdc389': require('./a15f4d1d-f895-49f6-8724-c3eb0bfdc389/coverUrl.jpg'),
  '/86fc20f2-9b41-4bd3-868a-4c97ec936260': require('./86fc20f2-9b41-4bd3-868a-4c97ec936260/coverUrl.jpg'),
  '/e5d0895f-5e02-4ce3-8307-c990fea3423b': require('./e5d0895f-5e02-4ce3-8307-c990fea3423b/coverUrl.jpg'),
  '/782c8eb2-0334-4221-b1c8-23fe4624523e': require('./782c8eb2-0334-4221-b1c8-23fe4624523e/coverUrl.jpg'),
  '/9277cb32-9b72-4040-a690-5c041cc600d1': require('./9277cb32-9b72-4040-a690-5c041cc600d1/coverUrl.jpg'),
  '/882315f6-0942-42fc-840b-dfbdcc12d8d2': require('./882315f6-0942-42fc-840b-dfbdcc12d8d2/coverUrl.jpg'),
  '/e77e07ee-e1ec-4074-b84a-f2f2987d947e': require('./e77e07ee-e1ec-4074-b84a-f2f2987d947e/coverUrl.jpg'),
  '/b53aef66-0dc9-4609-bca4-3914523f974f': require('./b53aef66-0dc9-4609-bca4-3914523f974f/coverUrl.jpg'),
  '/b7646080-eb24-404f-8010-c434bedcba59': require('./b7646080-eb24-404f-8010-c434bedcba59/coverUrl.jpg'),
  '/c5569ce5-8ee8-486d-9887-0355a3de5d46': require('./c5569ce5-8ee8-486d-9887-0355a3de5d46/coverUrl.jpg'),
  '/f5ca6437-b4ed-48f1-bed5-33a38f128d3f': require('./f5ca6437-b4ed-48f1-bed5-33a38f128d3f/coverUrl.jpg'),
  '/db052c9d-5bc3-42e4-a1b0-d2b264f7a82b': require('./db052c9d-5bc3-42e4-a1b0-d2b264f7a82b/coverUrl.jpg'),
  '/62fbd595-f469-4235-8a17-a4197a40b389': require('./62fbd595-f469-4235-8a17-a4197a40b389/coverUrl.jpg'),
  '/704b15f0-ddca-4e6a-a4f7-b6e0c7bb79d6': require('./704b15f0-ddca-4e6a-a4f7-b6e0c7bb79d6/coverUrl.jpg'),
  '/edfb0cb6-1e9c-4f48-96af-0ff6dc1221e1': require('./edfb0cb6-1e9c-4f48-96af-0ff6dc1221e1/coverUrl.jpg'),
  '/98e97258-eee1-4827-979f-2e969fac08be': require('./98e97258-eee1-4827-979f-2e969fac08be/coverUrl.jpg'),
  '/d6efdd4e-d1f8-480c-a354-af0ad8e2be55': require('./d6efdd4e-d1f8-480c-a354-af0ad8e2be55/coverUrl.jpg'),
  '/293a7165-e800-48d1-a8b0-a85b4714a5f5': require('./293a7165-e800-48d1-a8b0-a85b4714a5f5/coverUrl.jpg'),
  '/ce3df9a5-98d8-415f-b51d-427d93fdaead': require('./ce3df9a5-98d8-415f-b51d-427d93fdaead/coverUrl.jpg'),
  '/01cb5b81-03da-4c62-9d9d-39d07e9d68d4': require('./01cb5b81-03da-4c62-9d9d-39d07e9d68d4/coverUrl.jpg'),
  '/422fd4ef-0f50-416d-b2d5-75bef1f5d768': require('./422fd4ef-0f50-416d-b2d5-75bef1f5d768/coverUrl.jpg'),
  '/43ffa9b0-691e-4ee0-af0c-a15ccdf90dbf': require('./43ffa9b0-691e-4ee0-af0c-a15ccdf90dbf/coverUrl.jpg'),
  '/c0d55e19-e4da-4472-8d35-2dc13566fc54': require('./c0d55e19-e4da-4472-8d35-2dc13566fc54/coverUrl.jpg'),
  '/5550ea99-e7d4-4ab1-b00a-8c24a2bcf121': require('./5550ea99-e7d4-4ab1-b00a-8c24a2bcf121/coverUrl.jpg'),
  '/5cbf7648-60bc-4eaa-a499-4fdd1f4542a0': require('./5cbf7648-60bc-4eaa-a499-4fdd1f4542a0/coverUrl.jpg'),
  '/2af160db-947c-4d00-9632-ade5df521d53': require('./2af160db-947c-4d00-9632-ade5df521d53/coverUrl.jpg'),
  '/4aced4e7-0a4b-49a4-8d54-e408742ea659': require('./4aced4e7-0a4b-49a4-8d54-e408742ea659/coverUrl.jpg'),
  '/60f676ec-3b20-40e5-ab41-7ca792b122df': require('./60f676ec-3b20-40e5-ab41-7ca792b122df/coverUrl.jpg'),
  '/2d864e8c-8daa-4b6b-a71e-699f91e250e1': require('./2d864e8c-8daa-4b6b-a71e-699f91e250e1/coverUrl.jpg'),
  '/d7d763ea-80e2-40de-a69c-cda975ea5134': require('./d7d763ea-80e2-40de-a69c-cda975ea5134/coverUrl.jpg'),
  '/7bf1241d-f904-448b-b030-c06018eac369': require('./7bf1241d-f904-448b-b030-c06018eac369/coverUrl.jpg'),
  '/a45ddd4e-5d81-48de-9103-1dc95f8eb342': require('./a45ddd4e-5d81-48de-9103-1dc95f8eb342/coverUrl.jpg'),
  '/89030e42-6eda-4270-b753-f2615854d339': require('./89030e42-6eda-4270-b753-f2615854d339/coverUrl.jpg'),
  '/d71f6151-aab2-4039-a027-b06720369730': require('./d71f6151-aab2-4039-a027-b06720369730/coverUrl.jpg'),
  '/f87319d4-db3e-4cb2-bfb5-ef2b8b1f67d2': require('./f87319d4-db3e-4cb2-bfb5-ef2b8b1f67d2/coverUrl.jpg'),
  '/f4ad7398-b8fd-4fd9-94cc-b3b10a492860': require('./f4ad7398-b8fd-4fd9-94cc-b3b10a492860/coverUrl.jpg'),
  '/54c82ed4-f01e-4128-a71d-6764e9d2731c': require('./54c82ed4-f01e-4128-a71d-6764e9d2731c/coverUrl.jpg'),
  '/fdb265f2-2d89-4760-8ba3-ccd8abbabfc1': require('./fdb265f2-2d89-4760-8ba3-ccd8abbabfc1/coverUrl.jpg'),
  '/908ead14-fdf8-4348-9021-e04c7b45dfac': require('./908ead14-fdf8-4348-9021-e04c7b45dfac/coverUrl.jpg'),
  '/e200f32a-6d18-4e66-8423-4ee9b27fca48': require('./e200f32a-6d18-4e66-8423-4ee9b27fca48/coverUrl.jpg')
}



export function getImageForCampId(id) {
  if (!id) {
    return CAMP_PLACEHOLDER;
  }
  return _.get(IMAGES, `${id}`, CAMP_PLACEHOLDER);
}
