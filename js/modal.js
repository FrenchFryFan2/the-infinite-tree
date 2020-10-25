var modal = {
    showing: false,
	title: "This is a modal.",
	content: "",
    buttonContent: "Close",

    applyDefault() {
        modal.title = "This is a modal.";
        modal.content = "";
        modal.buttonContent = "Close";
    },

    show(title, content, buttonContent) {
        if (title) {
            this.applyDefault();
            this.title = title;
        }
        if (content) this.content = content;
        if (buttonContent) this.buttonContent = buttonContent;
        this.showing = true;
    },

    hide() {
        this.showing = false;
    }
}