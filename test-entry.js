// mocking modules before anything else is loaded
const sinon = require('sinon');
const mock = require('mock-require');

// mock('getstream', {
//     connect: sinon.stub().callsFake(() => {
//         return require('./test/utils').getMockClient();
//     })
// });

require('./setup-tests');