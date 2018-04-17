import _ from 'lodash';

export const CAMP_PLACEHOLDER = require('./../midburn_logo.png');


const IMAGES = {
  // '00cc6a64-8fca-41bd-9543-47d759232c3a': require('./00cc6a64-8fca-41bd-9543-47d759232c3a/coverUrl.jpg'),
  '16b210af-3ccc-44fd-9a59-dfe3cec43806': require('./16b210af-3ccc-44fd-9a59-dfe3cec43806/coverUrl.jpg'),
  // '187540e7-51b5-457f-b9f7-1a836d3b3a31': require('./187540e7-51b5-457f-b9f7-1a836d3b3a31/coverUrl.jpg'),
  '1b47ec1f-f564-485f-828c-831b445b1ed8': require('./1b47ec1f-f564-485f-828c-831b445b1ed8/coverUrl.jpg'),
  '1d0cf217-1025-4344-ad30-22ba8b3797e5': require('./1d0cf217-1025-4344-ad30-22ba8b3797e5/coverUrl.jpg'),
  '1f05af91-8069-4b89-a60d-ef108a0757c5': require('./1f05af91-8069-4b89-a60d-ef108a0757c5/coverUrl.jpg'),
  // '20a0b278-8884-4a77-8bd0-b88aa79e334f': require('./20a0b278-8884-4a77-8bd0-b88aa79e334f/coverUrl.jpg'),
  '2655649f-b6da-4cbf-a2e8-9feffb49b502': require('./2655649f-b6da-4cbf-a2e8-9feffb49b502/coverUrl.jpg'),
  '26bc167b-8ea3-45ac-8af9-17bf1f40bd36': require('./26bc167b-8ea3-45ac-8af9-17bf1f40bd36/coverUrl.jpg'),
  '2d81d3c7-bad1-4727-8452-245c990ce92a': require('./2d81d3c7-bad1-4727-8452-245c990ce92a/coverUrl.jpg'),
  '30586326-20a6-484d-a552-30070ca791de': require('./30586326-20a6-484d-a552-30070ca791de/coverUrl.jpg'),
  '3375e420-284e-4aac-b74b-8ced400fb71c': require('./3375e420-284e-4aac-b74b-8ced400fb71c/coverUrl.jpg'),
  '33ec0f89-9eb4-463e-ab5e-c0ea0cb546a9': require('./33ec0f89-9eb4-463e-ab5e-c0ea0cb546a9/coverUrl.jpg'),
  '37b2508c-b5fb-4f75-ad92-ea30ca4b66b4': require('./37b2508c-b5fb-4f75-ad92-ea30ca4b66b4/coverUrl.jpg'),
  '3bb8870c-a214-4c71-8c9f-9f7c64cb3a93': require('./3bb8870c-a214-4c71-8c9f-9f7c64cb3a93/coverUrl.jpg'),
  '3cfbb2f9-6661-495e-8898-5ff69dd80c16': require('./3cfbb2f9-6661-495e-8898-5ff69dd80c16/coverUrl.jpg'),
  '41bcc3ae-6ad7-4f68-9fce-d193b4e38080': require('./41bcc3ae-6ad7-4f68-9fce-d193b4e38080/coverUrl.jpg'),
  '44f60fd9-108e-49cb-9690-040e8cbb45c7': require('./44f60fd9-108e-49cb-9690-040e8cbb45c7/coverUrl.jpg'),
  '4550c7e8-28a4-4b4a-8b5f-d16dcee48793': require('./4550c7e8-28a4-4b4a-8b5f-d16dcee48793/coverUrl.jpg'),
  '4b855afe-6a74-4093-8fc9-cdaebb869e7f': require('./4b855afe-6a74-4093-8fc9-cdaebb869e7f/coverUrl.jpg'),
  '4e3db439-321c-48ce-bc68-44849508a9e6': require('./4e3db439-321c-48ce-bc68-44849508a9e6/coverUrl.jpg'),
  '5440ab23-171c-4c4b-bf90-547c8b80f91f': require('./5440ab23-171c-4c4b-bf90-547c8b80f91f/coverUrl.jpg'),
  '5bbdf7b4-a593-47b8-82d5-a424c3f0715c': require('./5bbdf7b4-a593-47b8-82d5-a424c3f0715c/coverUrl.jpg'),
  '6780cca2-18a1-4122-9b63-3af400f50922': require('./6780cca2-18a1-4122-9b63-3af400f50922/coverUrl.jpg'),
  // '67c8d123-f122-4533-bdc5-c7fec60ec529': require('./67c8d123-f122-4533-bdc5-c7fec60ec529/coverUrl.jpg'),
  '691f6b4a-fd1a-4de5-854e-d0a36f82b9f0': require('./691f6b4a-fd1a-4de5-854e-d0a36f82b9f0/coverUrl.jpg'),
  '6c72e1fa-3168-4bc3-bdd6-5bddfd51913c': require('./6c72e1fa-3168-4bc3-bdd6-5bddfd51913c/coverUrl.jpg'),
  '6e2b20c4-6b9a-4abf-985c-e1699d7ef615': require('./6e2b20c4-6b9a-4abf-985c-e1699d7ef615/coverUrl.jpg'),
  // '70a528e0-c1a9-4e98-88fb-1ce876a532cd': require('./70a528e0-c1a9-4e98-88fb-1ce876a532cd/coverUrl.jpg'),
  // '76675b1e-5f42-41f8-beb9-d508560d252e': require('./76675b1e-5f42-41f8-beb9-d508560d252e/coverUrl.jpg'),
  '7812a8c8-3577-492f-aabd-f8b591e7a5f4': require('./7812a8c8-3577-492f-aabd-f8b591e7a5f4/coverUrl.jpg'),
  '79282ded-2426-450d-ade8-dce6955ca9e7': require('./79282ded-2426-450d-ade8-dce6955ca9e7/coverUrl.jpg'),
  '7c6d84e1-858e-451c-aa7c-97a4f479e82e': require('./7c6d84e1-858e-451c-aa7c-97a4f479e82e/coverUrl.jpg'),
  '7e38cb2c-2085-4d38-822d-d220b3114e44': require('./7e38cb2c-2085-4d38-822d-d220b3114e44/coverUrl.jpg'),
  '82e3f4ee-6927-4eb5-8399-b15aa5382b17': require('./82e3f4ee-6927-4eb5-8399-b15aa5382b17/coverUrl.jpg'),
  '86477209-3222-49fd-93d2-61a9218af31e': require('./86477209-3222-49fd-93d2-61a9218af31e/coverUrl.jpg'),
  '873b9a58-cd0c-4d82-ad16-ddb198f7a74e': require('./873b9a58-cd0c-4d82-ad16-ddb198f7a74e/coverUrl.jpg'),
  '89e799a3-b0a5-4e7f-a47d-8b3cc6bcc631': require('./89e799a3-b0a5-4e7f-a47d-8b3cc6bcc631/coverUrl.jpg'),
  '8f77f7af-8a1a-4d32-8351-17486f636eca': require('./8f77f7af-8a1a-4d32-8351-17486f636eca/coverUrl.jpg'),
  '945c7943-d4a1-4802-b1cd-8ea8910da5b8': require('./945c7943-d4a1-4802-b1cd-8ea8910da5b8/coverUrl.jpg'),
  '9697fdf5-608f-4294-bc01-2f029596c06e': require('./9697fdf5-608f-4294-bc01-2f029596c06e/coverUrl.jpg'),
  '9b2f82ce-870e-4f9e-b1de-ed75dabdf061': require('./9b2f82ce-870e-4f9e-b1de-ed75dabdf061/coverUrl.jpg'),
  '9c5c81a6-549d-4325-b309-c4819ee1a4c7': require('./9c5c81a6-549d-4325-b309-c4819ee1a4c7/coverUrl.jpg'),
  '9d5d00a1-1af9-41fb-ab05-739afb684c3b': require('./9d5d00a1-1af9-41fb-ab05-739afb684c3b/coverUrl.jpg'),
  '9eef2dcd-c342-4e25-ac61-642d8ba1ab35': require('./9eef2dcd-c342-4e25-ac61-642d8ba1ab35/coverUrl.jpg'),
  'a2ed87bf-5272-4dd2-b229-57ddd5327c46': require('./a2ed87bf-5272-4dd2-b229-57ddd5327c46/coverUrl.jpg'),
  // 'a4c74336-6d14-48b4-83c9-ada3f7a106c9': require('./a4c74336-6d14-48b4-83c9-ada3f7a106c9/coverUrl.jpg'),
  'b1c08694-903a-4044-8b92-83dd1fc6c16e': require('./b1c08694-903a-4044-8b92-83dd1fc6c16e/coverUrl.jpg'),
  'b2c56251-098e-4aae-9947-634ad027618a': require('./b2c56251-098e-4aae-9947-634ad027618a/coverUrl.jpg'),
  'bb2e171f-9449-46e1-94ec-8f9b0d1546dd': require('./bb2e171f-9449-46e1-94ec-8f9b0d1546dd/coverUrl.jpg'),
  // 'c39f90d7-eb27-48d4-b54d-841e5400d119': require('./c39f90d7-eb27-48d4-b54d-841e5400d119/coverUrl.jpg'),
  'c5581449-1721-48f1-8588-60d625ad7455': require('./c5581449-1721-48f1-8588-60d625ad7455/coverUrl.jpg'),
  'c5a761d0-c0c2-4531-9fe9-472fa6cebad9': require('./c5a761d0-c0c2-4531-9fe9-472fa6cebad9/coverUrl.jpg'),
  'c7c56092-8c3c-48e9-aaad-9847a437ae40': require('./c7c56092-8c3c-48e9-aaad-9847a437ae40/coverUrl.jpg'),
  'c8fcbf1a-8f93-412c-b90c-650214274fbc': require('./c8fcbf1a-8f93-412c-b90c-650214274fbc/coverUrl.jpg'),
  'cdfb5817-6d7e-43a2-9c16-ee1a94a63b84': require('./cdfb5817-6d7e-43a2-9c16-ee1a94a63b84/coverUrl.jpg'),
  'd1ec1416-9026-4cde-91cd-f57a0dd74060': require('./d1ec1416-9026-4cde-91cd-f57a0dd74060/coverUrl.jpg'),
  'ddfa01ea-971e-4a0a-8ad7-5c75ef116c47': require('./ddfa01ea-971e-4a0a-8ad7-5c75ef116c47/coverUrl.jpg'),
  'df964d5a-f855-443a-b165-0aa6c366e2f3': require('./df964d5a-f855-443a-b165-0aa6c366e2f3/coverUrl.jpg'),
  'e44d2aa4-3b7d-4b1d-a794-d8d2f76a899c': require('./e44d2aa4-3b7d-4b1d-a794-d8d2f76a899c/coverUrl.jpg'),
  'e5eba286-b31d-47b9-917f-f2d171da9f42': require('./e5eba286-b31d-47b9-917f-f2d171da9f42/coverUrl.jpg'),
  'ed97b282-17fa-4b96-a586-51d2a836501e': require('./ed97b282-17fa-4b96-a586-51d2a836501e/coverUrl.jpg'),
  'eda57f87-7d4d-453b-b92e-3ac775b761a5': require('./eda57f87-7d4d-453b-b92e-3ac775b761a5/coverUrl.jpg'),
  'f3516689-f0a7-4bd5-b5d3-aa95a06417e':  require('./f3516689-f0a7-4bd5-b5d3-aa95a06417e7/coverUrl.jpg'),
}



export function getImageForCampId(id) {
  if (!id) {
    return CAMP_PLACEHOLDER;
  }
  return _.get(IMAGES, `${id}`, CAMP_PLACEHOLDER);
}
