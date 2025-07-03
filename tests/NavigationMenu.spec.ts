import { expect, test } from '@playwright/test';

test('Navigation to Forms link', async ({ page }) => {
    const formsOption = ['Login' , 'Register' , 'Recover password'];
    await page.goto('https://qa-practice.netlify.app/bugs-form');
    await page.getByRole('link', { name: 'Forms' }).click();
    const formsList = await page.locator('li').filter({hasText : 'Forms'}).locator('li').all();
    formsList.forEach(async (element) => {
        const option = await element.textContent();
        console.log(option);
        for(let i=0; i<formsOption.length; i++)
        {
            if(formsOption[i] === 'option'){
                break;
            }
        
        }
        
    });
    
});
test('Navigation to Contact link', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/bugs-form');
    await page.getByText('Contact').click();
    await expect(page.getByRole('heading' , {name:'Contact us'})).toBeVisible();
    await expect(page.getByText('Do you have any questions / feedback / improvement ideas? Please do not hesitate to contact me ')).toBeVisible();
});
