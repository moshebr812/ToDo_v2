
// These list of ENUMS should be shared accross the board
export const statusOptions = [
    {value: "NS", text: "Not Started"},
    {value: "IP", text: "In Process"},
    {value: "CMP", text: "Completed"}, 
    {value: "RO", text: "Reopened"},
];


export const priorityOptions = [ 
    {value: 5, text: "Highest"},
    {value: 4, text: "High"},
    {value: 3, text: "Medium"},
    {value: 2, text: "Low"}, 
    {value: 1, text: "Lowest"}
];


export const complexityOptions = [ 
    {value: "T", text: "Tough"},
    {value: "C", text: "Challenging"},
    {value: "S", text: "Simple"} 
];

export default { 
    statusOptions,
    priorityOptions,
    complexityOptions,
}