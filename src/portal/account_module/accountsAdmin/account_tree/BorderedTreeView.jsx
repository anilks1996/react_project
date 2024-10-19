import React, {useEffect, useState } from 'react'
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { styled, alpha } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import axios from 'axios';
import { a } from '@react-spring/web';

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

export default function BorderedTreeView() {

  const [accountsList,setAccountsList]=useState([]);
  const [accountsChartList,setAccountsChartList]=useState([]);
  const [child1AccountList,setChild1AccountList]=useState([]);
  const [child2AccountList,setChild2AccountList]=useState([]);
  const [child3AccountList,setChild3AccountList]=useState([]);
  const [child4AccountList,setChild4AccountList]=useState([]);
  const [child5AccountList,setChild5AccountList]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3030/accountsBaseList").then((response)=>{
      const accList=response.data;
      setAccountsList(accList);
    });
    axios.get("http://localhost:3030/accountsChartList").then((response)=>{
      const accChList=response.data;
      setAccountsChartList(accChList);
    });
    console.log("accountsList="+accountsList)
  },[]);
 
  const getChild1Account=(e,accId)=>{
    //alert('1st level,  id='+accId);
    var msg="";
    const temp1=accountsChartList.filter((accl)=>accl.parent_chart_id===accId && accl.lavel_s===1);
    setChild1AccountList(temp1);
    child1AccountList.map((tem)=>{
      msg=msg+""+tem.id+", "+tem.name;
    })
    //alert('parent ='+accId+', child='+msg);
  }
  const getChild2Account=(e,accId)=>{
    //alert('2nd level,  id='+accId);
    const temp2=accountsChartList.filter((accl)=>accl.parent_chart_id===accId);
    setChild2AccountList(temp2);
  }
  const getChild3Account=(e,accId)=>{
    //alert('3rd level,  id='+accId);
    const temp3=accountsChartList.filter((accl)=>accl.parent_chart_id===accId);
    setChild3AccountList(temp3);
  }
  const getChild4Account=(e,accId)=>{
    const temp=accountsChartList.filter((accl)=>accl.parent_chart_id===accId);
    setChild4AccountList(temp);
  }
  const getChild5Account=(e,accId)=>{
    const temp=accountsChartList.filter((accl)=>accl.parent_chart_id===accId);
    setChild5AccountList(temp);
  }


  return (
    <SimpleTreeView
      aria-label="customized"
      defaultExpandedItems={['1', '3']}
      slots={{
        expandIcon: ExpandIcon,
        collapseIcon: CollapseIcon,
        endIcon: EndIcon,
      }}
      sx={{ overflowX: 'hidden', minHeight: 270, flexGrow: 1, maxWidth: '100%'}}
    >

    {
      accountsList && accountsList.length>0?
      <div>
      {/* 0th level */}
        {
          accountsList.map((acc0,index)=>(
            <CustomTreeItem itemId={acc0.id} label={acc0.name} onClick={(e)=>{getChild1Account(e,acc0.id)}}> 
              
             {/* 1st level */}
              {
                 child1AccountList.map((acc1,index)=>(
                  <CustomTreeItem itemId={acc1.id} label={acc1.name} onClick={(e)=>{getChild2Account(e,acc1.id)}}>   
                  {/* 2nd level */}
                  {
                      child2AccountList.map((acc2,index)=>(
                      <CustomTreeItem itemId={acc2.id} label={acc2.name} onClick={(e)=>{getChild3Account(e,acc2.id)}}> 
                        
                      {/* 3rd level */}
                      {
                          child3AccountList.map((acc3,index)=>(
                          <CustomTreeItem itemId={acc3.id} label={acc3.name} onClick={(e)=>{getChild4Account(e,acc3.id)}}> 
                            
                          {/* 4th level */}
                          {
                              child4AccountList.map((acc4,index)=>(
                              <CustomTreeItem itemId={acc4.id} label={acc4.name} onClick={(e)=>{getChild5Account(e,acc4.id)}}> 
                                
                              {/* 5th level */}
                              {
                                  child5AccountList.map((acc5,index)=>(
                                  <CustomTreeItem itemId={acc5.id} label={acc5.name} onClick="#"> 
                                    
                                  

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
        <CustomTreeItem itemId="1" label="Main">
          <CustomTreeItem itemId="2" label="Hello" />
          <CustomTreeItem itemId="3" label="Subtree with children">
            <CustomTreeItem itemId="6" label="Hello" />
            <CustomTreeItem itemId="7" label="Sub-subtree with children">
              <CustomTreeItem itemId="9" label="Child 1 Sub-subtree with children" />
              <CustomTreeItem itemId="10" label="Child 2 Sub-subtree with children Tree Mapper Sub-subtree with children Tree Mapper" />
              <CustomTreeItem itemId="11" label="Child 3 Sub-subtree with children Tree Mapper Sub-subtree with children Tree Mapper Sub-subtree with children Tree Mapper Sub-subtree with children Tree Mapper Temple Temple" />
              <CustomTreeItem itemId="12" label="Child 1" />
              <CustomTreeItem itemId="13" label="Child 2" />
              <CustomTreeItem itemId="14" label="Child 3" />
              <CustomTreeItem itemId="15" label="Child 1" />
              <CustomTreeItem itemId="16" label="Child 2" />
              <CustomTreeItem itemId="17" label="Child 3" />
              <CustomTreeItem itemId="18" label="Child 1" />
              <CustomTreeItem itemId="19" label="Child 2" />
              <CustomTreeItem itemId="20" label="Child 3" />
            </CustomTreeItem>
            <CustomTreeItem itemId="8" label="Hello" />
          </CustomTreeItem>
          <CustomTreeItem itemId="4" label="World" />
          <CustomTreeItem itemId="5" label="Something something" />
          <CustomTreeItem itemId="22" label="Child 2" />
          <CustomTreeItem itemId="23" label="Child 3" />
          <CustomTreeItem itemId="24" label="Child 1" />
          <CustomTreeItem itemId="25" label="Child 2" />
          <CustomTreeItem itemId="26" label="Child 3" />
        </CustomTreeItem>
      </div>
    }
      
    </SimpleTreeView>
  );
}