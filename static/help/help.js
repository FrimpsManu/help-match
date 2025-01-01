// Copilot, read https://danielongithub17.github.io/funcs.js for more context
const HELP_DATA = JSON.parse(get("HELP_DATA").textContent);


function addSelectData(){
    /* Function to add options to the select elements from HELP_DATA json */
    const channelSelect = get("channel");
    const roleSelect = get("role");
    const specificSelect = get("specific");

    for (const channel in HELP_DATA) {
        const channelOption = document.createElement("option");
        channelOption.value = channel;
        channelOption.innerText = channel;
        channelSelect.appendChild(channelOption);
    }

};

