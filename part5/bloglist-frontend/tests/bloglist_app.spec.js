import { test, expect } from '@playwright/test'
import { loginWith, createBlog, likeBlog } from './helper'
import { getByText } from '@testing-library/react'
import { beforeEach } from 'node:test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/testing/reset')
    await new Promise(resolve => setTimeout(resolve, 100))
    await request.post('http://localhost:3003/api/users/',{
      data: {
        username: 'ajay123',
        name: 'ajay',
        password: 'ajay26188'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('log in to application')
    await expect(locator).toBeVisible()

    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()

    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()

    await expect(page.getByRole('button',{name:'login'})).toBeVisible()

  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'ajay123', 'ajay26188')
      await expect(page.getByText('ajay logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'ajay123', 'wrong')

      const errorDiv = page.locator('.notification-box')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(page.getByText('ajay logged in')).not.toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'ajay123', 'ajay26188')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'how to be happy', 'ajay', 'howtobehappy.com')

      await expect(page.getByText('a new blog how to be happy by ajay added')).toBeVisible()

      const blogDiv = page.locator('.defaultBlogContents')

      await expect(blogDiv).toContainText('how to be happy')

    })

    test.describe('a blog exists', () => {
      test.beforeEach(async ({page}) => {
        await createBlog(page, 'how not to be happy', 'ajay1', 'hownottobehappy.com')
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByText('how not to be happy')
  
        await page.getByRole('button',{name: 'view'}).click()
  
        await page.getByRole('button',{name: 'like'}).click()

        await expect(page.getByText('1')).toBeVisible
      })

      test('a blog can be deleted',async({page})=>{
        const blog = page.locator('.defaultBlogContents').filter({ hasText: 'how not to be happy' })

        await blog.getByRole('button',{name: 'view'}).click()

        const expandedBlog = page.locator('.showAllContents').filter({ hasText: 'how not to be happy' })

        page.once('dialog', async dialog => {
          expect(dialog.type()).toBe('confirm')
          await dialog.accept()
        })
        
        const removeButton = expandedBlog.getByRole('button', { name: 'remove' })
        await expect(removeButton).toBeVisible()
        await removeButton.click()

        await expect(
          page.locator('.defaultBlogContents, .showAllContents').filter({ hasText: 'how not to be happy' })
        ).toHaveCount(0)
      })

      test('only the user who created the blog sees the delete button', async ({ page, request }) => {
        await request.post('http://localhost:3003/api/users/', {
          data: {
            username: 'saloni123',
            name: 'saloni',
            password: 'saloni26188'
          }
        })
      
        await page.getByRole('button', { name: 'logout' }).click()
      
        // Login as second user
        await loginWith(page, 'saloni123', 'saloni26188')
      
        const blog = page.locator('.defaultBlogContents').filter({ hasText: 'how not to be happy' })
        await blog.getByRole('button', { name: 'view' }).first().click()
      
        const expandedBlog = page.locator('.showAllContents').filter({ hasText: 'how not to be happy' })
      
        const removeButton = expandedBlog.getByRole('button', { name: 'remove' })
      
        await expect(removeButton).toHaveCount(0)
      })
    })
    
  })
})