import React, {Component} from 'react';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    withStyles, Table , TableBody , TableCell, TableHead, TablePagination, 
    TableRow, Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip, Switch
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import ToolbarStyles from './ToolbarStyles';
import UserTableStyles from './UserTableStyles';
import CustomModel from 'components/Model/Model';

//*************Tool Bar For The Table Start*********//
let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;
  
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="subheading" id="tableTitle">
              User Mangement
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0  &&
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
        </div>
      </Toolbar>
    );
};
//Tool Bar Prop-Types
EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};
  
EnhancedTableToolbar = withStyles(ToolbarStyles)(EnhancedTableToolbar);
//**********Tool Bar For The Table End**********//

//***************Table Header Start**************//
const columnData = [
    { id: 'firstName',  label: 'First Name' },
    { id: 'lastName',  label: 'Last Name' },
    { id: 'email',  label: 'Email' },
    { id: 'userLevel',  label: 'User Level' },
    { id: 'mobile',  label: 'Mobile No' },
    { id: 'state',  label: 'State' },
    { id: 'action',  label: 'Action' },

  ];
class EnhancedTableHead extends React.Component {
  
    render() {
      const { onSelectAllClick, numSelected, rowCount } = this.props;
  
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                    </TableCell>
                    {columnData.map(column => {
                    return (
                        <TableCell
                        key={column.id}
                        >
                        {column.label}
                        </TableCell>
                    );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}
  
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
//***************Table Header End**************//

//**********User Table Main Component***********//
class UserManagement extends Component {

    constructor(){
        super()
        this.state = {
            data : [
                {fname:"Siva", lname:"Prakash", email:"siva@mail.com", userLevel:"Manager", mobile:"9876543120", check : true},
                {fname:"Siva", lname:"Prakash", email:"siva@mail.com", userLevel:"Manager", mobile:"9876543120", check : true},
                {fname:"Siva", lname:"Prakash", email:"siva@mail.com", userLevel:"Manager", mobile:"9876543120", check : false},
                {fname:"Siva", lname:"Prakash", email:"siva@mail.com", userLevel:"Manager", mobile:"9876543120", check : false},
                {fname:"Siva", lname:"Prakash", email:"siva@mail.com", userLevel:"Manager", mobile:"9876543120", check : true}
            ],
            emptyRows : 0,
            checkedA :true,
            open :false
        }
    }
    handleSelectAllClick (){
        alert('Clicked');
    }

    handleChangePage (){
        alert('Page Changed')
    }

    handleChangeRowsPerPage (){
        alert("Row Changed")
    }

    handleChange (){
        alert("Switch Change Data")
    }

    openModel = () => {
        this.setState({ open:true });
    };

    close = () => {
        this.setState({ open: false });
      };
        
    render (){
        const {classes} = this.props;
        const { data , emptyRows} = this.state;

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={0} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                        numSelected={0}
                        onSelectAllClick={this.handleSelectAllClick}
                        rowCount={5}
                        />
                    

                    <TableBody>
                        {data
                            .map((n,d) => {
                            const isSelected = false;
                            return (
                                <TableRow
                                hover
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={-1}
                                key={d}
                                selected={isSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={isSelected} />
                                    </TableCell>
                                    <TableCell >{n.fname}</TableCell>
                                    <TableCell >{n.lname}</TableCell>
                                    <TableCell >{n.email}</TableCell>
                                    <TableCell >{n.userLevel}</TableCell>
                                    <TableCell >{n.mobile}</TableCell>
                                    <TableCell>
                                    <Switch
                                    checked={n.check}
                                    onChange={!n.check}
                                    value="checkedA"
                                  />
                                  </TableCell>
                                  <TableCell>
                                    <Tooltip id="tooltip-icon" title="Create">
                                        <IconButton aria-label="Create" onClick={this.openModel}>
                                        <Create />
                                        </IconButton>
                                    </Tooltip>
                                  </TableCell>
                                </TableRow>
                            );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    </Table>
                </div>
                <TablePagination
                component="div"
                count={10}
                rowsPerPage={5}
                page={1}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                <CustomModel open={this.state.open} close={this.close}/>
            </Paper>
        )
    }
}

export default withStyles(UserTableStyles)(withRouter(UserManagement));