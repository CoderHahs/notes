const y0 = [];
const y1 = [];
for (var i = 0; i < 50; i++) {
    y0[i] = Math.random();
    y1[i] = Math.random() + 1;
}

const trace1 = {
    y: y0,
    type: 'box'
};

const trace2 = {
    y: y1,
    type: 'box'
};

const data = [trace1, trace2];

export default {
    data: data,
    // layout: { margin: { t: 0, r: 0, l: 30 } },
}