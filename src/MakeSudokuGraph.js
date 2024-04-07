import React from 'react'
import { useState, useEffect } from 'react'
import CytoscapeComponent from 'react-cytoscapejs';

function MakeSudokuGraph({ mat }) {
    const [graphData, setGraphData] = useState([])
    
    const colors = [
        '#836FFF', // Cor para o número 1
        '#00BFFF', // Cor para o número 2
        '#90EE90', // Cor para o número 3
        '#DAA520', // Cor para o número 4
        '#33ffff', // Cor para o número 5
        '#ff33ff', // Cor para o número 6
        '#ff5733', // Cor para o número 7 
        '#33ff57', // Cor para o número 8 
        '#EE82EE'  // Cor para o número 9 
    ];
    
    useEffect(() => {
        
        const generateNodes = () => {
            const nodes = [];
            mat.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (cell !== 0) {
                        const color = colors[cell - 1]; 
                        nodes.push({
                            data: {
                                id: `${rowIndex}-${colIndex}`,
                                label: cell.toString(),
                                color: color 
                            }
                        });
                        
                    }
                });
            });
            return nodes;
        };
    
        
        const generateEdges = () => {
            const edges = [];
    
            mat.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (cell !== 0) {

                        for (let i = 0; i < 9; i++) {
                            if (i !== colIndex && mat[rowIndex][i] !== 0) {
                                edges.push({ data: { source: `${rowIndex}-${colIndex}`, target: `${rowIndex}-${i}` } });
                            }
                        }
                       
                        for (let i = 0; i < 9; i++) {
                            if (i !== rowIndex && mat[i][colIndex] !== 0) {
                                edges.push({ data: { source: `${rowIndex}-${colIndex}`, target: `${i}-${colIndex}` } });
                            }
                        }
                        
                        const blockStartRow = Math.floor(rowIndex / 3) * 3;
                        const blockStartCol = Math.floor(colIndex / 3) * 3;
                        for (let i = blockStartRow; i < blockStartRow + 3; i++) {
                            for (let j = blockStartCol; j < blockStartCol + 3; j++) {
                                if (i !== rowIndex && j !== colIndex && mat[i][j] !== 0) {
                                    edges.push({ data: { source: `${rowIndex}-${colIndex}`, target: `${i}-${j}` } });
                                }
                            }
                        }
                    }
                });
            });
            return edges;
        };
    
       
        setGraphData((prevData) => {
            const newNodes = generateNodes();
            const newEdges = generateEdges();
            return [...newNodes, ...newEdges];
        });
    }, [mat]);


    const [name, setName]= useState('circle')
    function handleName(){
        if(name == 'circle'){
            setName('grid')
        } else {
            setName('circle')
        }
        
    }


    return (

        <div>
            <button onClick={handleName}>mude o layout</button>
            
                <CytoscapeComponent
                    elements={graphData}
                    style={{ width: "100%", height: "100vh",  }}
                    layout={{
                        name: name,
                        rows: 9,
                        animate: true,
                        animationDuration: 1000,
                        padding: 80,
                    }}

                    stylesheet={[
                        {
                            selector: "node",
                            style: {
                                backgroundColor: "data(color)",
                                width: 60,
                                height: 60,
                                label: "data(label)",
                                "text-valign": "center",
                                "text-halign": "center",
                                "text-outline-color": "#555",
                                "text-outline-width": "2px",
                                "overlay-padding": "6px",
                                "z-index": "10"
                            }
                        },
                        {
                            selector: "label",
                            style: {
                                color: "white",
                                fontSize: 20
                            }
                        }
                    ]}
                />
            
        </div>
    );
}


export default MakeSudokuGraph