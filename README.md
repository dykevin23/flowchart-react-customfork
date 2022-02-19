# Flowchart React

> Flowchart &amp; Flowchart designer for React.js

[![NPM](https://img.shields.io/npm/v/flowchart-react.svg)](https://www.npmjs.com/package/flowchart-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<img width="800" alt="image" src="https://user-images.githubusercontent.com/5696485/154805805-b8967cea-a4ff-45e1-acf2-524ae1150dd3.png">

## Install

```bash
npm install --save flowchart-react
# or
yarn add flowchart-react
```

## Usage

```tsx
import React, { Component } from 'react'

import Flowchart from 'flowchart-react'

const App = () => {
  const [nodes] = useState<NodeData[]>([
    {
      type: 'start',
      name: 'Start',
      x: 150,
      y: 190,
      id: 1604410569920,
      approvers: []
    },
    {
      type: 'end',
      name: 'End',
      x: 500,
      y: 190,
      id: 1604410572363,
      approvers: []
    },
    {
      x: 330,
      y: 190,
      id: 1604410575428,
      name: 'New',
      type: 'operation',
      approvers: [{ name: 'Joyce', id: '1' }]
    },
    {
      x: 330,
      y: 300,
      id: 1604410591865,
      name: 'New',
      type: 'operation',
      approvers: []
    }
  ])
  const [connections] = useState<ConnectionData[]>([
    {
      source: { id: 1604410569920, position: 'right' },
      destination: { id: 1604410575428, position: 'left' },
      id: 1604410587907,
      type: 'pass'
    },
    {
      source: { id: 1604410575428, position: 'right' },
      destination: { id: 1604410572363, position: 'left' },
      id: 1604410590524,
      type: 'pass'
    },
    {
      source: { id: 1604410569920, position: 'bottom' },
      destination: { id: 1604410591865, position: 'left' },
      id: 1604410596866,
      type: 'pass'
    },
    {
      source: { id: 1604410591865, position: 'right' },
      destination: { id: 1604410572363, position: 'bottom' },
      id: 1604410599205,
      type: 'pass'
    }
  ])

  return <Flowchart
    onChange={(nodes, connections) => {
      setNodes(nodes);
      setConns(connections);
    }}
    style={{ width: 640, height: 480 }}
    nodes={nodes}
    connections={conns}
  />
}
```

## Demo

[https://github.com/joyceworks/flowchart-react-demo](https://github.com/joyceworks/flowchart-react-demo)

## License

MIT © [Joyceworks](https://github.com/joyceworks)
