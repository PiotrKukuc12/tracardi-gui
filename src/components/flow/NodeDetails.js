import React, {useEffect, useState} from "react";
import './NodeDetails.css';
import {BsInfoCircle} from "@react-icons/all-files/bs/BsInfoCircle";
import IconButton from "../elements/misc/IconButton";
import {GoSettings} from "@react-icons/all-files/go/GoSettings";
import ConsoleView from "../elements/misc/ConsoleView";
import ConfigEditor from "./editors/ConfigEditor";
import NodeInfo from "./NodeInfo";
import FilterTextField from "../elements/forms/inputs/FilterTextField";
import {VscJson} from "@react-icons/all-files/vsc/VscJson";
import {JsonForm} from "../elements/forms/JsonForm";
import "../elements/forms/JsonForm"
import {VscTools} from "@react-icons/all-files/vsc/VscTools";
import MutableMergeRecursive from "../../misc/recursiveObjectMerge";

export function NodeDetails({node, onConfig, onLabelSet}) {

    const [tab, setTab] = useState(3);

    useEffect(() => {

            if (tab === 1 && !node?.data?.spec?.manual) {
                setTab(0)
            }

            if (tab === 3 && !node?.data?.spec?.form) {
                setTab(2)
            }

            if (tab === 2 && !node?.data?.spec?.init) {
                setTab(0)
            }
        },
        [node, tab])

    const handleFormSubmit = (config) => {
        node.data.spec.init = config
        if (onConfig) {
            onConfig(config)
        }
    }

    const handleFormChange = (value) => {
        MutableMergeRecursive(node.data.spec.init, value)
    }

    return <div className="NodeDetails">
        <div className="Title">
            <FilterTextField label={null}
                             initValue={node?.data?.metadata?.name}
                             onSubmit={onLabelSet}
                             onChange={(event) => onLabelSet(event.target.value)}/>
            <span>
                <IconButton
                    label="Info"
                    onClick={() => setTab(0)}
                    selected={tab === 0}>
                        <BsInfoCircle size={22}/>
                </IconButton>
                {node?.data?.spec?.form && <IconButton
                    label="Config Editor"
                    onClick={() => setTab(3)}
                    selected={tab === 3}>
                    <GoSettings size={22}/>
                </IconButton>}
                {node?.data?.spec?.init && <IconButton
                    label="Json Config"
                    onClick={() => setTab(2)}
                    selected={tab === 2}>
                    <VscTools size={22}/>
                </IconButton>}
                <IconButton
                    label="Raw"
                    onClick={() => setTab(4)}
                    selected={tab === 4}>
                        <VscJson size={22}/>
                </IconButton>

                </span>
        </div>
        <div className="Pane">
            {tab === 0 && <NodeInfo node={node} onLabelSet={onLabelSet}/>}
            {tab === 2 && node?.data?.spec?.init &&
            <ConfigEditor
                config={node?.data?.spec?.init}
                manual={node?.data?.spec?.manual}
                onConfig={handleFormSubmit}
            />}
            {tab === 3 && node?.data?.spec?.form &&
            <JsonForm
                pluginId={node?.data?.spec?.id}
                value={node?.data?.spec?.init}
                schema={node?.data?.spec?.form}
                onSubmit={handleFormSubmit}
                onChange={handleFormChange}
            />}

            {tab === 4 && <ConsoleView label="Action raw data" data={node}/>}

        </div>
    </div>
}

// function areEqual(prevProps, nextProps) {
//     console.log(prevProps.node.id===nextProps.node.id, prevProps, nextProps)
//     return prevProps.node.id===nextProps.node.id;
// }
// const MemoNodeDetails = React.memo(NodeDetails, areEqual);

// export default MemoNodeDetails;