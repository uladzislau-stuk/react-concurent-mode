import React, { useEffect, useRef } from 'react'

export function useDidUpdate(onUpdate, effects, onUnmount = () => {}) {
	const isMount = useRef(false)

	useEffect(() => {
		if (isMount.current) {
			onUpdate()
		} else {
			isMount.current = true
		}

		return () => {
			onUnmount()
		}
	}, effects)
}