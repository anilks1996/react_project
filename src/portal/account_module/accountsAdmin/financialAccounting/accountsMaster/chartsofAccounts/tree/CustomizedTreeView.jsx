import React, {useState, useEffect} from 'react';
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { styled, alpha } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

function ExpandIcon(props) {
  return <AddBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function CollapseIcon(props) {
  return <IndeterminateCheckBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function EndIcon(props) {
  return <DisabledByDefaultRoundedIcon {...props} sx={{ opacity: 0.3 }} />;
}

export default function CustomTreeView(props) {

  const dispatch = useDispatch();
  const [accountsList, setAccountsList] = React.useState([]);
  const [accountsChartList, setAccountsChartList] = useState([]);
  const [child1AccountList, setChild1AccountList] = useState([]);
  const [child2AccountList, setChild2AccountList] = useState([]);
  const [child3AccountList, setChild3AccountList] = useState([]);
  const [child4AccountList, setChild4AccountList] = useState([]);
  const [child5AccountList, setChild5AccountList] = useState([]);
  const [child6AccountList, setChild6AccountList] = useState([]);
  const [child7AccountList, setChild7AccountList] = useState([]);
  const [child8AccountList, setChild8AccountList] = useState([]);
  React.useEffect(() => {
    axios.get("http://localhost:3030/accountsBaseList").then((response) => {
      const accList = response.data;
      setAccountsList(accList);
    });
    axios.get("http://localhost:3030/accountsChartList").then((response) => {
      const accChList = response.data;
      setAccountsChartList(accChList);
    });
    console.log("accountsList=" + accountsList);
    
  }, []);

  const getChild1Account = (e, accId, accName) => {
    var msg = "";
    console.log("======== " + accId + " ==================");
    const temp1 = accountsChartList.filter(
      (accl) => accl.parent_chart_id == accId
    );
    setChild1AccountList(temp1);
    child1AccountList.map((tem) => {
      //msg = msg + "" + tem.id + ", " + tem.name;
      //alert("paccId=" + tem.parent_chart_id);
    });
    props.idName({ id: accId, name: accName });
  };
  const getChild2Account = (e, accId, accName) => {
    //alert('2nd level,  id='+accId);
    const temp2 = accountsChartList.filter(
      (accl) => accl.parent_chart_id == accId
    );
    setChild2AccountList(temp2);
    props.idName({ id: accId, name: accName });
  };
  const getChild3Account = (e, accId, accName) => {
    //alert('3rd level,  id='+accId);
    const temp3 = accountsChartList.filter(
      (accl) => accl.parent_chart_id == accId
    );
    setChild3AccountList(temp3);
    props.idName({ id: accId, name: accName });
  };
  const getChild4Account = (e, accId, accName) => {
    const temp = accountsChartList.filter(
      (accl) => accl.parent_chart_id == accId
    );
    setChild4AccountList(temp);
    props.idName({ id: accId, name: accName });
  };
  const getChild5Account = (e, accId, accName) => {
    const temp = accountsChartList.filter(
      (accl) => accl.parent_chart_id == accId
    );
    setChild5AccountList(temp);
    props.idName({ id: accId, name: accName });
  };

  const getChild6Account = (e, accId, accName) => {
    const temp = accountsChartList.filter(
      (accl) => accl.parent_chart_id == accId
    );
    setChild6AccountList(temp);
    props.idName({ id: accId, name: accName });
  };
  const getChild7Account = (e, accId, accName) => {
    const temp = accountsChartList.filter(
      (accl) => accl.parent_chart_id == accId
    );
    setChild7AccountList(temp);
    props.idName({ id: accId, name: accName });
  };
  const getChild8Account = (e, accId, accName) => {
    const temp = accountsChartList.filter(
      (accl) => accl.parent_chart_id == accId
    );
    setChild8AccountList(temp);
    props.idName({ id: accId, name: accName });
  };


  return (
    <SimpleTreeView
      aria-label="customized"
      defaultExpandedItems={['1', '3']}
      slots={{
        expandIcon: ExpandIcon,
        collapseIcon: CollapseIcon,
        endIcon: EndIcon,
      }}
      sx={{ overflowX: 'hidden', minHeight: 270, flexGrow: 1, maxWidth: 300 }}
    >
    {
      accountsList && accountsList.length>0?
      <div>
        { //0th level
          accountsList.map((acc0)=>(
            <CustomTreeItem itemId={acc0.id} label={acc0.name} onClick={(e) => {getChild1Account(e, acc0.id, acc0.name);}}>
              { //1st level
                child1AccountList && child1AccountList.map((acc1)=>(
                  <CustomTreeItem itemId={acc1.id} label={acc1.name} onClick={(e) => {getChild2Account(e, acc1.id, acc1.name);}}>
                    { //2nd level
                      child2AccountList && child2AccountList.map((acc2)=>(
                        <CustomTreeItem itemId={acc2.id} label={acc2.name} onClick={(e) => {getChild3Account(e, acc2.id, acc2.name);}}>
                          { //3rd level
                            child3AccountList && child3AccountList.map((acc3)=>(
                              <CustomTreeItem itemId={acc3.id} label={acc3.name} onClick={(e) => {getChild4Account(e, acc3.id, acc3.name);}}>
                                { //4th level
                                  child4AccountList && child4AccountList.map((acc4)=>(
                                    <CustomTreeItem itemId={acc4.id} label={acc4.name} onClick={(e) => {getChild5Account(e, acc4.id, acc4.name);}}>
                                      { //5th level
                                        child5AccountList && child5AccountList.map((acc5)=>(
                                          <CustomTreeItem itemId={acc5.id} label={acc5.name} onClick={(e) => {getChild6Account(e, acc5.id, acc5.name);}}>
                                            { //6th level
                                              child6AccountList && child6AccountList.map((acc6)=>(
                                                <CustomTreeItem itemId={acc6.id} label={acc6.name} onClick={(e) => {getChild7Account(e, acc6.id, acc6.name);}}>
                                                  { //7th level
                                                    child7AccountList && child7AccountList.map((acc7)=>(
                                                      <CustomTreeItem itemId={acc7.id} label={acc7.name} onClick={(e) => {getChild8Account(e, acc7.id, acc7.name);}}>
                                                        { //8th level
                                                          child8AccountList && child8AccountList.map((acc8)=>(
                                                            <CustomTreeItem itemId={acc8.id} label={acc8.name} onClick="#">
                                                              
                                                            </CustomTreeItem>
                                                          ))
                                                        }
                                                      </CustomTreeItem>
                                                    ))
                                                  }
                                                </CustomTreeItem>
                                              ))
                                            }
                                          </CustomTreeItem>
                                        ))
                                      }
                                    </CustomTreeItem>
                                  ))
                                }
                              </CustomTreeItem>
                            ))
                          }
                        </CustomTreeItem>
                      ))
                    }
                  </CustomTreeItem>
                ))
              }
            </CustomTreeItem>
          ))
        }
      </div>
      :
      <div>
      
      </div>
    }
      
    </SimpleTreeView>
  );
}