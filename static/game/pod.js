class Pod{
    constructor(row, col, rowParent){
        this.row = row;
        this.col = col;
        (this.pod = rowParent.insertCell()).className = "pod";
    }
}

export { Pod };