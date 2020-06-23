const x = [];
for (var i = 0; i < 500; i++) {
    x[i] = Math.random();
}

const trace = {
    x: x,
    type: 'histogram',
};
const data = [trace];

export default {
    data: data,
}