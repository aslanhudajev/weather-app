function CreateFormInputElement(type, name, labelText, classList, id) {
    const inElDiv = document.createElement("div");
    inElDiv.classList.add("input-element");
    
    const inElLabel = document.createElement("label");
    inElLabel.htmlFor = name;
    inElLabel.textContent = labelText;
    
    const inEl = document.createElement("input");
    inEl.type = type;
    inEl.classList.add(classList);
    inEl.name = name;
    inEl.id = id;

    inElDiv.appendChild(inElLabel);
    inElDiv.appendChild(inEl);
    
    return { container: inElDiv, inputField: inEl };
}

export default CreateFormInputElement