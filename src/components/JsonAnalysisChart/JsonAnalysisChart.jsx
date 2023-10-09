import React, {useEffect} from "react";
import * as go from 'gojs';
import Chart from 'chart.js/auto';

export default function JsonAnalysisChart() {
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
            <div id="myCanvases" style={styleOptions}>
                <div id="myDiagramDiv" style={styleOptions}></div>
            </div>
        </>
    );
}

async function init() {
    // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
    // For details, see https://gojs.net/latest/intro/buildingObjects.html
    const $ = go.GraphObject.make;

    const myDiagram =
        new go.Diagram("myCanvases",
            {
                layout: $(go.TreeLayout)
            });

    myDiagram.nodeTemplate =
        $(go.Node, "Vertical",
            $(go.Panel, "Auto",
                $(go.Shape, {fill: "transparent"},
                    new go.Binding("stroke", "color")),
                $(go.Picture,
                    {width: 300, height: 150, portId: ""},
                    new go.Binding("element", "datasets", makeLineChart))
            ),
            $(go.TextBlock,
                {margin: 8},
                new go.Binding("text"))
        );

    async function getUsers() {
        return await fetch('http://localhost:9999/users')
    }

    let response = await getUsers();
    const users = await response.json();

    // This Binding conversion function creates a Canvas element for a Picture
    // that has a rendering of a line chart drawn by Chart.js.
    function makeLineChart(datasets, picture) {
        var canvases = document.getElementById("myCanvases");

        const canv = document.createElement("canvas");
        canv.width = canv.style.width = "100%";
        canv.height = canv.style.height = "500px";

        // apparently Chart.js expects the Canvas to be in a DIV
        var div = document.createElement("div");
        // div.style.position = "absolute";
        div.style.position = "relative";
        div.appendChild(canv);
        // add the DIV/Canvas to the DOM, temporarily
        canvases.appendChild(div);

        let labels = [...new Set(users.map(user => user.job))];

        console.log('labels: ', labels);
        console.log('datasets: ', datasets);

        var config = {  // Chart.js configuration, including the DATASETS data from the model data
            type: "line",
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                animation: {
                    onProgress: () => picture.redraw(),
                    onComplete: () => {
                        var canvases = document.getElementById("myCanvases");
                        if (canvases) {  // remove the Canvas that was in the DOM for rendering
                            // canvases.removeChild(div);
                        }
                        picture.redraw();
                    }
                }
            }
        };

        new Chart(canv, config);

        // return canv;
    }

    function getCountPointsByGender(gender) {
        let userByGender = users.filter(user => user.gender === gender);

        const countByJob = userByGender.reduce((groups, user) => {
            const job = user.job;
            if (!groups[job]) {
                groups[job] = [0];
            }
            groups[job]++;
            return groups;
        });
        const jobGroup = [...new Set(users.map(user => user.job))];
        let result = jobGroup.map(job => countByJob[job] || 0);
        return result;
    }

    myDiagram.model = new go.GraphLinksModel(
        {
            copiesArrays: true,
            copiesArrayObjects: true,
            nodeDataArray:
                [
                    {
                        key: 1, text: "", color: "white",
                        datasets: [{
                            label: "남자",
                            fill: false,
                            backgroundColor: "blue",
                            borderColor: "blue",
                            data: getCountPointsByGender('male')
                        }, {
                            label: "여자",
                            fill: false,
                            backgroundColor: "red",
                            borderColor: "red",
                            data: getCountPointsByGender('female')
                        }]
                    }
                ]
        });
}

function makeRandomPoints(num, range) {
    if (!num) num = 20;
    if (!range) range = 100;
    var pts = [];
    for (var i = 0; i < num; i++) {
        pts.push(Math.random() * range);
    }
    return pts;
}

function addNode() {
    myDiagram.model.commit(m => {
        var firstnode = myDiagram.nodes.first();
        var color = go.Brush.darken(go.Brush.randomColor());
        var data = {
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
            // new node starts off at same location as the parent node
            var newnode = myDiagram.findNodeForData(data);
            if (newnode) newnode.location = firstnode.location;
        }
    }, "added chart node");
}

function modifyNodes() {
    myDiagram.commit(diag => {
        diag.selection.each(node => {
            var oldset = node.data.datasets;
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

