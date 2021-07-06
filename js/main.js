const uploadButton = document.getElementById('upload-button');
const hiddenInput = document.getElementById('hidden-input');
const label = document.getElementById('upload-label');
const defaultLabelText = "No file selected";

label.textContent = defaultLabelText;
label.title = defaultLabelText;

uploadButton.addEventListener('click', function (event) {
    event.preventDefault();
    hiddenInput.click();
});


hiddenInput.addEventListener('change', function (e) {
    var reader = new FileReader();
    reader.onload = function (e) {
        editor.value(generateMarkdown(e.target.result));
    };
    reader.readAsText(hiddenInput.files[0]);
});

var editor = new SimpleMDE({
    autoDownloadFontAwesome: true,
    autosave: {
        enabled: false,
        delay: 1000,
        uniqueId: 'markdown-output'
    },
    spellChecker: false,
    indentWithTabs: false,
    sideBySideFullscreen: false,
    element: document.getElementById('markdown-output'),
    initialValue: '## OpenAPI to Markdown Converter \n You\'ll get output here \n Supported format is JSON'
});


function generateMarkdown(data) {
    const dataObj = JSON.parse(data)

    if (!dataObj.openapi) return "# Please check you file!";

    body = `# ${dataObj.info.title} \n`
    body += `${dataObj.info.description} \n\n`

    body += `## API Reference  \n\n`

    for (let path in dataObj.paths) {
        body += `### Path: ${path}  \n\n`

        for (let method in dataObj.paths[path]) {
            body += `#### ${dataObj.paths[path][method].summary} \n\n`

            body += `\`\`\`http \n`
            body += `${method.toUpperCase()} ${path}\n`
            body += `\`\`\`\n\n`

            // Adding Parameters
            let hasValue = 0
            let table = ''
            table += `| Parameter | Type | Description |\n`
            table += `| :--------  | :--------  | :--------  |\n`
            tableContent = dataObj.paths[path][method].parameters
            for (let p_i in tableContent) {
                hasValue++
                table += `| * ${tableContent[p_i].name} | ${tableContent[p_i].schema.type} | ${tableContent[p_i].schema.title} | \n`
            }
            table += `\n\n`
            if (hasValue != 0) {
                body += table
            }

            // Adding Request Body
            request = ''

            if (dataObj.paths[path][method].requestBody) {
                request += `Request Body: `
                requestBody = dataObj.paths[path][method].requestBody
                reference = requestBody['content']['application/json']['schema']['$ref']
                referenceBase = reference.split('/').slice(-1)[0]
                request += `${referenceBase} \n`
                request += `\n\n`
            }

            body += request


            //  Responses
            response = ''
            response += `| Response | Type | Description |\n`
            response += `| :--------  | :--------  | :--------  |\n`
            responseContent = dataObj.paths[path][method].responses
            for (let responseCode in responseContent) {
                let desc = responseContent[responseCode]['description']

                let type = 'N/A'
                if (responseContent[responseCode]['content']) {
                    reference = responseContent[responseCode]['content']['application/json']['schema']['$ref']
                    type = reference ? reference.split('/').slice(-1)[0] : 'N/A'
                }

                response += `| ${responseCode} | ${type} | ${desc} | \n`
            }

            response += `\n\n`
            body += response
        }
    }
    console.log(body)
    return body
}