// adding padding
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resolution = 10;
canvas.width = 1200; //1880 //1200
canvas.height = 600; // 980 // 600

const COL = canvas.width/resolution;
const ROW = canvas.height/resolution;

function buildGrid() {
    return new Array(Math.floor(COL)).fill(null)
        .map(() => new Array(Math.floor(ROW)).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
}

function Grid1() {
    let gg = new Array(Math.floor(COL)).fill(null)
        .map(() => new Array(Math.floor(ROW)).fill(0));

    gg[12 + 1][8] = 1;
    gg[12 + 2][8] = 1;
    gg[12 + 1][9] = 1;
    gg[12 + 2][9] = 1;
    gg[12 + 11][8] = 1;
    gg[12 + 11][9] = 1;
    gg[12 + 11][10] = 1;
    gg[12 + 12][7] = 1;
    gg[12 + 12][11] = 1;
    gg[12 + 13][6] = 1;
    gg[12 + 13][12] = 1;
    gg[12 + 14][6] = 1;
    gg[12 + 14][12] = 1;
    gg[12 + 15][9] = 1;
    gg[12 + 16][7] = 1;
    gg[12 + 16][11] = 1;
    gg[12 + 17][8] = 1;
    gg[12 + 17][9] = 1;
    gg[12 + 17][10] = 1;
    gg[12 + 18][9] = 1;
    gg[12 + 21][6] = 1;
    gg[12 + 21][7] = 1;
    gg[12 + 21][8] = 1;
    gg[12 + 22][6] = 1;
    gg[12 + 22][7] = 1;
    gg[12 + 22][8] = 1;
    gg[12 + 23][5] = 1;
    gg[12 + 23][9] = 1;
    gg[12 + 25][4] = 1
    gg[12 + 25][5] = 1
    gg[12 + 25][9] = 1
    gg[12 + 25][10] = 1
    gg[12 + 35][6] = 1;
    gg[12 + 35][7] = 1;
    gg[12 + 36][6] = 1;
    gg[12 + 36][7] = 1;

    return gg;
}

/*      10 12 14 16 18 20
123456789 11 13 15 17 19
........................O              4  
......................O.O              5
............OO......OO............OO   6
...........O...O....OO............OO   7
OO........O.....O...OO                 8
OO........O...O.OO....O.O              9
..........O.....O.......O             10
...........O...O                      11
............OO                        12
*/

// let grid = buildGrid();
let grid = Grid1();
render(grid);

// console.log(grid);
// grid = nextGen(grid);
requestAnimationFrame(update);

function update() {
    grid = nextGen(grid);
    render(grid);
    requestAnimationFrame(update);
}

// function nextGen(grid) {
//     const nextGen = grid.map(arr => [...arr]);

//     for(let col = 0; col < grid.length; col++) {
//         for(let row = 0; row < grid[col].length; row++) {
//             const cell = grid[col][row];
//             let totalNeigh = 0;

//             for(let i = -1; i < 2; i++) {
//                 for(let j = -1; j < 2; j++) {
//                     if(i == 0 && j == 0) continue;
//                     if(col + i > 0 && col + i < grid.length && row + j > 0 && row + j < grid[col].length) {
//                         const curNeigh = grid[col + i][row + j];
//                         totalNeigh += curNeigh;
//                     }
//                 }
//             }

//             if(cell === 1 && totalNeigh < 2) {
//                 nextGen[col][row] = 0;
//             } else if(cell === 1 && totalNeigh > 3) {
//                 nextGen[col][row] = 0;
//             } else if(cell === 0 && totalNeigh === 3) {
//                 nextGen[col][row] = 1;
//             }
//         }
//     }
//     return nextGen;
// }

function nextGen(grid) {
    let count = 0;
    for(let col = 0; col < grid.length; col++) {
        for(let row = 0; row < grid[col].length; row++) {
            count = 0;

            for(let i = -1; i < 2; i++) {
                for(let j = -1; j < 2; j++) {
                    if(i === 0 && j === 0) continue;
                    if(col + i > 0 && col + i < grid.length && row + j > 0 && row + j < grid[col].length) {
                        if(grid[col + i][row + j] === 1 || grid[col + i][row + j] === 3) count++;
                    }
                }
            }

            if(count < 2) grid[col][row] = grid[col][row] === 0 ? 0: 3;
            if(count === 3) grid[col][row] = grid[col][row] === 0 ? 2: 1;
            if(count > 3) grid[col][row] = grid[col][row] === 0 ? 0: 3;
        }
    }
    
    for(let a = 0; a < grid.length; a++) {
        for(let b = 0; b < grid[a].length; b++) {
            if(grid[a][b] === 2 || grid[a][b] === 3) {
                grid[a][b] = grid[a][b] === 2 ? 1: 0;
            }
        }
    }
    return grid;
}

function render(grid) {
    for(let col = 0; col < grid.length; col++) {    
        for(let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            ctx.beginPath();
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            if(col >= 0 && col <= 60) {
                if(row < 60) ctx.fillStyle = cell ? '#00ccff': 'black';
                else ctx.fillStyle = cell ? '#669900': 'black';
            }
            else if(col > 60 && col <= 120) {
                if(row < 60) ctx.fillStyle = cell ? '#99ffcc': 'black';
                else ctx.fillStyle = cell ? '#ccffff': 'black';
            }
            else if(col > 120 && col <= 180) {
                if(row < 60) ctx.fillStyle = cell ? '#669900': 'black';
                else ctx.fillStyle = cell ? '#3366ff': 'black';
            }
            else {
                if(row < 60) ctx.fillStyle = cell ? '#ffff66': 'black';
                else ctx.fillStyle = cell ? 'red': 'black';
            }
            ctx.fill();
            ctx.stroke(); 
       }
    }
}

// function render2(grid) {
//     for(let col = 0; col < grid.length; col++) {    
//         for(let row = 0; row < grid[col].length; row++) {
//             const cell = grid[col][row];

//             ctx.beginPath();
//             ctx.rect(col * resolution, row * resolution, resolution, resolution);
//             ctx.fillStyle = cell ? 'blue': 'green';
//             ctx.fill();
//             ctx.stroke();
//         }
//     }
// }
