import { Stage, StageAvg, Solve } from './Defs';

const avg_solve : StageAvg[] = [
    {name: "FB", time: 1.16},
    {name: "SS", time: 1.67},
    {name: "SP", time: 0.33},
    {name: "CMLL", time: 1.57},
    {name: "EOLRb", time: 1.17},
    {name: "EP", time: 0.75},
]

const solve1: Stage[] = [
    { name: "FB", color: "darkseagreen", moves: "z' R' U F' U R U' M' f' z", time: 2.27, count: 10 },
    { name: "SS", color: "orange", moves: "R U R' U2' R r U R'", time: 1.48, count: 8 },
    { name: "SP", color: "#f2cd05", moves: " U' M2' U2' r' U' R", time: 1.30, count: 6 },
    { name: "CMLL", color: "steelblue", moves: "R U R' U' R' F R R U' R' U' R U R' F'", time: 2.31, count: 15 },
    { name: "EOLRb", color: "mediumpurple", moves: "U' M U2' M' U' U' M2'", time: 1.53, count: 7 },
    { name: "EP", color: "indianred", moves: " U M' U2' M U2' ", time: 1.00, count: 5 }
]

const emptySolve: Solve = {
    starting_time: 0,
    stages: [
        // {"name": "FB", time: 0.00, color: "", count: 0, moves: ""},
        // {"name": "SS", time: 0.00, color: "", count: 0, moves: ""},
        // {"name": "SP", time: 0.00, color: "", count: 0, moves: ""},
        // {"name": "CMLL", time: 0.00, color: "", count: 0, moves: ""},
        // {"name": "EOLRb", time: 0.00, color: "", count: 0, moves: ""},
        // {"name": "EP", time: 0.00, color: "", count: 0, moves: ""},
    ],
    scramble: ""
}


const solves: Solve[] = [
    {
        "stages":
            [{ "name": "FB", "color": "#8b69db", "moves": "l r U' x' D2' r' F'", "time": 1.16666666666667, "count": 7 }, { "name": "SS", "color": "#69bddb", "moves": "R2 U M' U R U' r U r' U' r2", "time": 2, "count": 11 }, { "name": "SP", "color": "#699adb", "moves": "U' R'", "time": 0.2, "count": 2 }, { "name": "CMLL", "color": "#69db73", "moves": "M' L' U' L U' L' U L U' L' U L U' L' U2 L", "time": 1.56666666666667, "count": 16 }, { "name": "EOLRb", "color": "#db9169", "moves": "U' M' U2' M' U2' M U' M' U2' M2'", "time": 1.1, "count": 10 }, { "name": "EP", "color": "#d15e5e", "moves": "U' M' U2' M' U2' M2'", "time": 0.746666666666667, "count": 6 }],
        starting_time: 530 / 30,
        scramble: "D' F2 L2 U F2 U B2 L2 B2 F2 U' F' D' R F' L B L F2 D2 B' y"
    },
    { "stages": [{ "name": "FB", "color": "#8b69db", "moves": "U' R' u U M' U' R B'", "time": 1.06666666666667, "count": 8 }, { "name": "SS", "color": "#69bddb", "moves": "U R U' R' U2' r U r'", "time": 1.8, "count": 8 }, { "name": "SP", "color": "#699adb", "moves": "U R' U2' R", "time": 0.4, "count": 4 }, { "name": "CMLL", "color": "#69db73", "moves": "M' U2 R U2' R2' F R F' U2' R' F R F'", "time": 1.56666666666667, "count": 13 }, { "name": "EOLRb", "color": "#db9169", "moves": "U' M U' M' U M' U2' M'", "time": 1.03333333333333, "count": 8 }, { "name": "EP", "color": "#d15e5e", "moves": "U' M2' U2' M U2' M'", "time": 0.723333333333334, "count": 6 }], starting_time: 1300 / 30, scramble: "R2 U' R2 B2 L2 U R2 D B2 D B' L' U' B U' L F L F2 U' L2 y2" },
    { "stages": [{ "name": "FB", "color": "#8b69db", "moves": "D' L' U2 L' D' R2 U R' U F'", "time": 1.56666666666667, "count": 10 }, { "name": "SS", "color": "#69bddb", "moves": "U R U R U R2'", "time": 1.23333333333333, "count": 6 }, { "name": "SP", "color": "#699adb", "moves": "U r", "time": 0.266666666666667, "count": 2 }, { "name": "CMLL", "color": "#69db73", "moves": "U2' R' F R U F U' R U R' U' F'", "time": 1.4, "count": 12 }, { "name": "EOFBb", "color": "#db9169", "moves": "U2' M'", "time": 0.533333333333333, "count": 2 }, { "name": "EP", "color": "#d15e5e", "moves": "U' M' U2' M U2' M' U'", "time": 0.76, "count": 7 }], starting_time: 2038 / 30, scramble: "L2 B2 U2 R2 B2 R2 U L2 D2 U B2 F L D2 U2 L' B U' F' R' D' z y" },
    { "stages": [{ "name": "FB", "color": "#8b69db", "moves": "u r' B' r' F r F'", "time": 1.23333333333333, "count": 7 }, { "name": "SS", "color": "#69bddb", "moves": "U' R' U R U R' U2' R2", "time": 1.2, "count": 8 }, { "name": "SP", "color": "#699adb", "moves": "U2' M' U' r'", "time": 0.4, "count": 4 }, { "name": "CMLL", "color": "#69db73", "moves": "U2' F R' F' R U2 R U2' R'", "time": 1.56666666666667, "count": 9 }, { "name": "EOLRb", "color": "#db9169", "moves": "M' U' M' U' M U' M' U' M2' U2' M2'", "time": 1.36666666666667, "count": 11 }, { "name": "EP", "color": "#d15e5e", "moves": "U M' U2' M2' U2' M' U2' M2'", "time": 0.793333333333332, "count": 8 }], starting_time: 2668 / 30, scramble: "D L2 F2 R2 D B2 D R2 D' U2 L2 F' D' L' D2 B' U F R B z y2" }
]

export { solves, emptySolve }