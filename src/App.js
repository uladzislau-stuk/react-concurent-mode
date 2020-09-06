import React, { lazy, Component, Suspense } from 'react'
import './App.css'

/*
* Without React.lazy all components render immediately
* */
const examples = [
	['slutter', lazy(() => import('./1-slutter'))],
	['waterfall', lazy(() => import('./2-fetch-on-render-waterfall'))],
	['fetch then render', lazy(() => import('./3-fetch-then-render'))],
	['render as you fetch', lazy(() => import('./4-render-as-you-fetch'))]
]

class App extends Component {
	state = {
		activeIdx: 0,
		hide: false
	}

	render() {
		const {activeIdx, hide} = this.state

		return (
			<div className="container">
				<div className="buttons">
					{examples.map((example, idx) => (
						<button key={idx} onClick={() => {
							this.setState({
								activeIdx: idx,
								hide: true
							}, () => {
								this.setState({
									hide: false
								})
							})
						}}>{example[0]}</button>
					))}
				</div>
				{!hide && (
					<Suspense fallback={<p>Loading component...</p>}>
						{React.createElement(examples[activeIdx][1])}
					</Suspense>
				)}
			</div>
		)
	}
}

export default App