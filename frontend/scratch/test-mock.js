const mr = require('../src/lib/mock_router.ts');

async function test() {
  try {
    const res = await mr.routeMockRequest('/hr/payrolls', 'GET', undefined);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}

test();
