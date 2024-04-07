import './App.css';
import { useEffect, useState } from 'react'
import { createEmptyMatrix, solveSudoku } from './SolveSudoku';
import CytoscapeComponent from 'react-cytoscapejs';
import MakeSudokuGraph from './MakeSudokuGraph';



export default function App() {

  const [sudokuMat, setSudokuMat] = useState(createEmptyMatrix(9, 9));

  useEffect(() => {
    const solvedSudoku = createEmptyMatrix(9, 9);
    solveSudoku(solvedSudoku);
    setSudokuMat(solvedSudoku);
  }, []);


  return (
    <>
      <div>
       
        <MakeSudokuGraph mat={sudokuMat}/>
      </div>
    </>
  );
}


