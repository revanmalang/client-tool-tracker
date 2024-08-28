function Asset({ data }) {
  const { name , cdsid , location, asset_category, asset_id } = data
  return (
    <div className='asset'>
      <h3>Name: {name}</h3>
      <h3>CDSID: {cdsid}</h3>
      <h3>Location: {location}</h3>
      <h3>Asset Category: {asset_category}</h3>
      <h3>Asset ID: {asset_id}</h3>
    </div>
  )
}

export default Asset
