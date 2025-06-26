import { render, screen } from "@testing-library/react"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event"

describe('Blog Test', () => {
    //we declare these outside so that it can be accessed by all tests.
    let container
    let mockLikesHandler

    beforeEach(() => {
        const blog = {
            title: "Understanding React Hooks",
            author: "Ajay Sah",
            url: "https://devblog.com/react-hooks",
            likes:50,
            user: [{name: 'Ajay', username: 'ajay26188'}]
        }
        
        const user = {username: 'ajay26188'}

        mockLikesHandler = vi.fn()
    
        container = render(<Blog blog={blog} user={(user)} handleLikes={mockLikesHandler} />).container
    })

    test(`at start only blog's title and author are displayed`,() => {
        const div = container.querySelector('.defaultBlogContents')
        expect(div).toHaveTextContent('Understanding React Hooks')
        expect(div).toHaveTextContent('Ajay Sah')
        expect(div).not.toHaveTextContent('https://devblog.com/react-hooks')
        expect(div).not.toHaveTextContent('50')
    
    })

    test('after clicking button, URL and likes are displayed', async() => {
        const fakeUser = userEvent.setup()
        const button = screen.getByText('view')
        await fakeUser.click(button)
    
        const div = container.querySelector('.showAllContents')
    
        expect(div).toHaveTextContent('Understanding React Hooks')
        expect(div).toHaveTextContent('Ajay Sah')
        expect(div).toHaveTextContent('https://devblog.com/react-hooks')
        expect(div).toHaveTextContent('50')
        
    })

    test('clicking the button twice calls event handler twice', async() => {
    
        const fakeUser = userEvent.setup()
        const viewButton = screen.getByText('view')
        await fakeUser.click(viewButton)
    
        const likeButton = screen.getByText('like')
        await fakeUser.click(likeButton)
        await fakeUser.click(likeButton)
    
        expect(mockLikesHandler.mock.calls).toHaveLength(2)
    
    })
    
})


