
// These list of ENUMS should be shared accross the board
export const statusOptions = [
    // uiCounterSort: SORT of status when we present the Counters Summary
    // SORT is by "status life cycle", not bt text A-Z
    {value: "NS", text: "Not Started", uiCounterSort: 10},
    {value: "IP", text: "In Process", uiCounterSort: 20},
    {value: "CMP", text: "Completed", uiCounterSort: 30}, 
    {value: "RO", text: "Reopened", uiCounterSort: 40},
];


export const priorityOptions = [ 
    {value: "5", text: "Highest", uiCounterSort: 10},
    {value: "4", text: "High", uiCounterSort: 20},
    {value: "3", text: "Medium", uiCounterSort: 30},
    {value: "2", text: "Low", uiCounterSort: 40}, 
    {value: "1", text: "Lowest", uiCounterSort: 50},
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