import * as React from 'react'
import { render } from 'react-testing-library'
import { HumanTypist } from './HumanTypist.component'

jest.useFakeTimers()

describe('test', () => {
    it('renders correctly', () => {
        const identity = i => i
        const { getByText, getByTestId, container, asFragment } = render(
            <HumanTypist text="testing" render={identity} />,
        )
        jest.advanceTimersByTime(1000);
        expect(asFragment()).toMatchSnapshot()
    })
})