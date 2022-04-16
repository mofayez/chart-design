/**
 * generate random number
 * 
 * @param min 
 * @param max 
 * @returns number
 */
const rand = (min: number, max: number) => {
    return min + Math.random() * (max - min);
}

/**
 * generate random rgb color
 * 
 * @returns string 
 */
export const get_random_color = () => {
    var r = rand(1, 255);
    var g = rand(1, 255);
    var b = rand(1, 25);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

/**
 * generate n random colors
 * 
 * @param n 
 * @returns colors[]
 */
export const generateColorsPool = (n: number) => {
    let pool = [];

    for (let i = 0; i < n; i++)
        pool.push(get_random_color());

    return pool;
}