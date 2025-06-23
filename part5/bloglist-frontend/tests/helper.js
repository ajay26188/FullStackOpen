const loginWith = async(page, username, password) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button',{name: 'login'}).click()
}

const createBlog = async(page,title,author,url) => {
    await page.getByRole('button',{name: 'create new blog'}).click()

    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)

    await page.getByRole('button',{name: 'create'}).click()
}

async function likeBlog(blogLocator, times) {
    const likeButton = blogLocator.getByRole('button', { name: 'like' })
    for (let i = 0; i < times; i++) {
      await likeButton.click()
      await new Promise(res => setTimeout(res, 200))
    }
  }
  

export {loginWith, createBlog, likeBlog}