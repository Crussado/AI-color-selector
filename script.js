// ---NEURAL NETWORK---
const NEURAL_CONFING = {
    hiddenLayers: [3, 3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
};

const TRAIN_SET = [
    // negro - blanco
    { input: {r: 0, g: 0, b: 0 }, output: { r: 255, g: 255, b: 255 } },
    // blanco - negro
    { input: {r: 255, g: 255, b: 255 }, output: { r: 0, g: 0, b: 0 } },

    { input: { r: 44, g: 62, b: 80}, output: { r: 52, g: 152, b: 219} },
    { input: { r: 39, g: 174, b: 96}, output: { r: 231, g: 76, b: 60} },
    { input: { r: 231, g: 76, b: 60}, output: { r: 39, g: 174, b: 96} },
    { input: { r: 52, g: 152, b: 219}, output: { r: 243, g: 156, b: 18} },
    { input: { r: 243, g: 156, b: 18}, output: { r: 44, g: 62, b: 80} },
    { input: { r: 155, g: 89, b: 182}, output: { r: 26, g: 188, b: 156} },
    { input: { r: 26, g: 188, b: 156}, output: { r: 155, g: 89, b: 182} },
    { input: { r: 211, g: 84, b: 0}, output: { r: 46, g: 204, b: 113} },
    { input: { r: 189, g: 195, b: 199}, output: { r: 142, g: 68, b: 173} },
    { input: { r: 46, g: 204, b: 113}, output: { r: 211, g: 84, b: 0} },
];

var network = new brain.NeuralNetwork(NEURAL_CONFING);

network.train(TRAIN_SET.map((e) => (
    {
        input: { r: e.input.r/255, g: e.input.g/255, b: e.input.b/255 },
        output: { r: e.output.r/255, g: e.output.g/255, b: e.output.b/255 }
    }
)));

// ---AUX FUNCTIONS---
function hex2rgb(color) {
    const r = parseInt(color.substr(1,2), 16)/255;
    const g = parseInt(color.substr(3,2), 16)/255;
    const b = parseInt(color.substr(5,2), 16)/255;
    return { r ,g ,b };
};

function rgb2hex({ r, g, b }) {
    return "#" + (1 << 24 | (r * 255) << 16 | (g * 255) << 8 | (b * 255)).toString(16).slice(1);
};

// ---UPDATE COLOR FUNCTION---
function update() {
    const input = document.getElementById('coloreador');
    var fondo = document.getElementById('fondo');
    fondo.style.background = input.value;

    const color = hex2rgb(input.value);
    const newColor = rgb2hex(network.run(color));
    fondo.style.color = newColor;
};
