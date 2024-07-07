import React from "react"
import { renderToString } from "react-dom/server"

interface RecursiveDivProps {
  deep: number
  count: number
}

const RecursiveDiv: React.FC<RecursiveDivProps> = ({ deep, count }) => {
  if (deep === 0) {
    return null
  }

  const children = Array.from({ length: count }, (_, index) => (
    <RecursiveDiv key={index} deep={deep - 1} count={count} />
  ))

  return <div>{children}</div>
}

const s = renderToString(<div>hello </div>)
console.log(s)
