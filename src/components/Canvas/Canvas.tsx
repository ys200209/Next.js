import React, {useEffect, useRef} from 'react';
import * as go from 'gojs';
import Chart from 'chart.js/auto';

export default function Canvas() {
    const styleOptions = {
        width: "100%",
        height: "500px",
        border: "1px solid black"
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <>
            <div id="myDiagramDiv" style={styleOptions}></div>
        </>
    );
}

function init() {
    const $ = go.GraphObject.make;

    const myDiagram =
        new go.Diagram("myDiagramDiv",
            {
                layout: $(go.TreeLayout)
            });

    myDiagram.nodeTemplate =
        $(go.Node, "Vertical",
            $(go.Panel, "Auto",
                $(go.Shape, { fill: "transparent" },
                    new go.Binding("stroke", "color")),
                $(go.Picture,
                    { width: 300, height: 150, portId: "" },
                    new go.Binding("element", "datasets", makeLineChart))
            ),
            $(go.TextBlock,
                { margin: 8 },
                new go.Binding("text"))
        );

    // This Binding conversion function creates a Canvas element for a Picture
    // that has a rendering of a line chart drawn by Chart.js.
    function makeLineChart(datasets: any[], picture: go.Picture) {
        const canvases = document.getElementById("myCanvases");

        const canv = document.createElement("canvas");
        canv.width = canv.style.width = "600px";
        canv.height = canv.style.height = "300px";

        // apparently Chart.js expects the Canvas to be in a DIV
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.appendChild(canv);
        // add the DIV/Canvas to the DOM, temporarily
        canvases.appendChild(div);

        const config = {
            type: "line",
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: datasets
            },
            options: {
                animation: {
                    onProgress: () => picture.redraw(),
                    onComplete: () => {
                        const canvases = document.getElementById("myCanvases");
                        if (canvases) {  // remove the Canvas that was in the DOM for rendering
                            canvases.removeChild(div);
                        }
                        picture.redraw();
                    }
                }
            }
        };

        new Chart(canv, config);

        return canv;
    }

    myDiagram.model = new go.GraphLinksModel(
        {
            copiesArrays: true,
            copiesArrayObjects: true,
            nodeDataArray:
                [
                    {
                        key: 1, text: "Alpha",
                        datasets: [{
                            label: "Random data",
                            borderColor: "black",
                            data: makeRandomPoints(8, 10)
                        }]
                    },
                    {
                        key: 2, text: "Beta",
                        datasets: [{
                            label: "First dataset",
                            fill: false,
                            backgroundColor: "red",
                            borderColor: "red",
                            data: makeRandomPoints(8)
                        }, {
                            label: "Second dataset",
                            fill: false,
                            backgroundColor: "blue",
                            borderColor: "blue",
                            data: makeRandomPoints(8)
                        }]
                    },
                    {
                        key: 3, text: "Gamma", color: "green",
                        datasets: [{
                            label: "some data",
                            fill: false,
                            backgroundColor: "green",
                            borderColor: "green",
                            data: makeRandomPoints()
                        }]
                    }
                ],
            linkDataArray: [
                { from: 1, to: 2 },
                { from: 1, to: 3 }
            ]
        });
}

function makeRandomPoints(num?: number, range?: number): number[] {
    if (!num) num = 20;
    if (!range) range = 100;
    const pts: number[] = [];
    for (let i = 0; i < num; i++) {
        pts.push(Math.random() * range);
    }
    return pts;
}

function addNode() {
    myDiagram.model.commit(m => {
        const firstnode = myDiagram.nodes.first();
        const color = go.Brush.darken(go.Brush.randomColor());
        const data = {
            text: "Node " + (myDiagram.nodes.count + 1),
            color: color,
            datasets: [{
                label: "some data",
                fill: false,
                backgroundColor: color,
                borderColor: color,
                data: makeRandomPoints()
            }]
        };
        m.addNodeData(data);
        if (firstnode) {
            m.addLinkData({ from: firstnode.key, to: m.getKeyForNodeData(data) });
            // new node starts off at the same location as the parent node
            const newnode = myDiagram.findNodeForData(data);
            if (newnode) newnode.location = firstnode.location;
        }
    }, "added chart node");
}

function modifyNodes() {
    myDiagram.commit(diag => {
        diag.selection.each(node => {
            const oldset = node.data.datasets;
            if (!oldset) return;  // if it's a link, there's no datasets property
            diag.model.set(node.data, "datasets",
                [{
                    label: oldset[0].label,
                    fill: false,
                    backgroundColor: oldset[0].backgroundColor,
                    borderColor: oldset[0].borderColor,
                    data: makeRandomPoints()
                }]);
        });
    }, "modified selected nodes");
}
