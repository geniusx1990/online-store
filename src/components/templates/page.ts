abstract class Page {
    protected container: HTMLElement;
    static TextObject = {};
    
    constructor(pageName: string) {
        this.container = document.createElement('div');
        this.container.className = pageName;     
    }

    draw() {
        return this.container;
    }

}

export default Page;