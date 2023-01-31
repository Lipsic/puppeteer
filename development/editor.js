const { executablePath } = require('puppeteer')
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// puppeteer usage as normal

puppeteer.launch({ headless: false, executablePath: executablePath(), }).then(async browser => {
    console.log('Running tests..')
    const page = await browser.newPage()


    await page.goto('http://rblc.com.br/index.php/rblc/login', { waitUntil: 'networkidle0' })
    await page.waitForTimeout(3000)

    await page.type('#username', 'revista');
    await page.type('#password', 'r3v157aMvssx');

    await page.click('.submit');

    await page.goto('http://rblc.com.br/index.php/rblc/submissions')

    await page.click('div.listPanel__itemActions > a.pkpButton')

    /*--------------editoriação--------------*/

    await page.waitForSelector("#ui-id-5", { visible: true })
    await page.click('#ui-id-5')

    await page.waitForTimeout(3000)
    page.click('#copyeditingEditorDecisionsDiv')

    //await page.waitForTimeout(3000)
    await page.waitForSelector("#skipEmail-skip", { visible: true })

    skipEmail = await page.$('#skipEmail-skip');
    skipEmail.click()

    await page.click('.pkp_button.promoteForm-step-btn')
    await page.click('#promoteForm-complete-btn')

    /*--------------verificação--------------*/


    /*--------------publicação--------------*/



})
