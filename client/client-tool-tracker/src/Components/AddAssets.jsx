import { useState } from 'react'
import { localhost } from '../Production';
function AddAssets({ isCancled }) {

  const [name, setName] = useState('');
  const [cdsid, setCdsid] = useState('');
  const [location, setLocation] = useState('');
  const [assetCategory, setAssetCategory] = useState('');
  const [assetId, setAssetId] = useState('');
  const [project , setProject] = useState('')
  const [assetType , setAssetType] = useState('')

  const clearFeild =  () =>{
    setName ('');
    setCdsid ('');
    setLocation('')
    setAssetCategory('')
    setAssetId('')
    setProject('')
    setAssetType('')
  }


  const onAddAsset = async () => {
    // if (name && cdsid && location && assetCategory && assetId && project && assetType) {
      const asset = { name, cdsid, location, assetCategory, assetId, project ,assetType };
      try {
        const response = await fetch(`${localhost}/assets/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ asset }),
        });

        if (!response.ok) {
          console.log('Network response was not ok');
        }

        const result = await response.json();
      } catch (error) {
        console.error('Error:', error);
      }
    // }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("add")
    onAddAsset({ name, cdsid, location, assetCategory, assetId , project,assetType});
    clearFeild()
  };

  return (
    <div className='assets-form-container'>
      <form className='assets-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
        </div>

        <div className='form-group'>
          <label>
            CDSID:
            <input type="text" value={cdsid} onChange={(e) => setCdsid(e.target.value)}  />
          </label>
        </div>

        <div className='form-group'>
          <label>
            Location:
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">Select</option>
              <option value="BENGALURU">Bangaluru</option>
              <option value="CHENNAI">Chennai</option>
              <option value="GOA">Goa</option>
              <option value="PUNE">Pune</option>
              <option value="COIMBATORE">Coimbatore</option>
              <option value="TRIVANDRUM">Trivandrum</option>
            </select>
          </label>
        </div>

        <div className='form-group'>
          <label>
            Asset Category:
            <select value={assetCategory} onChange={(e) => setAssetCategory(e.target.value)}>
              <option value="">Other</option>
              <option value="HARDWARE">Hardware</option>
              <option value="FLASHING_TOOL">Flashing Tool</option>
              <option value="PHONES">Phones</option>
              <option value="HEADSET">Headset</option>
              <option value="CAMERA">Camera</option>
              <option value="ANTENA">Antena</option>
              <option value="PENDRIVE">Pendrive</option>
              <option value="ACCESSORIES">Accessories</option>
              <option value="TEST_PANEL">Test Panel</option>
              <option value="OTHER">Other</option>
            </select>
          </label>
        </div>

        <div className='form-group'>
          <label>
            Asset Type:
            <input type="text" value={assetType} onChange={(e) => setAssetType(e.target.value)} />
          </label>
        </div>


        <div className='form-group'>
          <label>
            Asset ID:
            <input type="text" value={assetId} onChange={(e) => setAssetId(e.target.value)} />
          </label>
        </div>

        <div className='form-group'>
          <label>
            Project:
            <input type="text" value={project} onChange={(e) => setProject(e.target.value)} />
          </label>
        </div>

        <div className='form-buttons'>
          <button type="submit">Add Asset</button>
          <button type="button" onClick={() => {isCancled()}}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddAssets
