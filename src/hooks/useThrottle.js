// function useThrottle(value, delay) {
// 	const throttle = useRef({
// 		isThrottled: false,
// 		cachedValue: null
// 	})
// 	const [throttledValue, setThrottledValue] = useState(value)
//
// 	useEffect(
// 		() => {
// 			function wrapper() {
// 				if (throttle.current.isThrottled) {
// 					throttle.current.cachedValue = value
// 				} else {
// 					throttle.current.isThrottled = true
//
// 					setThrottledValue(value)
//
// 					setTimeout(() => {
// 						throttle.current.isThrottled = false
//
// 						if (throttle.current.cachedValue) {
// 							wrapper()
// 							throttle.current.cachedValue = null
// 						}
// 					}, delay)
// 				}
// 			}
//
// 			wrapper()
// 		},
// 		[value]
// 	)
//
// 	return throttledValue
// }