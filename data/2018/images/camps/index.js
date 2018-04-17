import _ from 'lodash';

export const CAMP_PLACEHOLDER = require('./../midburn_logo.png');


const IMAGES = {
  '018c2fa1-e0cc-4208-a3f8-72ee4ed8a750': require('./018c2fa1-e0cc-4208-a3f8-72ee4ed8a750'),
  '128725bc-ed85-414b-b013-4f6a1bccf4f9': require('./128725bc-ed85-414b-b013-4f6a1bccf4f9'),
  '12fdf79d-f8b5-4ee3-a8cb-0652a5646824': require('./12fdf79d-f8b5-4ee3-a8cb-0652a5646824'),
  '15226ad6-8bda-47d4-93fa-29d41efa58c0': require('./15226ad6-8bda-47d4-93fa-29d41efa58c0'),
  '1789c858-fa7c-45d5-8e58-63d01c4f56d1': require('./1789c858-fa7c-45d5-8e58-63d01c4f56d1'),
  '214a7a1a-d5df-4e9f-87b4-2f6f76774619': require('./214a7a1a-d5df-4e9f-87b4-2f6f76774619'),
  '226fe6f5-a62a-4e79-baa8-01e643bcbcc9': require('./226fe6f5-a62a-4e79-baa8-01e643bcbcc9'),
  '26c48a40-570f-49d5-a2d1-23d97f49e18f': require('./26c48a40-570f-49d5-a2d1-23d97f49e18f'),
  '286e1b44-e76c-47de-b0d4-5dadbe7de319': require('./286e1b44-e76c-47de-b0d4-5dadbe7de319'),
  '2a925cf3-b80c-4da6-92d5-74380a4f0546': require('./2a925cf3-b80c-4da6-92d5-74380a4f0546'),
  '2bdfa4e9-bc56-429a-8cf9-eeebc7ef74c7': require('./2bdfa4e9-bc56-429a-8cf9-eeebc7ef74c7'),
  '2c98c273-e1bb-42ce-8992-a1d377f38b22': require('./2c98c273-e1bb-42ce-8992-a1d377f38b22'),
  '2d7e8200-99b3-465c-ba5d-1a2dada03ee7': require('./2d7e8200-99b3-465c-ba5d-1a2dada03ee7'),
  '2eeae3dd-90fe-4c9c-b257-a84ce2c5f05f': require('./2eeae3dd-90fe-4c9c-b257-a84ce2c5f05f'),
  '2ff64266-c304-4bb7-a04c-3f9c69cab844': require('./2ff64266-c304-4bb7-a04c-3f9c69cab844'),
  '31fcb724-13f2-4745-bad5-ce59acc036b1': require('./31fcb724-13f2-4745-bad5-ce59acc036b1'),
  '3c984a70-297e-487e-bcfa-28b73aecfcd5': require('./3c984a70-297e-487e-bcfa-28b73aecfcd5'),
  '43a412fa-5338-4d50-988b-627dc6d619f4': require('./43a412fa-5338-4d50-988b-627dc6d619f4'),
  '473d5fbc-3c08-4fa9-930e-bc5ce7e18cba': require('./473d5fbc-3c08-4fa9-930e-bc5ce7e18cba'),
  '554daa08-7438-4225-821e-dbe231bc0457': require('./554daa08-7438-4225-821e-dbe231bc0457'),
  '61cc1d3f-e73a-4a5e-93ff-b5a2b11e8f0b': require('./61cc1d3f-e73a-4a5e-93ff-b5a2b11e8f0b'),
  '63a22ead-4de3-4385-a8b1-df88de302ec1': require('./63a22ead-4de3-4385-a8b1-df88de302ec1'),
  '65802e26-e153-42ab-9019-e979cf67e3dc': require('./65802e26-e153-42ab-9019-e979cf67e3dc'),
  '665b689c-01a4-4303-95e7-a225ffb3ed45': require('./665b689c-01a4-4303-95e7-a225ffb3ed45'),
  '69c0deab-dc00-4d6b-b4bb-e1362eaeba3a': require('./69c0deab-dc00-4d6b-b4bb-e1362eaeba3a'),
  '69d2f963-fa2e-4125-8729-84ee499944cf': require('./69d2f963-fa2e-4125-8729-84ee499944cf'),
  '7257b323-b43b-4809-9960-f32bf8fa1607': require('./7257b323-b43b-4809-9960-f32bf8fa1607'),
  '7b166c49-1590-42e0-a219-be42b27542b0': require('./7b166c49-1590-42e0-a219-be42b27542b0'),
  '7bd86485-01c3-4526-bff0-71171184b022': require('./7bd86485-01c3-4526-bff0-71171184b022'),
  '7c865297-3786-44dc-8323-0e46e9264626': require('./7c865297-3786-44dc-8323-0e46e9264626'),
  '7ed8c617-846e-4a99-8aed-45c428118e24': require('./7ed8c617-846e-4a99-8aed-45c428118e24'),
  '7f9c7edc-0e3a-4cdc-b481-c48ce0ab20e9': require('./7f9c7edc-0e3a-4cdc-b481-c48ce0ab20e9'),
  '81f295b1-f4f8-4c63-9be7-48036f2011c7': require('./81f295b1-f4f8-4c63-9be7-48036f2011c7'),
  '84f1983f-1cdf-4bdd-97a3-ba0c4e400552': require('./84f1983f-1cdf-4bdd-97a3-ba0c4e400552'),
  '88fe5164-4ad2-4466-b341-b01d453e5222': require('./88fe5164-4ad2-4466-b341-b01d453e5222'),
  '923b092d-6a82-4e9a-9978-9df50ea5fceb': require('./923b092d-6a82-4e9a-9978-9df50ea5fceb'),
  '946e0481-7068-4b4d-accc-4b282603a563': require('./946e0481-7068-4b4d-accc-4b282603a563'),
  '948efd9f-b296-44f5-9d71-340434877ae8': require('./948efd9f-b296-44f5-9d71-340434877ae8'),
  '9a3c5394-5f8f-4b1c-89f7-8185a929ce69': require('./9a3c5394-5f8f-4b1c-89f7-8185a929ce69'),
  '9e4611ff-d239-47e8-918f-8c4b3ebc21eb': require('./9e4611ff-d239-47e8-918f-8c4b3ebc21eb'),
  '9fe3de97-2ea0-43b7-942d-3ca09eedcdcd': require('./9fe3de97-2ea0-43b7-942d-3ca09eedcdcd'),
  'a604a8b7-445b-4c6a-862b-3557d136fbb1': require('./a604a8b7-445b-4c6a-862b-3557d136fbb1'),
  'a9e591a3-7d14-4b40-922f-871c1529401c': require('./a9e591a3-7d14-4b40-922f-871c1529401c'),
  'adb5571c-a0a6-4fe4-b359-65526df9a81b': require('./adb5571c-a0a6-4fe4-b359-65526df9a81b'),
  'b2b33d0f-bbd3-411c-b440-44a1c44fdb9c': require('./b2b33d0f-bbd3-411c-b440-44a1c44fdb9c'),
  'b65a8256-a2b2-49e1-92ce-2ad7a59b73bd': require('./b65a8256-a2b2-49e1-92ce-2ad7a59b73bd'),
  'b717ce85-5eb0-42c6-aa21-6bd5c0eaeb43': require('./b717ce85-5eb0-42c6-aa21-6bd5c0eaeb43'),
  'b93abf93-a805-4c1f-9fce-dfd371dee74c': require('./b93abf93-a805-4c1f-9fce-dfd371dee74c'),
  'bb980c92-d33d-430d-89af-230f69264935': require('./bb980c92-d33d-430d-89af-230f69264935'),
  'bec9d08e-0598-4c74-b5ea-3a224ab42e67': require('./bec9d08e-0598-4c74-b5ea-3a224ab42e67'),
  'bedd4db9-3772-444f-9a1d-1843f66f9677': require('./bedd4db9-3772-444f-9a1d-1843f66f9677'),
  'cb1de8c4-9cef-45ca-8d38-bfaccb794f9d': require('./cb1de8c4-9cef-45ca-8d38-bfaccb794f9d'),
  'd3b0abb5-87bb-4e98-8da6-8b9e44295853': require('./d3b0abb5-87bb-4e98-8da6-8b9e44295853'),
  'dae3fa41-b713-40be-b23f-b2432608ad1b': require('./dae3fa41-b713-40be-b23f-b2432608ad1b'),
  'ec6202e4-bc7a-41f4-a3be-bf6bb4037d64': require('./ec6202e4-bc7a-41f4-a3be-bf6bb4037d64'),
  'ed446d79-cb3c-463c-b816-6c6a931d66cd': require('./ed446d79-cb3c-463c-b816-6c6a931d66cd'),
  'f09f4e66-72f4-418b-b8a0-af6dd8937c5b': require('./f09f4e66-72f4-418b-b8a0-af6dd8937c5b'),
  'f0eb7991-adca-46f1-b802-c4b7b3182b7d': require('./f0eb7991-adca-46f1-b802-c4b7b3182b7d'),
  'f58a4e36-e9a4-4383-ad95-0732dae2ac38': require('./f58a4e36-e9a4-4383-ad95-0732dae2ac38'),
  'f5b011b1-c4b9-45c6-bd18-051fbfce742f': require('./f5b011b1-c4b9-45c6-bd18-051fbfce742f'),
  'f824f8d4-d17b-4889-903c-5208e0d90e8f': require('./f824f8d4-d17b-4889-903c-5208e0d90e8f'),
  'f9e58198-289d-4639-964b-0fa3ef93af56': require('./f9e58198-289d-4639-964b-0fa3ef93af56')
}



export function getImageForCampId(id) {
  if (!id) {
    return CAMP_PLACEHOLDER;
  }
  return _.get(IMAGES, `${id}`, CAMP_PLACEHOLDER);
}
