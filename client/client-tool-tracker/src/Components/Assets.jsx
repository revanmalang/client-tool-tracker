import { useState, useEffect } from 'react';
import Asset from './Asset';
import AddAssets from './AddAssets';
import BasicTable from './BasicTable';

function Assets({ data, download }) {

  const [isClicked, setIsClicked] = useState(false);
  const isCancled = () => {
    setIsClicked(false)
  }

  console.log(data.length)

  return (
    <div className='assets'>
      {data && data.length>0 ? <BasicTable data={data}/> : null}
      <div className="assets-buttons">
        <button onClick={() => setIsClicked(prev => !prev)}>Add</button>
        {data && data.length >0 && <button onClick={() => { download() }}>Download Data</button>}
      </div>
      {isClicked ? <AddAssets isCancled={isCancled} /> : null}
    </div>
  )
}

export default Assets
