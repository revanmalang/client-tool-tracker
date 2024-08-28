import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable({ data }) {
  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">CDSID</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Asset Category</TableCell>
            <TableCell align="center">Asset Type</TableCell>
            <TableCell align="center">Asset ID</TableCell>
            <TableCell align="center">Project</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.cdsid}</TableCell>
              <TableCell align="center">{row.location}</TableCell>
              <TableCell align="center">{row.asset_category}</TableCell>
              <TableCell align="center">{row.asset_type}</TableCell>
              <TableCell align="center">{row.asset_id}</TableCell>
              <TableCell align="center">{row.project}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
