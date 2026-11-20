import { track } from '../analytics.js'

export function withAnalytics(Component, event) {
  function WithAnalytics({ analyticsData, onClick, ...rest }) {
    function handleClick(e) {
      track(event, analyticsData)
      onClick?.(e)
    }

    return <Component {...rest} onClick={handleClick} />
  }

  const wrappedName = Component.displayName || Component.name || 'Component'
  WithAnalytics.displayName = `withAnalytics(${wrappedName})`

  return WithAnalytics
}
