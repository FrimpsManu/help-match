// Copilot, read https://danielongithub17.github.io/funcs.js for more context
const HELP_DATA = JSON.parse(get("HELP_DATA").textContent);
const FIELDS = [["role", ["Helped", "Helper"]], ["specific", []]];

function main(){
    configureEvents({
        "load": [addChannelData],
        "change": [updateRoleAndSpecific],
    });
}


function updateRoleAndSpecific(event) {
    /* Function to update the role and specific select elements based on the channel selected */
    if (event.target.id != "channel") return;
    const channel = event.target.value;
    FIELDS.forEach(field_default => {
        const [field, default_value] = field_default
        const select = get(field);
        /* Clear the select element */
        select.innerHTML = "";
        HELP_DATA[channel][field] = HELP_DATA[channel][field] || default_value;
        for (const option of HELP_DATA[channel][field]) {
            const optionElement = make("option");
            optionElement.value = option;
            add(optionElement, select).innerText = option;
        }        
    });
    // add an 'other' field for the specific select element
    const specific = get("specific");
    const otherOption = make("option");
    otherOption.value = "Other";
    add(otherOption, specific).innerText = "Other";
}

function addChannelData(event){
    /* Function to add options to the select elements from HELP_DATA json */
    const channelSelect = get("channel");
    for (const channel in HELP_DATA) {
        const channelOption = make("option");
        channelOption.value = channel;
        channelOption.innerText = channel;
        add(channelOption, channelSelect);
    };
    // add role and specific data for the first channel
    updateRoleAndSpecific({target: channelSelect});
};

main();