import { render, screen } from "@testing-library/react"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"

describe('Blog Form Test', () => {
    test('Blog Form calls onSubmit with right details', async() => {
        const user = userEvent.setup()
        const createBlog = vi.fn()

        render(<BlogForm createBlog={createBlog}/>)

        const input = screen.getAllByRole('textbox')
        const createButton = screen.getByText('create')

        await user.type(input[0], 'testing a form...')
        await user.type(input[1], 'ajay')
        await user.type(input[2], 'tester.com')
        await user.click(createButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
        expect(createBlog.mock.calls[0][0].author).toBe('ajay')
        expect(createBlog.mock.calls[0][0].url).toBe('tester.com')
    })
})