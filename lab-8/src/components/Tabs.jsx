import { createContext, use, useId, useRef, useState } from 'react'

const TabsContext = createContext(null)

function useTabsContext() {
  const context = use(TabsContext)
  if (!context) {
    throw new Error(
      'Tabs components (Tabs.Tab, Tabs.Panel) must be used within a <Tabs> component.',
    )
  }
  return context
}

export default function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue)
  const baseId = useId()
  const tabValuesRef = useRef(new Map())

  const getTabId = (value) => `${baseId}-tab-${value}`
  const getPanelId = (value) => `${baseId}-panel-${value}`

  return (
    <TabsContext
      value={{ activeTab, setActiveTab, getTabId, getPanelId, tabValuesRef }}
    >
      <div className="tabs">{children}</div>
    </TabsContext>
  )
}

function List({ children, ...props }) {
  return (
    <div role="tablist" className="tab-list" {...props}>
      {children}
    </div>
  )
}

function Tab({ value, children }) {
  const { activeTab, setActiveTab, getTabId, getPanelId, tabValuesRef } =
    useTabsContext()
  const isActive = activeTab === value

  function registerTab(node) {
    if (node) {
      tabValuesRef.current.set(node, value)
    }
  }

  function handleKeyDown(event) {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
    if (!keys.includes(event.key)) return

    const tablist = event.currentTarget.closest('[role="tablist"]')
    if (!tablist) return

    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'))
    const currentIndex = tabs.indexOf(event.currentTarget)
    if (currentIndex === -1) return

    event.preventDefault()

    let nextIndex = currentIndex
    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1
    }

    const nextTab = tabs[nextIndex]
    const nextValue = tabValuesRef.current.get(nextTab)
    nextTab.focus()
    if (nextValue !== undefined) {
      setActiveTab(nextValue)
    }
  }

  return (
    <button
      ref={registerTab}
      type="button"
      role="tab"
      id={getTabId(value)}
      aria-selected={isActive}
      aria-controls={getPanelId(value)}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActiveTab(value)}
      onKeyDown={handleKeyDown}
    >
      {children}
    </button>
  )
}

function Panel({ value, children }) {
  const { activeTab, getTabId, getPanelId } = useTabsContext()

  return (
    <div
      role="tabpanel"
      id={getPanelId(value)}
      aria-labelledby={getTabId(value)}
      tabIndex={0}
      hidden={activeTab !== value}
    >
      {children}
    </div>
  )
}

Tabs.List = List
Tabs.Tab = Tab
Tabs.Panel = Panel
