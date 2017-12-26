import Nightmare from 'nightmare';

describe('Content', () => {
  let page;
  beforeEach(() => {
    page = Nightmare();
    page.goto('http://localhost:8000/#/content/information');
  });

  // it('should login with failure', async () => {
  //   await page.type('#userName', 'mockuser')
  //     .type('#password', 'wrong_password')
  //     .click('button[type="submit"]')
  //     .wait('.ant-alert-error') // should display error
  //     .end();
  // });
  //
  // it('should login successfully', async () => {
  //   const text = await page.type('#userName', 'admin')
  //     .type('#password', '888888')
  //     .click('button[type="submit"]')
  //     .wait('.ant-layout-sider h1') // should display error
  //     .evaluate(() => document.body.innerHTML)
  //     .end();
  //   expect(text).toContain('<h1>Ant Design Pro</h1>');
  // });
  // it('should get more search query', async () => {
  //   await page.click()
  // })
});
