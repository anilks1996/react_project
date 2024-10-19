import React, { useState } from 'react';
import './TreeViews.css';
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';
import { TiDelete } from "react-icons/ti";


const TreeNode = ({ node, onSelect, selectedNodeId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const selectNode=()=>{
        onSelect(node);
    }

    return (
        <div className={`tree-node ${node.id === selectedNodeId ? 'selected' : ''}`}>
            <div  className="tree-node-label">
                {node.children && node.children.length > 0 && (
                    <span onClick={toggleOpen} className="tree-node-toggle">
                        {isOpen ? <FaMinusSquare style={{color:'rgb(241 130 85)', marginLeft:'0.1rem'}}/> : <FaPlusSquare style={{color:'rgb(26 157 191)', marginLeft:'0.1rem'}}/>}
                    </span>
                )}                
                
                {
                    node.children && node.children.length===0?
                    <span style={{fontSize:'0.9rem'}} onClick={selectNode}><TiDelete style={{color:'rgb(231 206 206)', marginLeft:'0.1rem', width:'1.5rem', height:'1.5rem'}} /> {node.label}</span>
                    :
                    <span style={{fontSize:'0.9rem'}} onClick={selectNode} className={node.id === selectedNodeId ? 'selectedParentNode' : ''}>&nbsp;{node.label}&nbsp;</span>
                }
            </div>
            {isOpen && node.children && (
                <div className="tree-node-children">
                    {node.children.map(childNode => (
                        <TreeNode key={childNode.id} node={childNode} onSelect={onSelect} selectedNodeId={selectedNodeId}/>
                    ))}
                </div>
            )}
        </div>
    );
};

const TreeViews = ({ data, onSelect, selectedNodeId}) => {
    return (
        <div className="tree">
            {data.map(node => (
                <TreeNode key={node.id} node={node} onSelect={onSelect} selectedNodeId={selectedNodeId}/>
            ))}
        </div>
    );
};

export default TreeViews;