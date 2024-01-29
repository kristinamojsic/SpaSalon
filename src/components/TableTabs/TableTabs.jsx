import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './TableTabs.module.css';
import DeleteIcon from '@mui/icons-material/Delete';

const generateData = () => {
 
};

const TableTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState(generateData());

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
   
    setData(generateData()); 
  };

  return (
    <div>
    <Box className={styles.tabBox}>
      <Tabs value={selectedTab} onChange={handleChangeTab} >
        <Tab label="Zakazani termini"  className={styles.tabs}/>
        <Tab label="Slobodni termini" className={styles.tabs}/>
      </Tabs>
      </Box>
      
      <Box p={3}>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center">8:00</TableCell>
                  <TableCell align="center">9:00</TableCell>
                  <TableCell align="center">9:00</TableCell>
                  <TableCell align="center">9:00</TableCell>
                  <TableCell align="center">9:00</TableCell>
                  <TableCell align="center">9:00</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*{data.map((item, index) => (*/}
                  <TableRow>
                    <TableCell>datum</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell >datum</TableCell>
                    <TableCell>datum</TableCell>
                    <TableCell sx={{ backgroundColor: '#fb6f92' }}>{<DeleteIcon sx={{color:'white', textAlign:'center'}}/>}</TableCell>
                    <TableCell  sx={{ backgroundColor: '#81C784' }}></TableCell>
                    <TableCell  sx={{ backgroundColor: '#fb6f92' }}></TableCell>
                    
                  </TableRow>
                  <TableRow>
                    <TableCell>datum</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
};

export default TableTabs;
