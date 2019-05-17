import * as React from 'react'

interface HTProps {
    text: string
    render: (text: string, complete: boolean) => React.ReactElement
    errorRate?: number
    pauseRate?: number
    speed?: number
}

interface HTState {
    complete: boolean
    length: number
    output: string
}

export class HumanTypist extends React.Component<HTProps, HTState> {
    timeoutId: NodeJS.Timeout
    constructor(props: HTProps) {
        super(props)
        this.state = {
            complete: false,
            length: 0,
            output: '',
        }
        this.timeoutId = null
    }

    public getRandomLetter(): string {
        const randomOffset = Math.round((Math.random() - 1) * 5)
        return this.props.text.charAt(this.state.output.length - 1 + randomOffset)
    }

    public getNextLetter(): number | string {
        const { errorRate = 0.05, pauseRate = 0.3, text } = this.props
        const { output } = this.state
        if (text === output) {
            return 0
        }

        // pause
        if (Math.random() < pauseRate) {
            return ''
        }

        // make mistake
        if (Math.random() < errorRate) {
            return this.getRandomLetter()
        }

        // correct mistake
        const lastTypedIndex = output.length - 1
        if (text.indexOf(output) !== 0) {
            return -1
        }

        const nextLetter = text.charAt(lastTypedIndex + 1)
        return nextLetter

    }

    public keyStroke = () => {
        const { output } = this.state
        const { speed = 100 } = this.props
        const nextStroke = this.getNextLetter()
        if (nextStroke === 0) {
            clearTimeout(this.timeoutId)
            this.setState({
                complete: true
            })
        }
        if (nextStroke === -1) {
            this.setState({
                output: output.substr(0, output.length - 1)
            })
        }
        if (typeof nextStroke === 'string') {
            this.setState({
                output: `${output}${nextStroke}`
            })
        }
        this.timeoutId = setTimeout(this.keyStroke, 60 * 1000 / (6 * speed))
    }

    public render() {
        return this.props.render(this.state.output, this.state.complete)
    }

    public componentDidMount() {
        this.keyStroke()
    }
}