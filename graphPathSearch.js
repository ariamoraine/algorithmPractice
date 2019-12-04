const sampleGraph = {
  a: {
    name: 'a',
    value: ['b', 'e', 'f']
  },
  b: {
    name: 'b',
    value: ['d', 'e']
  },
  c: {
    name: 'c',
    value: ['b']
  },
  d: {
    name: 'd',
    value: ['c', 'e']
  },
  e: {
    name: 'e',
    value: []
  },
  f: {
    name: 'f',
    value: []
  },
}

/*
This isn't working because we're mapping over all the values in the graph,
and instead we need to do a bft or dft over the values of the graph so the
order of the keys for the columns match.
Currently they do not. The row key is the order from the object.values(graph)
and the column keys order of appearance
*/

const transformToMatrix = (graph) => {
    const indexByKey = new Map();

    // array of vertex objects
    const values = Object.values(graph)
    // create adjacency matrix from graph
    const matrix = values.map(({name, value}, index) => {
        // populate indexByKey based on index if doesn't exist in indexByKey
        let matrixIndex = indexByKey.has(name)
        if (!matrixIndex) {
            indexByKey.set(name, indexByKey.size)
            matrixIndex = indexByKey.size
        }
        const matrixRow = [];

        // loop over values in value and put them in matrix based on indexByKey
        // if not in indexByKey, assign indexByKey based on current size of indexByKey - 1
        value.forEach(vertexName => {
            let vertexIndex = indexByKey.get(vertexName)
            if (!vertexIndex) {
                indexByKey.set(vertexName, indexByKey.size)
                vertexIndex = indexByKey.size
            }

            matrixRow[vertexIndex] = vertexName
        })

        return matrixRow
        
        
        /*
        [
              a b e f d c 
            a[0,1,1,1,0,0],
            b[0,0,1,0,1,0],
            c[0,0,0,0,0,0],
            d[0,0,0,0,0,0],
            e[0,0,1,0,0,1],
            f[0,1,0,0,0,0]
        ]
        */
    })
    
    console.log('MATRIX', matrix)
}

transformToMatrix(sampleGraph)

/*
MATRIX [
  [ 0, 0, 'b','e', 'f' ],
  [ 0, 0, 'e', 0, 0, 'd' ],
  [ 0,'b' ],
  [ 0, 0, 'e', 0, 0, 'c' ],
  [],
  []
]
*/