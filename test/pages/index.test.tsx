import { render, screen } from '@testing-library/react'
import { getPage } from 'next-page-tester'

describe('Home page', () => {
  it('renders home page', async () => {
    const { page } = await getPage({
      route: '/',
    })

    render(page)
    expect(screen.getByText('Hi')).toBeTruthy()
  })
})
