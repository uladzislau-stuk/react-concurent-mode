import React, { useRef, useEffect, useState } from 'react'
import data from './data.js';
import './index.css';
import {useDebounce} from '../hooks'


function wait(ms = 2000) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

function Slutter() {
	const buffer = useRef(new Map()).current

	const [value, setValue] = useState('')
	const [items, setItems] = useState([])
	const [isSearching, setIsSearching] = useState(false)
	const [isEmptySearch, setIsEmptySearch] = useState(false)

	const debouncedValue = useDebounce(value, 500)

	useEffect(
		() => {
			let isDestroyed = false

			if (debouncedValue && !buffer.has(value)) {
				setIsSearching(true)

				wait().then(() => {
					if (isDestroyed) return

					const filteredItems = value
						? filterItems(data, value.toLowerCase())
						: data

					buffer.set(value, filteredItems)

					setItems(filteredItems)
					setIsSearching(false)
					setIsEmptySearch(!filteredItems.length)
				})
			} else {
				let cachedItems = buffer.has(value)
					? buffer.get(value)
					: data

				setItems(cachedItems)
				setIsEmptySearch(false)
				setIsSearching(false)
			}

			return () => {
				isDestroyed = true
			}
		},
		[debouncedValue]
	)

	function filterItems (items, value) {
		return items.filter(item => ~item.toLowerCase().indexOf(value))
	}

	function handleChange(e) {
		setValue(e.target.value)
	}

	function renderList(items) {
		return (
			<ul className='list'>
				{items.map((value, idx) => (
					<li className="list_item" key={idx}>{value}</li>
				))}
			</ul>
		)
	}

	return (
		<div className="container">
			<input type="text" value={value} onChange={handleChange}/>

			{isSearching && <div>Searching ...</div>}
			{!isSearching && isEmptySearch && <div>Nothing was found, please try again ...</div>}

			{!isSearching && renderList(items)}
		</div>
	);
}

export default Slutter