import _ from 'lodash';

export const CAMPS_PLACEHOLDER = require('./../../../cover-images/cover1.jpg');


const IMAGES = {
    '03711aa6-153e-476b-901f-ae4306d61363': require('./03711aa6-153e-476b-901f-ae4306d61363/covertUrl.jpg'),
    '0b5bf6f9-3102-4498-8591-1263077f9cb3': require('./0b5bf6f9-3102-4498-8591-1263077f9cb3/covertUrl.jpg'),
    '0e1f3140-e620-4ecd-b944-3a4a0d9bf8de': require('./0e1f3140-e620-4ecd-b944-3a4a0d9bf8de/covertUrl.jpg'),
    '0ecc57fd-d749-4546-b96c-9684fb039314': require('./0ecc57fd-d749-4546-b96c-9684fb039314/covertUrl.jpg'),
    '1bd6cd54-9741-4308-89a3-45dca46d1ee0': require('./1bd6cd54-9741-4308-89a3-45dca46d1ee0/covertUrl.jpg'),
    '1c354768-d9ad-4486-87f6-14fdd805180a': require('./1c354768-d9ad-4486-87f6-14fdd805180a/covertUrl.jpg'),
    '2af26d04-d304-4b92-9e06-978db6ab79a0': require('./2af26d04-d304-4b92-9e06-978db6ab79a0/covertUrl.jpg'),
    '2b47a968-fccf-4640-bd78-b7fd8f5c197c': require('./2b47a968-fccf-4640-bd78-b7fd8f5c197c/covertUrl.jpg'),
    '2fc8a99b-b054-445b-af2f-160c0509cfa5': require('./2fc8a99b-b054-445b-af2f-160c0509cfa5/covertUrl.jpg'),
    '3379faf4-44f7-44c9-a155-7890c1475ff2': require('./3379faf4-44f7-44c9-a155-7890c1475ff2/covertUrl.jpg'),
    '36b97a9c-3b35-4c1f-9d9a-473d70fb9c33': require('./36b97a9c-3b35-4c1f-9d9a-473d70fb9c33/covertUrl.jpg'),
    '3d3a942c-5583-4779-9352-0be97310a7df': require('./3d3a942c-5583-4779-9352-0be97310a7df/covertUrl.jpg'),
    '3da09151-97be-4206-8a41-ba1ae00671c6': require('./3da09151-97be-4206-8a41-ba1ae00671c6/covertUrl.jpg'),
    '49fcf3d9-892f-4bd3-8e49-46ad3653d94b': require('./49fcf3d9-892f-4bd3-8e49-46ad3653d94b/covertUrl.jpg'),
    '506c125a-9e13-49d2-970f-3876cdfdfd4b': require('./506c125a-9e13-49d2-970f-3876cdfdfd4b/covertUrl.jpg'),
    '5342e954-0f4b-484f-af51-60ce253c260b': require('./5342e954-0f4b-484f-af51-60ce253c260b/covertUrl.jpg'),
    '539404f8-0358-4db6-8961-074f99111503': require('./539404f8-0358-4db6-8961-074f99111503/covertUrl.jpg'),
    '5810361f-9324-4015-8c20-2eb51abe3fda': require('./5810361f-9324-4015-8c20-2eb51abe3fda/covertUrl.jpg'),
    '5d3491d1-4518-4101-901a-a12359f0d8e2': require('./5d3491d1-4518-4101-901a-a12359f0d8e2/covertUrl.jpg'),
    '60704a15-d3d1-45b3-adad-eb547bfdfed2': require('./60704a15-d3d1-45b3-adad-eb547bfdfed2/covertUrl.jpg'),
    '616ccd42-eaf0-489a-8191-20a1003bdf3e': require('./616ccd42-eaf0-489a-8191-20a1003bdf3e/covertUrl.jpg'),
    '69419a98-02d8-4521-97db-b7c11c34fff4': require('./69419a98-02d8-4521-97db-b7c11c34fff4/covertUrl.jpg'),
    '698c5e09-1493-44d8-8838-047527d18930': require('./698c5e09-1493-44d8-8838-047527d18930/covertUrl.jpg'),
    '6be7fe97-ae70-4432-b029-c8d73bade417': require('./6be7fe97-ae70-4432-b029-c8d73bade417/covertUrl.jpg'),
    '6c367e4f-4649-4809-aa7e-67c0ecfb21fe': require('./6c367e4f-4649-4809-aa7e-67c0ecfb21fe/covertUrl.jpg'),
    '71f650d2-8b68-4039-b243-afcc61aeb9bf': require('./71f650d2-8b68-4039-b243-afcc61aeb9bf/covertUrl.jpg'),
    '71fb6e94-c90c-484f-9b75-85d17bd55d4c': require('./71fb6e94-c90c-484f-9b75-85d17bd55d4c/covertUrl.jpg'),
    '750c6cf4-bab9-4efc-9875-045df7785b8a': require('./750c6cf4-bab9-4efc-9875-045df7785b8a/covertUrl.jpg'),
    '7552de67-ae51-4284-b142-2ea2a2906443': require('./7552de67-ae51-4284-b142-2ea2a2906443/covertUrl.jpg'),
    '7d82ef05-c132-4b40-aae6-6385055282aa': require('./7d82ef05-c132-4b40-aae6-6385055282aa/covertUrl.jpg'),
    '7f7583da-743f-47d7-b2b7-a59f88cb7e91': require('./7f7583da-743f-47d7-b2b7-a59f88cb7e91/covertUrl.jpg'),
    '85e43ee1-8f2a-443e-8cb3-7d3e5f8bdb21': require('./85e43ee1-8f2a-443e-8cb3-7d3e5f8bdb21/covertUrl.jpg'),
    '8b475956-4afd-4542-8988-92b54eccd03f': require('./8b475956-4afd-4542-8988-92b54eccd03f/covertUrl.jpg'),
    '8c3aaffe-877a-4657-aa34-3c514f5248bd': require('./8c3aaffe-877a-4657-aa34-3c514f5248bd/covertUrl.jpg'),
    '8f581bf1-a45f-487e-9582-98c46cdbcf52': require('./8f581bf1-a45f-487e-9582-98c46cdbcf52/covertUrl.jpg'),
    '9046c5d7-c39a-4683-b66a-5ec4ca97d14c': require('./9046c5d7-c39a-4683-b66a-5ec4ca97d14c/covertUrl.jpg'),
    '91e7cc7e-062a-45fb-804d-5ff7895f00bf': require('./91e7cc7e-062a-45fb-804d-5ff7895f00bf/covertUrl.jpg'),
    '947b6b4f-2336-4c37-a170-96707fa91bb0': require('./947b6b4f-2336-4c37-a170-96707fa91bb0/covertUrl.jpg'),
    '96465de4-61f5-4449-a0b0-2d23c90d6d4c': require('./96465de4-61f5-4449-a0b0-2d23c90d6d4c/covertUrl.jpg'),
    '9676de10-2677-4498-ba0c-fc31190e91af': require('./9676de10-2677-4498-ba0c-fc31190e91af/covertUrl.jpg'),
    '98fe92e8-e7a5-4473-b233-4fd42acb5adf': require('./98fe92e8-e7a5-4473-b233-4fd42acb5adf/covertUrl.jpg'),
    '9f037946-bd80-443f-b704-eefb900bb73c': require('./9f037946-bd80-443f-b704-eefb900bb73c/covertUrl.jpg'),
    'a1d25ef4-090f-4c94-be0d-4cec4c924a65': require('./a1d25ef4-090f-4c94-be0d-4cec4c924a65/covertUrl.jpg'),
    'a5d98eaf-892a-4972-8904-1ea4347adb23': require('./a5d98eaf-892a-4972-8904-1ea4347adb23/covertUrl.jpg'),
    'a676f51f-ecb7-4a55-8512-a1b58c6d3081': require('./a676f51f-ecb7-4a55-8512-a1b58c6d3081/covertUrl.jpg'),
    'b06c5abd-ee5a-40e7-8315-760e9e91db3d': require('./b06c5abd-ee5a-40e7-8315-760e9e91db3d/covertUrl.jpg'),
    'b229f868-6d11-4dce-bebf-4c908a6d7bd7': require('./b229f868-6d11-4dce-bebf-4c908a6d7bd7/covertUrl.jpg'),
    'b6e65ecc-e33f-41d0-89c9-c5bcbe9a13c1': require('./b6e65ecc-e33f-41d0-89c9-c5bcbe9a13c1/covertUrl.jpg'),
    'b8fe8143-ac87-4c18-bf47-99110c8f1eea': require('./b8fe8143-ac87-4c18-bf47-99110c8f1eea/covertUrl.jpg'),
    'bb976707-5587-4d6c-96f8-8ef5f856960b': require('./bb976707-5587-4d6c-96f8-8ef5f856960b/covertUrl.jpg'),
    'bddee059-8bdf-4013-bdc7-00410aa38d23': require('./bddee059-8bdf-4013-bdc7-00410aa38d23/covertUrl.jpg'),
    'be527b10-3387-4713-b724-0c910e01708d': require('./be527b10-3387-4713-b724-0c910e01708d/covertUrl.jpg'),
    'd1faa7fb-b963-4a9d-a380-0d6d171a427c': require('./d1faa7fb-b963-4a9d-a380-0d6d171a427c/covertUrl.jpg'),
    'd6810a33-622f-4eec-bf71-fbe59b2faf38': require('./d6810a33-622f-4eec-bf71-fbe59b2faf38/covertUrl.jpg'),
    'de3d3a88-4670-42ed-8642-d8fc23463a5e': require('./de3d3a88-4670-42ed-8642-d8fc23463a5e/covertUrl.jpg'),
    'e1396abb-ed16-41ec-8737-f2c3903a6097': require('./e1396abb-ed16-41ec-8737-f2c3903a6097/covertUrl.jpg'),
    'e563322f-468d-4a44-9f38-90a97842dfc6': require('./e563322f-468d-4a44-9f38-90a97842dfc6/covertUrl.jpg'),
    'ee40ead2-ce8b-4f98-8fd7-bb620cbc32d4': require('./ee40ead2-ce8b-4f98-8fd7-bb620cbc32d4/covertUrl.jpg'),
    'f0b6dde7-3c6a-4357-9ebb-ed6fd5119e10': require('./f0b6dde7-3c6a-4357-9ebb-ed6fd5119e10/covertUrl.jpg'),
    'f23bc674-fb2e-4ce9-a1e2-a48f0d345d3c': require('./f23bc674-fb2e-4ce9-a1e2-a48f0d345d3c/covertUrl.jpg'),
    'f520f219-0501-4496-a424-612ce1a3003a': require('./f520f219-0501-4496-a424-612ce1a3003a/covertUrl.jpg'),
    'fbcd741b-9984-4c6d-ab0b-665d6bee45a9': require('./fbcd741b-9984-4c6d-ab0b-665d6bee45a9/covertUrl.jpg'),
    'fc088589-730c-4ac3-bff3-71cb6d99e985': require('./fc088589-730c-4ac3-bff3-71cb6d99e985/covertUrl.jpg'),
    'fff01a8a-4563-48cf-8f9e-858e02cc5304': require('./fff01a8a-4563-48cf-8f9e-858e02cc5304/covertUrl.jpg'),
}

export function getImageForCampId(id) {
    if (!id) {
        return CAMPS_PLACEHOLDER;
    }
    return _.get(IMAGES, `${id}`, CAMPS_PLACEHOLDER);
}
