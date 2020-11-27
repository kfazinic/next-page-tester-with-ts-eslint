// import React from 'react'
import { render, screen } from '@testing-library/react'
import { getPage } from 'next-page-tester'

// import Home from '../../pages/index'
// import { render } from '@testing-library/react'

// describe('Home page', () => {
//   it('clicking button triggers alert', () => {
//     const { getByText } = render(<Home />, {})
//     expect(getByText('Hi'))
//   })
// })

describe('Home page', () => {
  it('renders home page', async () => {
    const { page } = await getPage({
      route: '/',
    })

    render(page)
    expect(screen.getByText('Hi')).toBeInTheDocument()
  })
})
